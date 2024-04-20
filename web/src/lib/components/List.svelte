<script lang="ts">
	import { PUBLIC_API_ENDPOINT_PY } from '$env/static/public';
	import exifr from 'exifr'; // to use ES Modules
	import gemini from '$lib/assets/gemini.svg';
	import type { ImageDocument } from '../../routes/+layout.server';

	export let images: ImageDocument[] = [];
</script>

<div class="mx-auto w-full max-w-5xl p-4">
	<h2 class="mb-2 text-left text-2xl font-bold">View Images</h2>
	<div class="grid gap-4">
		{#each images as image}
			<div
				class="bg-base-200 flex flex-col items-center justify-center gap-4 rounded-md p-0 md:flex-row"
			>
				<div class="w-full md:w-1/2">
					<img
						src={`https://ik.imagekit.io/wy49ay1bjy4c/markeddown/${image._id}?tr=w-1000`}
						alt={image.title}
						class=" rounded-l-md object-cover shadow-lg"
					/>
				</div>
				<div class=" w-full md:w-1/2">
					<div class="px-5 pt-5 text-xl font-bold">{image.title}</div>
					<div class="font-mon mb-2 px-5 text-xs">{image.uuid}</div>
					<div class="mb-4 flex gap-2 px-5">
						{#if image.embedding}
							<div class="badge badge-primary badge-outline">EXIF</div>
						{/if}{#if image.description}
							<div class="badge badge-accent badge-outline">Gemini</div>
						{/if}{#if image.uuid}
							<div class="badge badge-secondary badge-outline">Watermark</div>
						{/if}
					</div>
					<div class="mb-5 px-5 text-justify text-sm">
						{image.description}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
