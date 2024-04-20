<script lang="ts">
	import { PUBLIC_API_ENDPOINT_PY } from '$env/static/public';

	let imageUrl: string | null = null;

	const handleSubmit = async (e: Event) => {
		const target = e.target as HTMLInputElement;
		if (!target.files) return;
		const image = target.files[0];
		const formData = new FormData();
		formData.append('file', image);

		const response = await fetch(`${PUBLIC_API_ENDPOINT_PY}/uploadfile`, {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			const data = await response.blob();
			imageUrl = URL.createObjectURL(data);
		} else {
			console.error('Failed to upload image');
		}
	};
</script>

<div class="navbar bg-base-100 p-3">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl">Marked<span class="font-bold">Down</span></a>
	</div>
	<div class="flex-none">
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle">
				<div class="indicator">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
						/></svg
					>
					<span class="badge badge-sm indicator-item">8</span>
				</div>
			</div>
			<div
				tabindex="0"
				class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
			>
				<div class="card-body">
					<span class="text-lg font-bold">8 Items</span>
					<span class="text-info">Subtotal: $999</span>
					<div class="card-actions">
						<button class="btn btn-primary btn-block">View cart</button>
					</div>
				</div>
			</div>
		</div>
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					<img
						alt="Tailwind CSS Navbar component"
						src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
					/>
				</div>
			</div>
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
			>
				<li>
					<a class="justify-between">
						Profile
						<span class="badge">New</span>
					</a>
				</li>
				<li><a>Settings</a></li>
				<li><a>Logout</a></li>
			</ul>
		</div>
	</div>
</div>

<section class="flex min-h-screen items-center justify-center">
	<div class="mx-auto w-full max-w-5xl p-4">
		<h2 class="mb-8 text-left text-2xl font-bold">Upload and Input</h2>
		<div class="flex flex-wrap items-center justify-between">
			<div class="mb-4 w-full px-4 lg:mb-0 lg:max-w-[50%]">
				<div class="flex items-center justify-center">
					<label for="upload" class="w-full cursor-pointer">
						{#if !imageUrl}
							<div
								class="flex flex-col items-center rounded-lg border-2 border-dashed border-gray-300 p-4"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-12 w-12"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
									/>
								</svg>
								<span>Upload Image</span>
							</div>
						{:else}
							<img src={imageUrl} alt="Uploaded Image" />
						{/if}
						<input on:change={(e) => handleSubmit(e)} id="upload" type="file" class="hidden" />
					</label>
				</div>
			</div>
			<div class="w-full px-4 lg:max-w-[50%]">
				<div class="flex w-full flex-col">
					<label for="textInput" class="mb-2 text-lg font-semibold">Title</label>
					<input
						id="textInput"
						type="text"
						placeholder="Enter your text here"
						class="input input-bordered mb-6 w-full"
					/>
					<label for="textInput" class="mb-2 text-lg font-semibold">Description</label>
					<input
						id="textInput"
						type="text"
						placeholder="Enter your text here"
						class="input input-bordered mb-6 w-full"
					/>
					<label for="textInput" class="mb-2 text-lg font-semibold">Location</label>
					<input
						id="textInput"
						type="text"
						placeholder="Enter your text here"
						class="input input-bordered mb-6 w-full"
					/>
				</div>
			</div>
		</div>
	</div>
</section>
