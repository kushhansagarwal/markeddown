<script lang="ts">
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

<div class=" flex flex-col items-center justify-center gap-4 rounded-md p-0 md:flex-row">
	<div class="w-full md:w-1/2">
		<img src={image.url} alt={image.title} class=" rounded-md object-cover shadow-lg" />
	</div>
	<div class=" w-full md:w-1/2">
		<div class="font-mon mb-2 px-5 text-xs">{image.url}</div>

		<div class="mb-4 flex gap-2 px-5">
			{#if image.embedding}
				<div class="badge badge-primary badge-outline">EXIF</div>
			{/if}{#if image.description}
				<div class="badge badge-accent badge-outline">Gemini</div>
			{/if}{#if image.uuid}
				<div class="badge badge-secondary badge-outline">Watermark</div>
			{/if}
		</div>
		{#if image.uuid}
			<div role="alert" class="alert alert-error mx-5">
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
				<span>Error! Task failed successfully.</span>
			</div>
		{/if}
	</div>
</div>
<div class="divider"></div>
