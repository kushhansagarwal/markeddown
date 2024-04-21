import type { RequestHandler } from './$types';
import clientPromise from '$lib/mongodb';

const db = await clientPromise;

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const embedding = formData.get('embedding');
	const userId = formData.get('userId');

	if (!embedding || !userId) {
		return new Response(JSON.stringify({ error: 'Missing required fields.' }), {
			status: 400
		});
	}

	const embeddingArray = JSON.parse(embedding as string);

	const vectorSearchResults = await db
		.db('markeddown')
		.collection('images')
		.aggregate([
			{
				$vectorSearch: {
					index: 'vector_index',
					path: 'embedding',
					queryVector: embeddingArray,
					numCandidates: 10,
					limit: 10,
					filter: {
						userId: { $eq: userId },
						type: { $ne: 'scan' }
					}
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
