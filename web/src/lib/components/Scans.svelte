<script lang="ts">
	import ScannedImage from './ScannedImage.svelte';
	import { PUBLIC_API_ENDPOINT_PY } from '$env/static/public';
	import exifr from 'exifr'; // to use ES Modules
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

	export let images: ImageDocument[] = [];
	$: filteredImages = images.filter((image) => image.type == 'scan');
	$: sortedImages = filteredImages.sort((a, b) => {
		if (a.uuid && !b.uuid) {
			return -1;
		} else if (!a.uuid && b.uuid) {
			return 1;
		} else {
			return 0;
		}
	});
</script>

<div class="mx-auto w-full max-w-5xl p-4">
	<h2 class="mb-2 text-left text-2xl font-bold">View your scans</h2>
	<div class="mb-5 text-left text-gray-500">
		These are the photos you scanned from the Chrome extension
	</div>
	<div class="">
		<div class="mb-2">
			<div class="badge badge-secondary badge-outline">Watermark</div>
			indicates that the photo has your unique signed watermark. If it was shared without your consent,
			you can prove that it is yours.
		</div>
		<div class="mb-2">
			<button  class="btn btn-default btn-xs"
				>Search
				<img alt="scan" src={gemini} class="h-3 w-3" /></button
			>
			indicates that the photo has been indexed but not yet scanned. You can scan for similarity to your images.
		</div>
	</div>
	<div class="divider"></div>
	<div class="grid gap-4">
		{#each filteredImages as image}
			<ScannedImage {image} />
		{/each}
	</div>
</div>
