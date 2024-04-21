import type { RequestHandler } from './$types';
import { genAI } from '$lib/genai';
import clientPromise from '$lib/mongodb';
import sharp from 'sharp';
import axios from 'axios';
import { ObjectId } from 'mongodb';

const embeddingModel = genAI.getGenerativeModel({
	model: 'embedding-001',
	generationConfig: {
		temperature: 0
	}
});

const model = genAI.getGenerativeModel({
	model: 'gemini-1.5-pro-latest',
	generationConfig: {
		temperature: 0
	},
	systemInstruction: {
		role: 'system',
		parts: [
			{
				// role: 'system',
				text: 'Your response should be an array of strings for each image. It is absolutely essential that the response is in not other format. PLease take care, i cannot stress how important it is. Give a detailed description of the images. Be as descriptive as possible. '
			}
		]
	}
});

const db = await clientPromise;

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const email = formData.get('email') as string;
	let imageUrlsData = formData.get('urls') as String;
	const imageUrls = imageUrlsData.split(',');

	const resizedImageBuffers: { url: any; data: any }[] = [];

	for (const imageUrl of imageUrls) {
		console.log(imageUrl);
		const imageResponse = await axios.get(new URL(imageUrl).toString(), {
			responseType: 'arraybuffer'
		});
		const resizedImageBuffer = await sharp(Buffer.from(imageResponse.data)).resize(500).toBuffer();
		resizedImageBuffers.push({
			data: resizedImageBuffer.toString('base64'),
			url: imageUrl
		});
	}

	const inlineDataArray = resizedImageBuffers.map((image) => ({
		inlineData: {
			data: image.data,
			mimeType: 'image/png'
		}
	}));

	const genDescription = await model.generateContent([
		'Describe these images in detail. Talk about the orientation, type of things in the images and much more. Be as descriptive as possible.',
		...inlineDataArray
	]);

	if (!genDescription.response.candidates) {
		return new Response(JSON.stringify({ error: 'No candidates found.' }), { status: 404 });
	}

	const information = genDescription.response.candidates[0].content.parts[0].text || '';

	console.log(information);

	const parsedInformation = JSON.parse(information.replace(/```/g, ''));

	const descriptionsAndEmbeddings = await Promise.all(parsedInformation.map(async (candidate: string, index: number) => {
		await new Promise(resolve => setTimeout(resolve, 40)); // Ensure at least 40ms delay between embedding calls
		const embedding = await embeddingModel.embedContent(candidate);
		return {
			url: resizedImageBuffers[index].url,
			description: candidate,
			embedding: embedding.embedding.values
		};
	})) || [{ url: 'N/A', description: 'Failed to generate descriptions.', embedding: [] }];

	const collection = db.db('markeddown').collection('images');
	await Promise.all(descriptionsAndEmbeddings.map(async (item) => {
		await collection.updateOne(
			{ url: item.url },
			{
				$set: {
					description: item.description,
					embedding: item.embedding,
					type: 'scan',
					userId: email
				}
			},
			{ upsert: true }
		);
	}));

	return new Response(JSON.stringify({ descriptionsAndEmbeddings }), {
		headers: { 'Content-Type': 'application/json' }
	});
};
