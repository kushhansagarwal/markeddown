import type { RequestHandler } from './$types';
import { genAI } from '$lib/genai';
import sharp from 'sharp';
const model = genAI.getGenerativeModel({
	model: 'gemini-1.5-pro-latest'
});

const embeddingModel = genAI.getGenerativeModel({
	model: 'embedding-001',
	generationConfig: {
		temperature: 0,
		topP: 0.9,
		topK: 0
	}
});

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const input = formData.get('input') as string;
	const imageFile = formData.get('file') as File;
	const imageBuffer = await imageFile?.arrayBuffer();
	const resizedImageBuffer = await sharp(imageBuffer).resize(500).toBuffer();

	const description = await model.generateContent([
		'Describe this image in detail. Talk about the orientation, type of things in the image and much more. Be as descriptive as possible.',
		{
			inlineData: {
				data: resizedImageBuffer.toString('base64'),
				mimeType: 'image/png'
			}
		}
	]);

	const response = await embeddingModel.embedContent(input);

	return new Response(
		JSON.stringify({
			// response,
			description
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
