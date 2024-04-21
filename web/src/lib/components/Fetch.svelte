<script lang="ts">
	import fetch from '$lib/assets/fetch-logo.svg';
	import gemini from '$lib/assets/gemini.svg';

	let URLTable: string[] = ['https://www.fetch.ai', 'https://www.gemini.com'];
	let currentURL: string = '';

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			console.log('Enter pressed');
			if (currentURL.startsWith('http://') || currentURL.startsWith('https://')) {
				URLTable = [...URLTable, currentURL];
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
		<img alt="scan" src={fetch} class="h-7" />
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
		on:keydown={handleKeydown}
	/>
	<div class="overflow-x-auto mb-4">
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
							class="w-4 text-gray-100">✖</td
						>
						<td class="font-mono">{url}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<h1 class="mb-2 text-2xl font-bold">Recent scans</h1>
</div>
