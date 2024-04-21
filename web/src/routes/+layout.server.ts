import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';
import clientPromise from '$lib/mongodb';

const db = await clientPromise;

export interface ScanDocument {
	website: string;
	userID: string;
	urls: string[];
	time: string;
	_id: string;
}

let scans: ScanDocument[] = [];

export interface ImageDocument {
	_id: string;
	uuid: string;
	description: string;
	title: string;
	embedding: number[];
	similarity?: number;
	type?: string;
	exifJson?: any;
    url?: string;
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
		images = await db
			.db('markeddown')
			.collection<ImageDocument>('images')
			.find({ userId: user.email })
			.toArray();
		images = images.map((image) => ({
			...image,
			_id: image._id.toString()
		}));

		scans = await db.db('markeddown').collection<ScanDocument>('scans').find({ userId: user.email }).toArray();

		scans = scans.map((scan) => ({
			...scan,
			_id: scan._id.toString()
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
		images,
		scans
	};
}
