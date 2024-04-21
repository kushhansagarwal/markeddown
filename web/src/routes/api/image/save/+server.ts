import type { RequestHandler } from './$types';
import { genAI } from '$lib/genai';
import clientPromise from '$lib/mongodb';
import sharp from 'sharp';
import { ObjectId } from 'mongodb';

const model = genAI.getGenerativeModel({
	model: 'gemini-1.5-pro-latest',
	generationConfig: {
		temperature: 0
	}
});

const embeddingModel = genAI.getGenerativeModel({
	model: 'embedding-001',
	generationConfig: {
		temperature: 0
	}
});

const db = await clientPromise;

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const input = formData.get('input') as string;
	const imageFile = formData.get('file') as File;
	const title = formData.get('title') as string;
	const description = formData.get('description') as string;
	const userId = formData.get('userId') as string;
	const objectId = formData.get('objectId') as string;
	const exifData = formData.get('exif') as string;
	const exifJson = await JSON.parse(exifData);
	const imageBuffer = await imageFile?.arrayBuffer();
	const resizedImageBuffer = await sharp(imageBuffer).resize(500).toBuffer();

	const genDescription = await model.generateContent([
		'Describe this image in detail. Talk about the orientation, type of things in the image and much more. Be as descriptive as possible.',
		{
			inlineData: {
				data: resizedImageBuffer.toString('base64'),
				mimeType: 'image/png'
			}
		}
	]);

	const descriptionText = genDescription.response.candidates?.[0]?.content.parts[0].text;
	if (!descriptionText) {
		return new Response(JSON.stringify({ error: 'Failed to generate description.' }), {
			status: 400
		});
	}

	const embeddding = await embeddingModel.embedContent(descriptionText);

	db.db('markeddown')
		.collection('images')
		.updateOne(
			{ _id: new ObjectId(objectId) },
			{
				$set: {
					filename: imageFile.name,
					embedding: embeddding.embedding.values,
					title,
					description,
					userId,
					exifJson,
                    type: 'self'
				}
			},
			{ upsert: true }
		);

	return new Response(
		JSON.stringify({
			embeddding
		})
	);
	// const imageFile = formData.get('file') as File;
	// const field = formData.get('field') as string;
	// const exifData = formData.get('exif') as string;
	// const imageBuffer = await imageFile?.arrayBuffer();
	// const descriptionPrompt =
	// 	'Imageine you are a photographer taking an image. Generate a description for the uploaded image about how you saw it, what made you click the photo and a bit about the camera if possible from the exif data. Use some of the exif data to give some informatino about how, where and about the image taken. Talk naturally, dont say the entire name of the camera, talk about how you took the photo without sounding robotic or formal. If you do not know something, dont say that the exif does not have, just make it up if it is reasonable. The exif data is: ' +
	// 	exifData;
	// const titlePrompt = 'Generate a title for the image based on the content of the image. Just give me the title, nothing more nothing less. i only need one title option. this is directly being displayed into the ui, so no messing around please' + exifData;
	// const resizedImageBuffer = await sharp(imageBuffer).resize(500).toBuffer();
	// const response = await model.generateContent([
	//     field === 'description' ? descriptionPrompt : titlePrompt,
	// 	{
	// 		inlineData: {
	// 			data: resizedImageBuffer.toString('base64'),
	// 			mimeType: 'image/png'
	// 		}
	// 	}
	// ]);
	// return new Response(JSON.stringify(response));
};
