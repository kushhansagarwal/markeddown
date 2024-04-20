import type { RequestHandler } from './$types';
import dw from 'digital-watermarking';
import Exif from 'exifr';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const file = formData.get('file') as File;
		const fileBuffer = Buffer.from((await file.arrayBuffer()) as ArrayBuffer);
		const metadata = await Exif.parse(fileBuffer);

		if (!file || typeof file === 'string') {
			return new Response('File not found or invalid file type.', { status: 400 });
		}
		// Process the file here (e.g., apply watermark)
		// For now, just return a success response
		return new Response(
			JSON.stringify({
				metadata
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
