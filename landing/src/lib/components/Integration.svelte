<script lang="ts">
  import amazonMiniImage from "$/assets/images/logo/amazon-mini.svg";
  import slackImage from "$/assets/images/logo/slack.svg";
  import linkedin from "$/assets/images/logo/LinkedIn_icon.svg";
  import github from "$/assets/images/logo/github.svg";
  import whatsappImage from "$/assets/images/logo/whatsapp.svg";
  import camera from "$/assets/images/logo/camera.svg";
  import gDriveImage from "$/assets/images/logo/g-drive.svg";
  import kushImage from "$/assets/images/landing/kush.jpg";
  import bitbucketMiniImage from "$/assets/images/logo/bitbucket-mini.svg";
  import { ArrowRight } from "lucide-svelte";
</script>

<section class="py-8 lg:py-20" id="integrations">
  <div class="container">
    <div class="text-center">
      <h2 class="text-4xl font-semibold">
        For Photographers, By Photographers
      </h2>
      <p class="mt-2 text-lg sm:text-center">
        Say goodbye to photography's biggest headache. <span class="font-normal"
          >Marked<span class="font-bold">Down</span></span
        > is the ultimate solution for watermarking images
      </p>
    </div>
    <div
      class="mt-12 rounded-lg bg-base-200 p-8 text-base-content lg:px-24 lg:py-14"
    >
      <div class="grid items-center gap-8 lg:grid-cols-2">
        <div class="inline-flex flex-col text-center lg:text-start">
          <h3 class="text-3xl font-medium leading-snug">
            Built at LA Hacks. Built for the world.
          </h3>
          <p class="mt-4 text-2xl leading-normal">
            By <span class="font-bold">Kush Agarwal</span>
          </p>
          <p class="font-medium">Aerospace Engineering @ UCLA</p>
        </div>

        <div class="mt-8">
          <img alt="kush agarwal" class="rounded-lg" src={kushImage} />
        </div>
      </div>
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-3">
      <div
        class="card cursor-pointer border border-base-content/10 p-6 transition-all hover:shadow"
      >
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div
              class="flex h-16 w-16 items-center justify-center rounded-full bg-base-200"
            >
              <img alt="slack" class="h-8 w-8" src={linkedin} />
            </div>
            <h3 class="text-xl font-semibold">LinkedIn</h3>
          </div>
          <button
            on:click={() => {
              window.location.href = "https://www.linkedin.com/in/kushhansagarwal/";
            }}
            class="btn btn-circle"
            aria-label="Details"
          >
            <ArrowRight class="text-2xl"></ArrowRight>
          </button>
        </div>
      </div>

      <div
        class="card cursor-pointer border border-base-content/10 p-6 transition-all hover:shadow"
      >
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div
              class="flex h-16 w-16 items-center justify-center rounded-full bg-base-200"
            >
              <img alt="google drive" class="h-8 w-8" src={camera} />
            </div>
            <h3 class="text-xl font-semibold">Photography</h3>
          </div>
          <button
            on:click={() => {
              window.location.href = "https://www.kush.photos";
            }}
            class="btn btn-circle"
            aria-label="Details"
          >
            <ArrowRight class="text-2xl"></ArrowRight>
          </button>
        </div>
      </div>

      <div
        class="card cursor-pointer border border-base-content/10 p-6 transition-all hover:shadow"
      >
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div
              class="flex h-16 w-16 items-center justify-center rounded-full bg-base-200"
            >
              <img alt="bitbucket" class="h-8 w-8" src={github} />
            </div>
            <h3 class="text-xl font-semibold">GitHub</h3>
          </div>
          <button
            on:click={() => {
              window.location.href = "https://www.github.com/kushhansagarwal";
            }}
            class="btn btn-circle"
            aria-label="Details"
          >
            <ArrowRight class="text-2xl"></ArrowRight>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
