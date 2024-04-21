<script lang="ts">
	import gemini from '$lib/assets/gemini.svg';
	interface Scan {
		website: string;
		time: string;
		urls: string[];
	}
	export let scan: Scan;
	export let email: string;
	export let aged: boolean = false;

	enum state {
		IDLE,
		LOADING,
		SUCCESS,
		ERROR
	}

	let siteScanState = state.IDLE;
</script>

<div class="rounded-md bg-base-200 p-5">
	<p class="font-mono">{scan.website}</p>
	<p class="mb-5 text-xs text-gray-400">{scan.time}</p>
	{#if !aged}
		<button
			disabled={siteScanState === state.LOADING}
			on:click={async () => {
				siteScanState = state.LOADING;
				const formData = new FormData();
				formData.append('email', email);
				formData.append('urls', scan.urls.join(', ').replaceAll('"', ''));
				const response = await fetch('http://localhost:5173/api/image/scansite', {
					method: 'POST',
					body: formData
				});

				if (response.ok) {
					console.log('Site scanned successfully');
					siteScanState = state.SUCCESS;
				} else {
					console.error('Failed to scan site');
					siteScanState = state.ERROR;
				}
			}}
			class="btn-default btn mb-5 bg-base-300"
			>Scan with Gemini<img alt="scan" src={gemini} class="h-6" /></button
		>
	{/if}
	<p class="mb-2 font-bold">Images</p>
	<div class="grid grid-cols-5 gap-4">
		{#each scan.urls as url}
			<img src={url.replace('"', '')} alt="scan" class="rounded-md object-cover shadow-lg" />
		{/each}
	</div>
</div>
