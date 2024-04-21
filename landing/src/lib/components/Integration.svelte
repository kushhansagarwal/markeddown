<script lang="ts">
  import amazonMiniImage from '$/assets/images/logo/amazon-mini.svg'
  import slackImage from '$/assets/images/logo/slack.svg'
  import openAiImage from '$/assets/images/logo/openai.svg'
  import metaMiniImage from '$/assets/images/logo/meta-mini.svg'
  import whatsappImage from '$/assets/images/logo/whatsapp.svg'
  import xImage from '$/assets/images/logo/x.svg'
  import gDriveImage from '$/assets/images/logo/g-drive.svg'
  import bitbucketMiniImage from '$/assets/images/logo/bitbucket-mini.svg'
  import { ArrowRight } from 'lucide-svelte'


</script>


<section class="py-8 lg:py-20" id="integrations">
  <div class="container">
    <div class="text-center">
      <h2 class="text-4xl font-semibold">Quick Integrations</h2>
      <p class="mt-2 text-lg sm:text-center">
        Effortless Collaboration: Seamlessly integrate tools for unified efficiency with our
        SaaS platform.
      </p>
    </div>
    <div class="mt-12 rounded-lg bg-base-200 p-8 text-base-content lg:px-24 lg:py-14">
      <div class="grid items-center gap-8 lg:grid-cols-2">
        <div class="inline-flex flex-col text-center lg:text-start">
          <h3 class="text-3xl font-medium leading-snug">
            Effortless expert Saas integrations, just a snap away.
          </h3>
          <p class="mt-4 text-lg leading-normal">
            Elevate efficiency with our SaaS platform's seamless integration feature. Connect
            tools effortlessly for a unified digital workspace.
          </p>

          <div class="mt-8 flex justify-center lg:justify-start">
            <button class="btn btn-primary">Quick Connect</button>
          </div>
        </div>

        <div class="mt-8 grid grid-cols-2 gap-14 md:grid-cols-3">
          <div class="flex justify-center lg:justify-end">
            <div
              class="inline-flex h-24 w-24 items-center justify-center rounded-full bg-white shadow">
              <img alt="amazon" class="h-12 w-12" src={amazonMiniImage} />
            </div>
          </div>

          <div class="flex justify-center lg:justify-end">
            <div
              class="inline-flex h-24 w-24 items-center justify-center rounded-full bg-white shadow">
              <img alt="slack" class="h-12 w-12" src={slackImage} />
            </div>
          </div>

          <div class="flex justify-center lg:justify-end">
            <div
              class="inline-flex h-24 w-24 items-center justify-center rounded-full bg-white shadow">
              <img alt="openai" class="h-12 w-12" src={openAiImage} />
            </div>
          </div>

          <div class="flex justify-center lg:justify-end">
            <div
              class="inline-flex h-24 w-24 items-center justify-center rounded-full bg-white shadow">
              <img alt="meta" class="h-12 w-12" src={metaMiniImage} />
            </div>
          </div>

          <div class="flex justify-center lg:justify-end">
            <div
              class="inline-flex h-24 w-24 items-center justify-center rounded-full bg-white shadow">
              <img alt="whatsapp" class="h-12 w-12" src={whatsappImage} />
            </div>
          </div>

          <div class="flex justify-center lg:justify-end">
            <div
              class="inline-flex h-24 w-24 items-center justify-center rounded-full bg-white shadow">
              <img alt="x" class="h-12 w-12" src={xImage}/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-3">
      <div
        class="card cursor-pointer border border-base-content/10 p-6 transition-all hover:shadow">
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-base-200">
              <img alt="slack" class="h-8 w-8" src={slackImage} />
            </div>
            <h3 class="text-xl font-semibold">Slack</h3>
          </div>
          <button class="btn btn-circle" aria-label="Details">
            <ArrowRight class="text-2xl"></ArrowRight>
          </button>
        </div>
        <p class="mt-4 text-sm">
          Streamline project discussions, share updates, and boost real-time collaboration
          effortlessly.
        </p>
      </div>

      <div
        class="card cursor-pointer border border-base-content/10 p-6 transition-all hover:shadow">
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-base-200">
              <img alt="google drive" class="h-8 w-8" src={gDriveImage} />
            </div>
            <h3 class="text-xl font-semibold">Google Drive</h3>
          </div>
          <button class="btn btn-circle" aria-label="Details">
            <ArrowRight class="text-2xl"></ArrowRight>
          </button>
        </div>

        <p class="mt-4 text-sm">
          File management, Enhance collaboration, and Elevate your productivity with the
          convenience of this integrated solution
        </p>
      </div>

      <div
        class="card cursor-pointer border border-base-content/10 p-6 transition-all hover:shadow">
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-base-200">
              <img
                alt="bitbucket"
                class="h-8 w-8"
                src={bitbucketMiniImage} />
            </div>
            <h3 class="text-xl font-semibold">Bitbucket</h3>
          </div>
          <button class="btn btn-circle" aria-label="Details">
            <ArrowRight class="text-2xl"></ArrowRight>
          </button>
        </div>

        <p class="mt-4 text-sm">
          Streamline version control, collaboration, and project management with ease. Embrace
          the power of seamless GitHub integration.
        </p>
      </div>
    </div>
  </div>
</section>
