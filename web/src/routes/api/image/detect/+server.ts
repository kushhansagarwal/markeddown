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
	const imageFile = formData.get('file') as File;
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
	const embeddingValues = embeddding.embedding.values;

	const vectorSearchResults = await db
		.db('markeddown')
		.collection('images')
		.aggregate([
			{
				$vectorSearch: {
					index: 'vector_index',
					path: 'embedding',
					queryVector: embeddingValues,
					numCandidates: 3,
					limit: 3
				}
			},
			{
				$project: {
					score: { $meta: 'vectorSearchScore' },
					description: 1,
					_id: 1
				}
			}
		])
		.toArray();

	return new Response(
		JSON.stringify({
			searchResults: vectorSearchResults
		})
	);
};
