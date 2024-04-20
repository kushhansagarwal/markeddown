<script lang="ts">
	import { PUBLIC_API_ENDPOINT_PY } from '$env/static/public';
	import exifr from 'exifr'; // to use ES Modules

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
	let description: string =
		'The warm California sun cast long shadows across the immaculate lawns of the university campus. As I strolled through, my Sony Alpha 7C gripped firmly in hand, I couldnt help but notice a young man, sharply dressed in a suit, sitting amidst the vibrant greenery. The juxtaposition of his formal attire against the casual backdrop of the campus grounds was intriguing. He was lost in thought, gazing into the distance, seemingly oblivious to the world around him. The 24mm F1.4 Sigma Art lens allowed me to capture a wide perspective, incorporating the iconic university buildings into the frame, while still maintaining a shallow depth of field, isolating the subject from the background. With a swift click, I froze this moment in time - a snapshot of contemplation amidst the hustle and bustle of university life. The daylight setting, coupled with the fast f/1.4 aperture and 1/500s shutter speed, ensured a crisp image with beautiful bokeh, further emphasizing the subject.  This image, taken on April 7th, 2024, serves as a reminder of the quiet moments of reflection that can be found even in the most unexpected places.';

	let exifData = {};

	let uuid: string = '';

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
		console.log(`Uuid: ${uuidHeader}`);
		uuid = uuidHeader || 'unknown';

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

<div class="navbar bg-base-100 p-3">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl">Marked<span class="font-bold">Down</span></a>
	</div>
</div>

<section class="flex min-h-screen items-stretch justify-center">
	<div class="mx-auto w-full max-w-5xl p-4">
		<h2 class="mb-2 text-left text-2xl font-bold">Upload and Input</h2>
		<div class="mb-8 text-left">Upload an image and get the MarkedDown version</div>
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
										Download this image and upload it on the web. Your image has the unique ID <span
											class="bg-base-200 rounded-md p-1 font-mono">{uuid}</span
										>
									</p>
									<div class="card-actions justify-end">
										<a href={imageUrl} download class="btn btn-primary">Download</a>
									</div>
								</div>
							</div>
						</div>
					{/if}
				</div>
			</div>
			{#if imageUrl}
				<div class="bg-base-200 max-h-[500px] w-full overflow-auto rounded-lg p-5 px-4 lg:w-1/2">
					<h3 class="text-lg font-semibold">Image EXIF Data</h3>
					<h3 class="  mb-4">Image metadata (reference only)</h3>
					<pre class="font-mono" style="max-height: 100%; overflow-y: scroll;">{JSON.stringify(
							exifData,
							null,
							2
						)}</pre>
				</div>
			{/if}
		</div>
		<div class="mt-5">
			<div class="mb-2 font-bold">Title</div>
			<div class="join w-full">
				<input
					type="text"
					bind:value={title}
					placeholder="Image title"
					class="join-item input input-bordered mb-4 w-full text-sm"
				/>
				<button
					disabled={imageBlob === null}
					on:click={async () => {
						const formData = new FormData();
						if (imageBlob) formData.append('file', imageBlob);

						formData.append('exif', JSON.stringify(exifData));
						formData.append('field', 'title');

						const response = await fetch(`/api/image/generate`, {
							method: 'POST',
							body: formData
						});

						if (response.ok) {
							let responseJson = await response.json();
							console.log(responseJson);
							title = responseJson.response.candidates[0].content.parts[0].text;
						} else {
							console.error('Failed to generate image');
						}
					}}
					class="join-item btn btn-secondary">Generate</button
				>
			</div>
			<div class="mb-2 font-bold">Description</div>

			<textarea
				bind:value={description}
				class="textarea textarea-bordered mb-4 w-full"
				placeholder="Image description"
			></textarea>
			<button
				disabled={imageBlob === null}
				on:click={async () => {
					const formData = new FormData();
					if (imageBlob) formData.append('file', imageBlob);

					formData.append('exif', JSON.stringify(exifData));
					formData.append('field', 'description');

					const response = await fetch(`/api/image/generate`, {
						method: 'POST',
						body: formData
					});

					if (response.ok) {
						let responseJson = await response.json();
						console.log(responseJson);
						description = responseJson.response.candidates[0].content.parts[0].text;
					} else {
						console.error('Failed to generate image');
					}
				}}
				class="join-item btn btn-secondary">Generate</button
			>
		</div>
	</div>
</section>
