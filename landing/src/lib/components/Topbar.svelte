<script lang="ts">
  import { Menu } from 'lucide-svelte'

  let atTop = true;

  const onWindowScroll = () => {
    atTop = (window.pageYOffset < 30)
  }

  window.addEventListener('scroll', onWindowScroll)
  onWindowScroll();
</script>

<div
  id="navbar-wrapper"
  class="sticky top-0 z-10 border-b border-base-300 bg-base-100 lg:bg-opacity-95 lg:backdrop-blur-sm  {atTop?'border-transparent':'border-base-content/10'}">
  <div class="container">
    <nav class="navbar px-0">
      <div class="navbar-start gap-2">
        <div class="flex-none lg:hidden">
          <label for="my-drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
            <Menu class="h-5"/>
          </label>
        </div>

        <!-- Navbar Brand logo -->
        <a class="btn btn-ghost text-xl"
			><span class="font-normal">Marked<span class="font-bold">Down</span></span></a
		>
      </div>

      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal menu-sm gap-2 px-1">
          <li class="font-medium"><a href="#home">Home</a></li>
          <li class="font-medium"><a href="#features">Features</a></li>
          <li class="font-medium"><a href="#integrations">Integrations</a></li>
          <li class="font-medium"><a href="#pricing">Pricing</a></li>
          <li class="font-medium"><a href="#faq">FAQ</a></li>
        </ul>
      </div>

      <div class="navbar-end gap-3">
        <a class="btn btn-ghost btn-sm">Go to app</a>
      </div>
    </nav>

    <!-- sm screen menu (drawer) -->
    <div class="drawer">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-side">
        <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>

        <ul class="menu min-h-full w-80 gap-2 bg-base-100 p-4 text-base-content">
          <!-- Navbar Brand logo -->
          <li class="font-medium">
            <a href="index.html" class="text-xl font-bold">SaaS Landing</a>
          </li>

          <li class="font-medium"><a href="#home">Home</a></li>
          <li class="font-medium"><a href="#features">Features</a></li>
          <li class="font-medium"><a href="#integrations">Integrations</a></li>
          <li class="font-medium"><a href="#pricing">Pricing</a></li>
          <li class="font-medium"><a href="#faq">FAQ</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
