<script lang="ts">
	import fetch from '$lib/assets/fetch.svg';
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
			<button class="btn btn-default btn-xs"
				>Search
				<img alt="scan" src={fetch} class="h-3 w-3" /></button
			>
			indicates that the photo has been indexed but not yet scanned. You can scan for similarity to your
			images.
		</div>
	</div>
	<div class="divider"></div>
	
</div>
