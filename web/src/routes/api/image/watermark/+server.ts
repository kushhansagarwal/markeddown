import type { RequestHandler } from './$types';
import dw from 'digital-watermarking';
import Exif from 'exifr';
import clientPromise from '$lib/mongodb';


export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const file = formData.get('file') as File;
		const fileBuffer = Buffer.from((await file.arrayBuffer()) as ArrayBuffer);
		const metadata = await Exif.parse(fileBuffer);

		if (metadata && metadata.Image && metadata.Image.ISO) {
			metadata.Image.ISO = 800;
		}

		if (!file || typeof file === 'string') {
			return new Response('File not found or invalid file type.', { status: 400 });
		}

		const db = await clientPromise;
		const dbResponse = await db.db('markeddown').collection('images').insertOne({
			filename: file.name,
			metadata: metadata
		});
		const objectId = dbResponse.insertedId;
		// Process the file here (e.g., apply watermark)
		const watermarkedBuffer = await dw.transformImageBufferWithText(fileBuffer, 'MarkedDown', 10);

		// For now, just return a success response
		return new Response(
			JSON.stringify({
				metadata,
                watermarkedBuffer
			}),
			{
				status: 200,
				headers: {
					'Access-Control-Allow-Origin': 'http://*'
				}
			}
		);
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: error }), {
			status: 500,
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		});
	}
};
