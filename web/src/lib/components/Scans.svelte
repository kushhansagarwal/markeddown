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

	export let email: string;
	export let scans: {
		urls: string[];
		website: string;
		time: string;
	}[] = [];

	let websites = [...new Set(scans.map((scan) => scan.website))];
	let selectedWebsite: string | undefined = undefined;

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
	$: if (selectedWebsite && selectedWebsite !== 'Sort by website') {
		filteredImages = images.filter((image) => image.type == 'scan');
		const websiteUrls = scans.find((scan) => scan.website == selectedWebsite)?.urls;
		const allUrls = scans.map((scan) => scan.urls).flat();
		let intersection: string[] = [];
		console.log(filteredImages, websiteUrls, allUrls);
		if (websiteUrls && allUrls) {
			intersection = websiteUrls.filter((url) => allUrls.includes(url));
			console.log('Intersection:', intersection);
		}
		if (websiteUrls) {
			filteredImages = filteredImages.filter((image) => intersection.includes(image.url?.replace(" ","") ?? ''));
			console.log(filteredImages);
		}
	}
</script>

<div class="mx-auto w-full max-w-5xl p-4">
	<h2 class="mb-2 text-left text-2xl font-bold">View your scans</h2>
	<div class="mb-5 text-left text-gray-500">
		These are the photos you scanned from the Chrome extension
	</div>
	<div class="">
		<div class="mb-2">
			<div class="badge badge-error badge-outline">Watermark</div>
			indicates that the photo has your unique signed watermark. If it was shared without your consent,
			you can prove that it is yours.
		</div>
		<div class="mb-2">
			<button class="btn-default btn btn-xs"
				>Search
				<img alt="scan" src={gemini} class="h-3 w-3" /></button
			>
			indicates that the photo has been indexed but not yet scanned. You can scan for similarity to your
			images.
		</div>
	</div>
	<div class="divider"></div>
	<select bind:value={selectedWebsite} class="select mb-5 w-full bg-base-200">
		<option disabled selected>Sort by website</option>
		{#each websites as website}
			<option value={website}>{website}</option>
		{/each}
	</select>
	<div class="grid gap-4">
		{#each filteredImages as image}
			<ScannedImage {email} {image} />
		{/each}
	</div>
</div>
