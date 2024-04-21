<script lang="ts">
	import { PUBLIC_API_ENDPOINT_PY } from '$env/static/public';
	import exifr from 'exifr'; // to use ES Modules
	import gemini from '$lib/assets/gemini.svg';
	import { json } from '@sveltejs/kit';
	let exifData = {};

	interface ImageDocument {
		_id: string;
		description: string;
		score: number;
	}

	export let data: {
		isAuthenticated: boolean;
		user: {
			family_name: string;
			given_name: string;
			picture: string | null;
			email: string;
			id: string;
		};
	};
	console.log(data);
	let matchedImage: string = '';
	let inputDisabled: boolean = true;
	$: inputDisabled = !(uploadState === 'success');

	export let images: ImageDocument[] = [];

	enum state {
		idle = 'idle',
		loading = 'loading',
		success = 'success',
		error = 'error'
	}

	let image: File | null = null;

	const minVal = 85;

	let uploadState = state.idle;
	let geminiState = state.idle;
	let imageUrl: string | null =
		'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio29_6yqmbwu4P.jpg'; //null;

	const handleSubmit = async (e: Event) => {
		uploadState = state.loading;
		const target = e.target as HTMLInputElement;
		if (!target.files) return;
		image = target.files[0];
		const formData = new FormData();
		formData.append('file', image);
		formData.append('userId', data.user.email);
		formData.append('url', 'self');
		imageUrl = URL.createObjectURL(image);

		const response = await fetch(`${PUBLIC_API_ENDPOINT_PY}/decodefile`, {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			uploadState = state.success;
			const data = await response.json();
			matchedImage = data.uuid;
			console.log(matchedImage);
		} else {
			console.error('Failed to upload image');
			exifData = await exifr.parse(image);
			console.log(exifData);
			uploadState = state.error;
		}
	};
</script>

<div class="mx-auto w-full max-w-5xl p-4">
	<h2 class="mb-2 text-left text-2xl font-bold">Check a photo</h2>
	<div class=" text-left">
		Upload a photo and check to see if there are any <span class="font-normal">Marked<span class="font-bold">Down</span></span> identifiers present.
	</div>
	<div role="alert" class="alert alert-warning my-4">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 shrink-0 stroke-current"
			fill="none"
			viewBox="0 0 24 24"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
			/></svg
		>
		<span
			>Warning: Remember, the watermark and EXIF identifiers would only be identified if they are
			yours. However, the Gemini similarity search markers are shown for all photos.</span
		>
	</div>
	{#if uploadState === 'idle'}
		<label for="upload" class="h-full w-full cursor-pointer">
			<div
				class="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-12 w-12"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
					/>
				</svg>
				<span>Upload Image</span>
			</div>

			<input on:change={(e) => handleSubmit(e)} id="upload" type="file" class="hidden" />
		</label>
	{:else if uploadState === 'loading'}
		<div
			class="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-12 w-12 animate-spin"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
				/>
			</svg>
			<span>Marking down</span>
		</div>
	{:else if uploadState === 'success'}
		<div>
			<div class="card bg-base-100 max-h-[500px] shadow-xl">
				<figure><img src={imageUrl} alt="Uploaded Image" class=" object-cover" /></figure>
				<div class="card-body">
					<h2 class="card-title">Succesfully<span class="font-normal">Marked<span class="font-bold">Down</span></span>!</h2>
					<p class="mb-3 text-sm">
						Matched Image ID: <span class="font-mono">{matchedImage}</span>
					</p>
					<p>
						The uploaded image has matched a photo in your collection. You can be assured that photo
						you uploaded has been signed by your account. If this photo was found on a website,
						please take necessary legal action.
					</p>
				</div>
			</div>
		</div>
	{:else}
		<div>
			<div class="card bg-base-100 max-h-[500px] shadow-xl">
				<figure><img src={imageUrl} alt="Uploaded Image" class=" object-cover" /></figure>
				<div class="card-body">
					<h2 class="card-title">No matches</h2>
					<p>The uploaded image has not matched a photo in your collection.</p>
					Would you like to search for the Gemini similarity?
					<p>
						The image does not have EXIF data. Would you like to search for the Gemini similarity?
					</p>
					<button
						on:click={async () => {
							if (image) {
								const formData = new FormData();
								formData.append('file', image);
								formData.append('userId', data.user.email);
								imageUrl = URL.createObjectURL(image);

								const response = await fetch(`/api/image/detect`, {
									method: 'POST',
									body: formData
								});

								const jsonData = await response.json();

								if (jsonData.searchResults && jsonData.searchResults.length > 0) {
									uploadState = state.success;
									images = jsonData.searchResults.map((result) => ({
										...result
									}));
								} else {
									uploadState = state.error;
								}

								console.log(images);
							}
						}}
						class="btn btn-default">Search Gemini <img src={gemini} class="h-6 w-6" /></button
					>
				</div>
			</div>
		</div>
	{/if}
	<div class="mt-4 grid grid-cols-2 gap-4">
		{#each images as image}
			<div class="card bg-base-100 shadow-xl">
				<figure>
					<img
						src={`https://ik.imagekit.io/wy49ay1bjy4c/markeddown/${image._id}?tr=w-800,h-500`}
						alt="Shoes"
						class="object-cover"
					/>
				</figure>
				<div class="card-body">
					<h2 class="">{(image.score * 100).toFixed(1)}% similar</h2>
					<progress
						class={`progress w-full ${image.score * 100 > 95 ? 'progress-error' : image.score * 100 > 85 ? 'progress-warning' : 'progress-success'}`}
						value={(image.score * 100 - minVal) * (100 / (100 - minVal))}
						max="100"
					></progress>
				</div>
			</div>
		{/each}
	</div>
</div>
