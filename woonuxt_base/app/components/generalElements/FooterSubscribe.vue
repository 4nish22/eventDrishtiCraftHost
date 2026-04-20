<template>
  <!-- Hero -->
  <div class="relative overflow-hidden border-t border-t-gray-100 bg-gray-50 mt-20">
    <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Announcement Banner -->
      <div class="flex justify-center">
        <a
          class="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 p-2 px-5 rounded-full transition hover:border-gray-300 focus:outline-hidden focus:border-gray-300"
          href="#">
          PRO release - Join to waitlist
        </a>
      </div>
      <!-- End Announcement Banner -->

      <!-- Title -->
      <div class="mt-5 max-w-2xl text-center mx-auto">
        <h3 class="block font-semibold text-gray-800 text-4xl">
          GET READY TO
          <span class="text-primary">EXPLORE</span>
        </h3>
      </div>
      <!-- End Title -->

      <div class="mt-3 max-w-3xl text-center mx-auto">
        <p class="text-lg text-gray-600">We are a team of artisans who are passionate about creating beautiful and unique products.</p>
      </div>

      <!-- Buttons -->
      <div class="mt-8 gap-3 flex justify-center">
        <NuxtLink
          to="/products"
          class="rounded-lg flex font-bold bg-primary text-white text-center min-w-[150px] p-2.5 gap-4 items-center justify-center focus:outline-none"
          >Shop Now</NuxtLink
        >
      </div>
      <!-- End Buttons -->
    </div>
  </div>
  <!-- End Hero -->
</template>
