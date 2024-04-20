import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';

export async function load({ request }: RequestEvent) {
	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		request as unknown as SessionManager
	); // Boolean: true or false
	let user = null;
	if (isAuthenticated) {
		// Need to implement, e.g: call an api, etc...
		user = await kindeAuthClient.getUser(request as unknown as SessionManager);
	} else {
		// Need to implement, e.g: redirect user to sign in, etc..
	}

	return {
		isAuthenticated,
		user
	};
}
