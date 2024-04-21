<script lang="ts">
  import ScanImage from "$lib/components/ScanImage.svelte";
  import { writable } from "svelte/store";
  import gemini from "$lib/assets/gemini.svg";

  const pageTitle = writable("");
  const imageArray = writable([]);

  let email = "kushhansagarwal@gmail.com";

  let testImages: string[] = [
    // "https://images.world-of-waterfalls.com/pin-Iguazu_Falls_131_jx_09012007-top-10-waterfalls.jpg",
    // "https://images.world-of-waterfalls.com/Plitvice_562_06012010.jpg",
    // "https://www.world-of-waterfalls.com/wp-content/uploads/unisex-basic-softstyle-t-shirt-black-front-603b579ab9d1e-600x600.jpg",
  ];

  $: testImages = testImages.filter((image: string) => {
    return (
      image.endsWith(".jpg") ||
      image.endsWith(".jpeg") ||
      image.endsWith(".JPG") ||
      image.endsWith(".png")
    );
  });

  $: if (testImages.length > 0) {
    console.log(testImages.join(", ").replaceAll('"', ""));
  }

  enum state {
    IDLE,
    LOADING,
    SUCCESS,
    ERROR,
  }

  let siteScanState = state.IDLE;

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
      <span class="font-normal">Marked<span class="font-bold">Down</span></span>
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
        want to scan. Or click here to scan all the images. Results would be available
        on the website.
      </p>
      <button
        disabled={siteScanState === state.LOADING}
        on:click={async () => {
          siteScanState = state.LOADING;
          const formData = new FormData();
          formData.append("email", email);
          formData.append("urls", testImages.join(", ").replaceAll('"', ""));
          const response = await fetch("http://localhost:5173/api/image/scansite", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            console.log("Site scanned successfully");
            siteScanState = state.SUCCESS;
          } else {
            console.error("Failed to scan site");
            siteScanState = state.ERROR;
          }
        }}
        class="btn btn-default btn-xs"
        >{siteScanState === state.LOADING
          ? "Scanning..."
          : siteScanState === state.SUCCESS
            ? "Scanned"
            : "Scan site"}
        <img alt="scan" src={gemini} class="h-3 w-3" /></button
      >
      <!-- <p class="text-gray-500 text-xs">{email}</p> -->
    {/if}
  </div>
  <div class="divider"></div>
  <div>
    {#each testImages as image}
      <ScanImage {image} {email} />
    {/each}
  </div>
</main>
