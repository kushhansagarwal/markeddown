<script lang="ts">
	import { PUBLIC_API_ENDPOINT_PY } from '$env/static/public';
	import fetchLogo from '$lib/assets/fetch-logo.svg';
	import gemini from '$lib/assets/gemini.svg';

	let URLTable: string[] = []; // ['https://www.fetch.ai', 'https://www.gemini.com'];
	let currentURL: string = '';

	let scans: {
		urls: string[];
		website: string;
		time: string;
	}[] = [
		{
			urls: [
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio3_L6ZRpw-Tb.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio4_y9tg5EXsC.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio8_iOgKa4obO.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio2_KD5B4I49M.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio14_uIiv-pxrg.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio15_go9RQ9RCva.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio27_GBfnxXxNA.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio26_-zJ3T8aJXj.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio32_yqEN10OvTK.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio31_bHmmETwhU.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/9d4f65da-4f59-40d8-9b34-63a077bc9a4c_rw_1920_AeBuxA1DuL.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/3bec9c7e-1bd8-4a88-a138-7c170caecfa9_rw_1920_CW878vYhtR.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/b05d557e-69a9-463e-af2e-641a23a3fdbe_rw_1920_zMpGeLiIEn.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/e2c4e162-faab-487f-af00-4b191cfbdb0e_rw_1920_fIeEN-yp1v.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/DSC00455-Edit_fvjg3G5bb.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/DSC00381_UWrzktkNW.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/DSC00711-Edit-3_sxdGjyUG0.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/DSC00658-2_Qw5H9UC84.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/DSC00670-2_RjGU5JE0rv.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/DSC02226_vylFMwG94b.jpeg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/DSC01702_vTq5k0YfCx.jpeg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/DSC01082_jYEWrcvQR.jpeg"'
			],
			website: 'https://www.kush.photos/?tag=portrait',
			time: '21/04/2024, 00:44:13'
		},
		{
			urls: [
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio3_L6ZRpw-Tb.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio4_y9tg5EXsC.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio8_iOgKa4obO.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio2_KD5B4I49M.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio14_uIiv-pxrg.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio15_go9RQ9RCva.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio27_GBfnxXxNA.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio26_-zJ3T8aJXj.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio32_yqEN10OvTK.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/portfolio31_bHmmETwhU.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/9d4f65da-4f59-40d8-9b34-63a077bc9a4c_rw_1920_AeBuxA1DuL.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/3bec9c7e-1bd8-4a88-a138-7c170caecfa9_rw_1920_CW878vYhtR.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/b05d557e-69a9-463e-af2e-641a23a3fdbe_rw_1920_zMpGeLiIEn.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/e2c4e162-faab-487f-af00-4b191cfbdb0e_rw_1920_fIeEN-yp1v.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/DSC00455-Edit_fvjg3G5bb.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/DSC00381_UWrzktkNW.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/DSC00711-Edit-3_sxdGjyUG0.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/DSC00658-2_Qw5H9UC84.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/DSC00670-2_RjGU5JE0rv.jpg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/DSC02226_vylFMwG94b.jpeg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/DSC01702_vTq5k0YfCx.jpeg',
				'https://ik.imagekit.io/wy49ay1bjy4c/portfolio/DSC01082_jYEWrcvQR.jpeg"'
			],
			website: 'https://www.kush.photos/?tag=portrait',
			time: '21/04/2024, 00:44:13'
		}
	];

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
						body: JSON.stringify({ message: url })
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
							const formattedResponse = textData.replace('"', '').split(', ');
							scans = [
								...scans,
								{
									urls: formattedResponse,
									website: url,
									time: new Date().toLocaleString()
								}
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
					console.log(scans); // Handle the response data
					disableInput = false;
				});
			}}>Scan with <img alt="scan" src={fetchLogo} class="h-3" /></button
		>
	</div>

	<h1 class="mb-2 text-2xl font-bold">Recent scans</h1>

	<div class="grid gap-5">
		{#each scans as scan}
			<div class="rounded-md bg-base-200 p-5">
				<p class="font-mono">{scan.website}</p>
				<p class="mb-5 text-xs text-gray-400">{scan.time}</p>
				<p class="mb-2 font-bold">Images</p>
				<div class="grid grid-cols-5 gap-4">
					{#each scan.urls as url}
						<img src={url.replace('"', '')} alt="scan" class="rounded-md object-cover shadow-lg" />
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
