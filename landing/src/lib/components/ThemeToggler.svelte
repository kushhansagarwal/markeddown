<script lang="ts">
  import { Airplay, Moon, Sun } from 'lucide-svelte'

  const changeTheme = (theme: 'system'|'dark'|'light') => {
    if(theme=='system'){
      changeTheme(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
    }else{
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

</script>

<!-- Theme Toggle -->
<div class="fixed bottom-5 end-5 z-10 flex flex-col items-center">
  <div class="dropdown dropdown-end dropdown-top">
    <div class="btn mt-2" role="button" tabindex="0">
      Theme
      <svg
        class="inline-block h-2 w-2 rotate-180 fill-current opacity-60"
        height="12px"
        viewBox="0 0 2048 2048"
        width="12px"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
      </svg>
    </div>
    <ul
      class="menu dropdown-content menu-xs text-base z-[1] w-52 rounded-box bg-base-300 shadow-2xl"
      tabindex="0">
      <li class="text-base">
        <button data-set-theme="" data-act-class="active" on:click={()=>changeTheme('system')}>
          <Airplay class="h-5"/>
          <span class="text-sm">System</span>
        </button>
      </li>
      <li>
        <button data-set-theme="light" data-act-class="active" on:click={()=>changeTheme('light')}>
          <Sun class="h-5"/>
          <span class="text-sm">Light</span>
        </button>
      </li>
      <li>
        <button data-set-theme="dark" data-act-class="active" on:click={()=>changeTheme('dark')}>
          <Moon class="h-5"/>
          <span class="text-sm">Dark</span>
        </button>
      </li>
    </ul>
  </div>
</div>
