<script lang="ts">
	import Upload from '../lib/components/Upload.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import List from '$lib/components/List.svelte';
	import Check from '$lib/components/Check.svelte';
  import Scans from '$lib/components/Scans.svelte';

	export let data;

	enum section {
		upload = 'MarkDown photo',
		list = 'Your photos',
		photo = 'photo',
		scans = 'scans'
	}

	let currentSection = section.upload;

	onMount(() => {
		if (!data.isAuthenticated) {
			goto('/api/auth/login');
		}
	});
</script>

<div class="navbar bg-base-100 p-3">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl"><span class="font-normal">Marked<span class="font-bold">Down</span></span></a>
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
				<li><a href="/api/auth/logout">Chrome Auth</a></li>
				<li><a class="font-bold" href="/api/auth/logout">Logout</a></li>
			</ul>
		</div>
	</div>
</div>

<div class="mx-auto max-w-5xl">
	<div role="tablist" class="tabs tabs-bordered mb-5">
		<input
			on:click={() => (currentSection = section.upload)}
			type="radio"
			checked
			name="my_tabs_1"
			role="tab"
			class="tab text-md"
			aria-label="Apply MarkedDown"
		/>

		<input
			on:click={() => (currentSection = section.list)}
			type="radio"
			name="my_tabs_1"
			role="tab"
			class="tab"
			aria-label="Your photos"
		/>

		<input
			on:click={() => (currentSection = section.scans)}
			type="radio"
			name="my_tabs_1"
			role="tab"
			class="tab"
			aria-label="Your scans"
		/>

		<input
			on:click={() => (currentSection = section.photo)}
			type="radio"
			name="my_tabs_1"
			role="tab"
			class="tab"
			aria-label="Check photo"
		/>
	</div>
</div>
<section class="flex">
	{#if currentSection === section.upload}
		<div class="mx-auto">
			<div class="mx-auto">
				{#if data.user}
					<Upload {data} />
				{:else}
					<!-- Optionally, provide feedback or alternative content when user is null -->
					<p>Please log in to upload files.</p>
				{/if}
			</div>
		</div>
	{:else if currentSection === section.list}
		<div class="mx-auto">
			<div class="mx-auto">
				{#if data.images}
					<List images={data.images} />
				{:else}
					<!-- Optionally, provide feedback or alternative content when user is null -->
					<p>Please log in to upload files.</p>
				{/if}
			</div>
		</div>
	{:else if currentSection === section.scans}
		<div class="mx-auto">
			<div class="mx-auto">
				{#if data.images}
					<Scans images={data.images} />
				{:else}
					<!-- Optionally, provide feedback or alternative content when user is null -->
					<p>Please log in to upload files.</p>
				{/if}
			</div>
		</div>
	{:else if currentSection === section.photo}
		<div class="mx-auto">
			<div class="mx-auto">
				{#if data.user}
					<Check {data} />
				{:else}
					<!-- Optionally, provide feedback or alternative content when user is null -->
					<p>Please log in to upload files.</p>
				{/if}
			</div>
		</div>
	{/if}
</section>
