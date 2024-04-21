<script lang="ts">
	import gemini from '$lib/assets/gemini.svg';
	interface ImageDocument {
		_id: string;
		uuid: string;
		description: string;
		title: string;
		embedding: number[];
		similarity?: number;
		type?: string;
		url?: string;
	}
	export let image: ImageDocument;
</script>

<div class=" flex flex-col items-start justify-center gap-4 rounded-md p-0 md:flex-row">
	<div class="w-full md:w-1/2">
		<img src={image.url} alt={image.title} class=" rounded-md object-cover shadow-lg" />
	</div>
	<div class=" w-full md:w-1/2">
		<!-- <div class="mb-2 px-5 font-mono text-xs">{image.url}</div> -->

		{#if image.uuid}
			<div class="mb-4 flex gap-2 px-5">
				<div class="badge badge-error badge-outline">Watermark</div>
			</div>
			<div role="alert" class="alert alert-default mx-5 w-max px-5">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span
					>This image is guaranteed to be yours <button class="btn btn-default shadow-lg"
						>Report now</button
					></span
				>
			</div>
		{:else}
			<div class="px-4">
				<button
					on:click={() => {
						const formData = new FormData();
						formData.append('embedding', JSON.stringify(image.embedding));
						formData.append('userId', 'user@example.com');

						fetch(`/api/image/vectorScan`, {
							method: 'POST',
							body: formData
						})
							.then((response) => response.json())
							.then((data) => {
								console.log(data);
							});
					}}
					class="btn btn-default"
					>Search
					<img alt="scan" src={gemini} class="h-6 w-6" /></button
				>
			</div>
		{/if}
	</div>
</div>
<div class="divider"></div>
