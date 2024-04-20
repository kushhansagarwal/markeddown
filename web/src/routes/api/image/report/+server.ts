import type { RequestHandler } from './$types';
import { genAI } from '$lib/genai';
const model = genAI.getGenerativeModel({
	model: 'gemini-1.5-pro-latest'
});
export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const website = formData.get('website') as string;
	const emailPrompt = `Find the support email address from the website: ${website}.`;
	const emailResponse = await model.generateContent(emailPrompt);
	const supportEmail = emailResponse; // Assuming the model returns the email directly for simplicity
	const mailBodyPrompt = `Write an email to the support team found at ${supportEmail} regarding an issue encountered on their website ${website}. The email should be polite, concise, and describe a generic issue that a user might face.`;
	const mailBodyResponse = await model.generateContent(mailBodyPrompt);
	const response = {
		email: supportEmail,
		text: mailBodyResponse
	};
	return new Response(JSON.stringify(response), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

