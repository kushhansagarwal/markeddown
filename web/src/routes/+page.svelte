<script>
	import Upload from '../lib/components/Upload.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;

	onMount(() => {
		if (!data.user) {
			goto('/api/auth/login');
		}
	});
</script>

<div class="navbar bg-base-100 p-3">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl">Marked<span class="font-bold">Down</span></a>
	</div>
	<div class="flex-none gap-2">
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					<img alt="Tailwind CSS Navbar component" src={data.user?.picture} />
				</div>
			</div>
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
			>
				<li><a href="/api/auth/logout">Logout</a></li>
			</ul>
		</div>
	</div>
</div>

<section class="flex items-stretch">
	<div role="tablist" class="tabs tabs-bordered mx-auto">
		<input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="MarkDown photo" checked />
		<div role="tabpanel" class="tab-content p-10">
			<div class="mx-auto">
				<Upload {data} />
			</div>
		</div>

		<input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Check photo" />
		<div role="tabpanel" class="tab-content p-10">Tab content 2</div>

		<input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Your photo" />
		<div role="tabpanel" class="tab-content p-10">Tab content 3</div>
	</div>
</section>
