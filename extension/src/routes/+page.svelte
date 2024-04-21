<script lang="ts">
  import ScanImage from "$lib/components/ScanImage.svelte";
import { writable } from "svelte/store";

  const pageTitle = writable("");
  const imageArray = writable([]);

  let email = "kushhansagarwal@gmail.com";

  let testImages: string[] = [
    // "https://images.world-of-waterfalls.com/pin-Iguazu_Falls_131_jx_09012007-top-10-waterfalls.jpg",
    // "https://images.world-of-waterfalls.com/Plitvice_562_06012010.jpg",
    // "https://www.world-of-waterfalls.com/wp-content/uploads/unisex-basic-softstyle-t-shirt-black-front-603b579ab9d1e-600x600.jpg",
  ];
  if (
    typeof chrome !== "undefined" &&
    chrome.runtime &&
    chrome.runtime.onMessage
  ) {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "IMG_DATA") {
        imageArray.set(message.payload);
        testImages = $imageArray;
      }
    });
  }
</script>

<main class="h-[200px] w-[500px] p-4">
  <div class="">
    <h1 class="text-lg">
      <span>Marked<span class="font-bold">Down</span></span>
    </h1>
    {#if testImages.length === 0}
      <p class="text-xs mb-3">Reload the page to find all images</p>
      <input
        on:input={() => {}}
        type="text"
        bind:value={email}
        placeholder="Your email"
        class="input bg-base-200 rounded-md input-xs w-full max-w-xs"
      />
    {:else}
      <p class="text-xs mb-3">
        {testImages.length} images found. Click on the button next to the image you
        want to scan.
      </p>
      <p class="text-gray-500 text-xs">{email}</p>
    {/if}
  </div>
  <div class="divider"></div>
  <div>
    {#each testImages as image}
      <ScanImage {image} {email} />
    {/each}
  </div>
</main>
