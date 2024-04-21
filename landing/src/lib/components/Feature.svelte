<script lang="ts">
  import feature1Image from '$/assets/images/landing/feature-1.png'
  import feature2Image from '$/assets/images/landing/feature-2.png'
  import feature3Image from '$/assets/images/landing/feature-3.png'
</script>


<section class="relative py-8 lg:py-20" id="features">
  <div class="absolute start-[10%] z-0">
    <div
      class="pointer-events-none aspect-square w-60 rounded-full bg-gradient-to-r from-primary/10 via-violet-500/10 to-purple-500/10 blur-3xl [transform:translate3d(0,0,0)] lg:w-[600px]"></div>
  </div>

  <div class="container">
    <div class="flex flex-col items-center">
      <h2 class="inline text-4xl font-semibold">Magical Things</h2>

      <p class="mt-4 text-lg sm:text-center">
        Protect your digital assets with our cutting-edge SaaS platform. Elevate your digital experience
      </p>
    </div>

    <div class="relative z-[2] mt-8 grid gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-12">
      <div
        class="overflow-hidden rounded-lg bg-base-200 shadow-md transition-all hover:shadow-xl">
        <img
          alt="saas img"
          class="overflow-hidden rounded-ss-lg"
          src={feature1Image} />
      </div>

      <div class="lg:mt-8">
        <div class="badge badge-primary">Watermarks</div>
        <h3 class="mt-2 text-3xl font-semibold">Invisible Watermarking</h3>
        <p class="mt-2 text-base font-medium">
          <span class="font-normal"
            >Marked<span class="font-bold">Down</span></span
          > applies invisible watermarks to your digital assets, ensuring that your content is protected without altering its appearance.
        </p>

        <ul class="mt-4 list-inside list-disc text-base">
          <li>Most images take under 10s to process</li>
          <li>Most photographer-friendly formats accepted</li>
          <li>Made by a photographer, for photographers</li>
          <li>Temper resistant to most compression formats</li>
        </ul>
      </div>
    </div>

    <div class="mt-8 grid gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-12">
      <div>
        <div class="badge badge-primary">Chrome Extensions</div>
        <h3 class="mt-2 text-3xl font-semibold">Use on the fly</h3>
        <p class="mt-2 text-base">
          <span class="font-normal"
            >Marked<span class="font-bold">Down</span></span
          > integrates a Chrome extension which can help you easily scan any website for your watermarked images.
        </p>

        <ul class="mt-4 list-inside list-disc text-base">
          <li>Scan any website with a single click</li>
          <li>Access all scanned images in one place</li>
          <li>Check specific images for watermarks</li>
          <li>Easily remove watermarking from images</li>
        </ul>
      </div>

      <div class="order-first lg:order-last">
        <div
          class="overflow-hidden rounded-lg bg-base-200 shadow-md transition-all hover:shadow-xl">
          <img
            alt="saas img"
            class="overflow-hidden rounded-ss-lg"
            src={feature2Image}/>
        </div>
      </div>
    </div>

    <div class="mt-8 grid gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-12">
      <div
        class="overflow-hidden rounded-lg bg-base-200 shadow-md transition-all hover:shadow-xl">
        <img
          alt="saas img"
          class="overflow-hidden rounded-ss-lg"
          src={feature3Image} />
      </div>

      <div class="lg:mt-8">
        <div class="badge badge-primary">Artificial Intelligence</div>
        <h3 class="mt-2 text-3xl font-semibold">Cutting Edge AI Integration</h3>
        <p class="mt-2 text-base">
          <span class="font-normal"
            >Marked<span class="font-bold">Down</span></span
          > employs Google's Gemini 1.5 Pro to examine and embed images in a vector database while using Fetch.ai's Agentverse to ensure seamless scraping and indexing of websites.
        </p>

        <ul class="mt-4 list-inside list-disc text-base">
          <li>Index ~3600 images at a time</li>
          <li>Sub 10s Agentverse scraping</li>
          <li>Seamless one-click activation</li>
        </ul>
      </div>
    </div>
  </div>
</section>
