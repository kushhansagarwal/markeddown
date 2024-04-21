<script lang="ts">
	import { PUBLIC_API_ENDPOINT_PY } from '$env/static/public';
	import fetchLogo from '$lib/assets/fetch-logo.svg';
	import gemini from '$lib/assets/gemini.svg';
	import FetchScanned from './FetchScanned.svelte';

	let URLTable: string[] = []; // ['https://www.fetch.ai', 'https://www.gemini.com'];
	let currentURL: string = '';

	export let email: string;

	export let existingScans: {
		urls: string[];
		website: string;
		time: string;
	}[] = [];

	let scans: {
		urls: string[];
		website: string;
		time: string;
	}[] = [
		...existingScans,
		{
			urls: [
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio3_L6ZRpw-Tb.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio4_y9tg5EXsC.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio8_iOgKa4obO.jpg'
			],
			website: 'https://www.kush.photos/?tag=portrait',
			time: '21/04/2024, 00:44:13'
		}
	];

	let newScans: {
		urls: string[];
		website: string;
		time: string;
	}[] = [];

	let disableInput: boolean = false;
	let disableButton: boolean = false;

	enum state {
		IDLE,
		LOADING,
		SUCCESS,
		ERROR
	}

	let scanStates: state[] = [];

	$: {
		disableButton = URLTable.length === 0;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			console.log('Enter pressed');
			if (currentURL.startsWith('http://') || currentURL.startsWith('https://')) {
				URLTable = [...URLTable, currentURL];
				scanStates = [...scanStates, state.IDLE];
				currentURL = '';
			} else {
				console.error('Invalid URL. Please make sure it starts with http:// or https://');
			}
		}
	}
</script>

<div class="mx-auto w-full max-w-5xl p-4">
	<div class="flex flex-grow">
		<h2 class="mr-3 text-left text-2xl font-bold">Protect your assets with</h2>
		<img alt="scan" src={fetchLogo} class="h-7" />
	</div>
	<p class="mb-5 text-xs text-gray-400">The Fetch.ai logo is a registered trademark of Fetch.ai</p>

	<div class="">
		<div class="mb-2">
			<p>
				Protect your media using Fetch.ai's agent-based technology and Gemini's groundbreaking NIAH
				(Needle in a Haystack) accuracy to scan the web for your images.
			</p>
		</div>
	</div>
	<div class="divider"></div>
	<h1 class="mb-2 text-2xl font-bold">Scan URLs</h1>
	<input
		type="text"
		placeholder="Paste a URL and hit enter"
		class="input input-bordered w-full"
		bind:value={currentURL}
		disabled={disableInput}
		on:keydown={handleKeydown}
	/>
	<div class="mb-4 overflow-x-auto">
		{#if URLTable.length > 0}
			<table class="table">
				<!-- head -->
				<thead>
					<tr>
						<th></th>
						<th>URL</th>
					</tr>
				</thead>
				<tbody>
					{#each URLTable as url, index}
						<tr>
							<td
								on:click={() => {
									URLTable = URLTable.filter((_, i) => i !== index);
								}}
								class="w-4 text-gray-500"
							>
								{#if scanStates[index] === state.IDLE}
									<span class="icon-cross"></span>
								{:else if scanStates[index] === state.LOADING}
									<span class="loading loading-spinner loading-md"></span>
								{:else if scanStates[index] === state.SUCCESS}
									<span class="icon-tick"></span>
								{/if}</td
							>
							<td class="font-mono">{url}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
		<button
			disabled={disableButton}
			class="btn-default btn mt-4"
			on:click={() => {
				disableInput = true;
				disableButton = true;
				const fetchPromises = URLTable.map((url, index) => {
					scanStates[index] = state.LOADING;
					return fetch(`${PUBLIC_API_ENDPOINT_PY}/agent/endpoint`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ message: url, email })
					})
						.then((response) => {
							if (!response.ok) {
								scanStates[index] = state.ERROR;
								throw new Error('Network response was not ok');
							}
							return response.text();
						})
						.then((textData) => {
							scanStates[index] = state.SUCCESS;
							let formattedResponse = textData.replace('"', '').split(', ');
							formattedResponse = formattedResponse.filter((url) =>
								url.match(/\.(jpeg|jpg|png)$/i)
							);
							newScans = [
								{
									urls: formattedResponse,
									website: url,
									time: new Date().toLocaleString()
								},
								...newScans
							];
						})
						.catch((error) => {
							console.error(
								'There was a problem with the fetch operation for URL ' + url + ':',
								error
							);
						});
				});

				Promise.all(fetchPromises).then(() => {
					console.log(newScans); // Handle the response data
					disableInput = false;
				});
			}}>Scan with <img alt="scan" src={fetchLogo} class="h-3" /></button
		>
	</div>
	<div class="grid gap-5 mb-5">
		{#each newScans as scan}
			<FetchScanned aged={false} {email} {scan} />
		{/each}
	</div>

	<h1 class="mb-2 text-2xl font-bold">Recent scans</h1>

	<div class="grid gap-5">
		{#each scans as scan}
			<FetchScanned aged={true} {email} {scan} />
		{/each}
	</div>
</div>
