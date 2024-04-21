<script lang="ts">
  import heroImage from "$/assets/images/landing/saas-hero.png";
  import googleImage from "$/assets/images/logo/google.svg";
  import uclaImage from "$/assets/images/logo/ucla.svg";
  import lahacksImage from "$/assets/images/logo/lahacks.svg";
  import fetchImage from "$/assets/images/logo/fetch.png";
  import Card3d from "card3d";

  const init3DEffect = (e: any) => {
    new Card3d(e, { perspective: 1000, fullPageListening: true });
  };
</script>

<section class="py-8 lg:py-20" id="home">
  <div class="container">
    <div class="grid gap-12 lg:grid-cols-2">
      <div>
        <h1
          class="text-4xl font-black tracking-tighter lg:text-6xl lg:leading-none"
        >
          The next era of digital media protection. Have your assets easily
          <span class="font-normal"
            >Marked<span class="font-bold">Down</span></span
          >
          today.
        </h1>
        <p class="mt-8 text-lg">
          Leverage a tri-faceted digital watermarking solution that protects
          your digital assets from unauthorized use, distribution, and piracy.
        </p>
      </div>

      <div>
        <div
          class="rounded-2xl bg-gradient-to-r from-indigo-200 via-red-200 to-purple-300 p-3"
          use:init3DEffect
          data-card3d=""
          data-card3d-perspective="1000"
          data-card3d-full-page-listening="true"
        >
          <img alt="SaaS" class="rounded-lg" src={heroImage} />
        </div>
      </div>
    </div>

    <h2
      class="mt-12 text-center text-2xl font-semibold text-base-content/60 lg:mt-32"
    >
      <span class="font-normal">Marked<span class="font-bold">Down</span></span>
      Affiliates
    </h2>

    <div
      class="mt-12 grid grid-cols-2 justify-center gap-8 sm:grid-cols-3 md:grid-cols-4"
    >
      <img
        class="mx-auto h-8 cursor-pointer grayscale transition-all duration-500 hover:grayscale-0"
        src={googleImage}
        alt="google logo"
      />
      <img
        class="mx-auto h-8 cursor-pointer grayscale transition-all duration-500 hover:grayscale-0"
        src={lahacksImage}
        alt="google logo"
      />
      <img
        class="mx-auto h-8 cursor-pointer grayscale transition-all duration-500 hover:grayscale-0"
        src={fetchImage}
        alt="google logo"
      />
      <img
        class="mx-auto h-8 cursor-pointer grayscale transition-all duration-500 hover:grayscale-0"
        src={uclaImage}
        alt="google logo"
      />
    </div>
  </div>
</section>
