<script lang="ts">
	import { PUBLIC_API_ENDPOINT_PY } from '$env/static/public';
	import exifr from 'exifr'; // to use ES Modules
	import gemini from '$lib/assets/gemini.svg';

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

	let imageUrl: string | null =
		'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio29_6yqmbwu4P.jpg'; //null;
	let imageBlob: Blob | null = null;
	interface ImageMetadata {
		make?: string;
		model?: string;
		datetime?: string;
		gps_latitude_ref?: string;
		gps_latitude?: string;
		gps_longitude_ref?: string;
		gps_longitude?: string;
		[key: string]: string | undefined;
	}

	let imageMetadata: ImageMetadata = {};

	let title: string = '';
	let description: string = '';

	let agreed: boolean = false;

	let titleGenerationState = 'idle';
	let descriptionGenerationState = 'idle';

	let exifData = {};

	let uuid: string = '';
	let objectId: string = '';
	let inputDisabled: boolean = true;
	$: inputDisabled = !(uploadState === 'success');

	enum state {
		idle = 'idle',
		loading = 'loading',
		success = 'success'
	}

	let uploadState = state.idle;

	type ExifData = {
		make?: string;
		model?: string;
		date?: string;
		location?: {
			latitude?: string;
			longitude?: string;
		};
	};

	const handleSubmit = async (e: Event) => {
		uploadState = state.loading;
		const target = e.target as HTMLInputElement;
		if (!target.files) return;
		const image = target.files[0];
		const formData = new FormData();
		formData.append('file', image);
		exifData = await exifr.parse(image);
		console.log(exifData);

		const response = await fetch(`${PUBLIC_API_ENDPOINT_PY}/uploadfile`, {
			method: 'POST',
			body: formData
		});

		const uuidHeader = response.headers.get('Uuid');
		uuid = uuidHeader || 'unknown';

		const objectIdHeader = response.headers.get('ObjectId');
		objectId = objectIdHeader || 'unknown';

		uploadState = state.success;
		console.log(response.headers);

		if (response.ok) {
			const data = await response.blob();
			imageBlob = data;
			imageUrl = URL.createObjectURL(data);
		} else {
			console.error('Failed to upload image');
		}
	};
</script>

<div class="mx-auto w-full max-w-5xl p-4">
	<h2 class="mb-2 text-left text-2xl font-bold">Upload and Input</h2>
	<div class="mb-8 text-left">Upload photo and get the MarkedDown version</div>
	<div class="flex flex-wrap items-stretch justify-between">
		<div class="mb-4 w-full pr-4 lg:mb-0 lg:w-1/2">
			<div class="flex max-h-[500px]">
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
				{:else}
					<div>
						<div class="card bg-base-100 max-h-[500px] shadow-xl">
							<figure><img src={imageUrl} alt="Uploaded Image" class=" object-cover" /></figure>
							<div class="card-body">
								<h2 class="card-title">Succesfully MarkedDown!</h2>
								<p>
									Download this photo and upload it on the web! Your photo has the unique ID <span
										class="bg-base-200 rounded-md p-1 font-mono">{uuid}</span
									>
								</p>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
		{#if imageUrl}
			<div
				class="bg-base-200 h-full max-h-[500px] w-full overflow-auto rounded-lg p-5 px-4 lg:w-1/2"
			>
				<!-- <h3 class="text-lg font-semibold">EXIF Data</h3> -->
				{#if inputDisabled}
					The metadata is only available after uploading the photo
				{:else}
					<pre class="font-mono" style="max-height: 100%; overflow-y: scroll;">{JSON.stringify(
							exifData,
							null,
							2
						)}</pre>
				{/if}
			</div>
		{/if}
	</div>
	<div class="mt-5">
		<div class="flex">
			<div class="mb-2 font-bold">Title</div>
			{#if titleGenerationState === 'idle'}
				<button
					disabled={imageBlob === null}
					on:click={async () => {
						const formData = new FormData();
						if (imageBlob) formData.append('file', imageBlob);

						formData.append('exif', JSON.stringify(exifData));
						formData.append('field', 'title');

						titleGenerationState = 'loading';

						const response = await fetch(`/api/image/generate`, {
							method: 'POST',
							body: formData
						});

						titleGenerationState = 'success';

						if (response.ok) {
							let responseJson = await response.json();
							console.log(responseJson);
							title = responseJson.response.candidates[0].content.parts[0].text;
						} else {
							console.error('Failed to generate image');
						}
					}}
					class="join-item btn btn-xs ml-2 rounded-xl"
				>
					Generate <img src={gemini} class="h-3 w-3" />
				</button>
			{:else if titleGenerationState === 'loading'}
				<span class="loading loading-spinner loading-xs mb-2 ml-2"></span>
			{/if}
		</div>
		<input
			type="text"
			disabled={inputDisabled}
			bind:value={title}
			placeholder="Image title"
			class="join-item input input-bordered mb-4 w-full text-sm"
		/>

		<div class="flex">
			<div class="mb-2 font-bold">Description</div>
			{#if descriptionGenerationState === 'idle'}
				<button
					disabled={imageBlob === null}
					on:click={async () => {
						const formData = new FormData();
						if (imageBlob) formData.append('file', imageBlob);

						formData.append('exif', JSON.stringify(exifData));
						formData.append('field', 'description');

						descriptionGenerationState = 'loading';

						const response = await fetch(`/api/image/generate`, {
							method: 'POST',
							body: formData
						});

						descriptionGenerationState = 'success';

						if (response.ok) {
							let responseJson = await response.json();
							console.log(responseJson);
							description = responseJson.response.candidates[0].content.parts[0].text;
						} else {
							console.error('Failed to generate image');
						}
					}}
					class="join-item btn btn-xs ml-2 rounded-xl"
				>
					Generate <img src={gemini} class="h-3 w-3" />
				</button>
			{:else if descriptionGenerationState === 'loading'}
				<span class="loading loading-spinner loading-xs mb-2 ml-2"></span>
			{/if}
		</div>

		<textarea
			bind:value={description}
			disabled={inputDisabled}
			class="textarea textarea-bordered mb-4 h-48 w-full"
			placeholder="Image description"
		></textarea>

		<label class="label mb-3 cursor-pointer text-sm font-light">
			<input
				disabled={inputDisabled || title == '' || description == ''}
				bind:value={agreed}
				type="checkbox"
				class="checkbox checkbox-primary mr-3"
			/>
			<span class="label-text"
				>By hitting Download, you are downloading a copy of the photo with your secure MarkedDown
				information stored in it. Download our Chrome Extension to scan websites you visit which
				might have this photo copied on them. Alternatively, go to the "Your photos" tab to check your
				photos. Remember, if an photo does not have your watermark, you would not be able to see any
				information.</span
			>
		</label>
		<button
			on:click={async () => {
				const formData = new FormData();
				if (imageBlob) formData.append('file', imageBlob);

				formData.append('exif', JSON.stringify(exifData));
                formData.append('title', title);
                formData.append('description', description);
                formData.append('objectId', objectId);
                formData.append('userId', data.user.email);

				const response = await fetch(`/api/image/save`, {
					method: 'POST',
					body: formData
				});
			}}
			disabled={!agreed}
			class="btn btn-primary"
		>
			Download MarkedDown Image
		</button>
	</div>
</div>
