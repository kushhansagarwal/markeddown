<div class="navbar bg-base-100 p-3">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl">Marked<span class="font-bold">Down</span></a>
  </div>
  <div class="flex-none">
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
        <div class="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span class="badge badge-sm indicator-item">8</span>
        </div>
      </div>
      <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div class="card-body">
          <span class="font-bold text-lg">8 Items</span>
          <span class="text-info">Subtotal: $999</span>
          <div class="card-actions">
            <button class="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>

<section class="min-h-screen flex items-center justify-center">
  <div class="max-w-5xl mx-auto p-4 w-full">
    <h2 class="text-2xl font-bold text-left mb-8">Upload and Input</h2>
    <div class="flex flex-wrap justify-between items-center">
      <div class="w-full lg:max-w-[50%] px-4 mb-4 lg:mb-0">
        <div class="flex justify-center items-center">
          <label for="upload" class="cursor-pointer w-full">
            <div class="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12" />
              </svg>
              <span>Upload Image</span>
            </div>
            <input id="upload" type="file" class="hidden" />
          </label>
        </div>
      </div>
      <div class="w-full lg:max-w-[50%] px-4">
        <div class="flex flex-col w-full">
          <label for="textInput" class="text-lg font-semibold mb-2">Title</label>
          <input id="textInput" type="text" placeholder="Enter your text here" class="input input-bordered w-full mb-6" />
          <label for="textInput" class="text-lg font-semibold mb-2">Description</label>
          <input id="textInput" type="text" placeholder="Enter your text here" class="input input-bordered w-full mb-6" />
          <label for="textInput" class="text-lg font-semibold mb-2">Location</label>
          <input id="textInput" type="text" placeholder="Enter your text here" class="input input-bordered w-full mb-6" />
        </div>
      </div>
    </div>
  </div>
</section>

