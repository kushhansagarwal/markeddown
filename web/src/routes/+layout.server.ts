import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';
import clientPromise from '$lib/mongodb';

const db = await clientPromise;

export interface ImageDocument {
    _id: string;
    uuid: string;
    description: string;
    title: string;
}

let images: ImageDocument[] = [];

export async function load({ request }: RequestEvent) {
	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		request as unknown as SessionManager
	); // Boolean: true or false
	let user: {
		family_name: string;
		given_name: string;
		picture: string | null;
		email: string;
		id: string;
	};
	if (isAuthenticated) {
		// Need to implement, e.g: call an api, etc...
		user = await kindeAuthClient.getUser(request as unknown as SessionManager);
		images = await db.db('markeddown').collection<ImageDocument>('images').find({ userId: user.email }, { projection: { _id: 1, uuid: 1, description: 1, title: 1 } }).toArray();
        images = images.map(image => ({
            ...image,
            _id: image._id.toString()
        }));
	} else {
		// Need to implement, e.g: redirect user to sign in, etc..
		user = {
			family_name: '',
			given_name: '',
			picture: null,
			email: '',
			id: ''
		};
	}

	return {
		isAuthenticated,
		user,
		images
	};
}
