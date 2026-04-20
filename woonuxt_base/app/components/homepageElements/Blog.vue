<template>
  <div class="container">
    <!-- Card Blog -->
    <div class="pt-20 pb-9">
      <!-- Title -->
      <div class="text-center mb-5">
        <h2 class="text-lg font-semibold md:text-3xl mb-2">CSR Activities</h2>
        <p class="text-center text-gray-600 mb-9 text-lg"><span class="size-3 rounded-full bg-primary inline-block mr-2"></span>Empowering change together</p>
      </div>
      <!-- End Title -->

      <!-- Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Card -->
        <NuxtLink to="/about" class="group flex flex-col h-full border border-gray-200 transition duration-300 rounded-xl p-5" href="#">
          <div class="overflow-hidden rounded-xl">
            <img
              class="w-full object-cover group-hover:scale-105 transition-all duration-200"
              src="https://www.asterisknepal.com/storage/ais/files/1/social%20responsibility/health%20camp.jpg"
              alt="Blog Image" />
          </div>
          <div class="my-5 text-center">
            <h3 class="text-xl font-semibold text-gray-800 group-hover:text-primary">Wash and Sanitation Program</h3>
            <p class="mt-2 text-gray-600">Asterisk Nepal is committed to promoting hygiene and sanitation practices in the workplace.</p>
          </div>
          <div class="text-center pb-1.5">
            <NuxtLink to="/about" class="text-primary text-sm inline-block border border-primary rounded-full px-5 py-2 hover:bg-primary hover:text-white"
              >Read More</NuxtLink
            >
          </div>
        </NuxtLink>
        <!-- End Card -->
        <!-- Card -->
        <NuxtLink to="/about" class="group flex flex-col h-full border border-gray-200 transition duration-300 rounded-xl p-5" href="#">
          <div class="overflow-hidden rounded-xl">
            <img
              class="w-full object-cover group-hover:scale-105 transition-all duration-200"
              src="https://www.asterisknepal.com/storage/ais/files/1/24b16786-a5b3-49ee-9923-a690164f03e1_office-sanitation-program.jpg"
              alt="Blog Image" />
          </div>
          <div class="my-5 text-center">
            <h3 class="text-xl font-semibold text-gray-800 group-hover:text-primary">Health Camp and Checkup</h3>
            <p class="mt-2 text-gray-600">At Asterisk Nepal, our mission has always been focused on bringing openness.</p>
          </div>
          <div class="text-center pb-1.5">
            <NuxtLink to="/about" class="text-primary text-sm inline-block border border-primary rounded-full px-5 py-2 hover:bg-primary hover:text-white"
              >Read More</NuxtLink
            >
          </div>
        </NuxtLink>
        <!-- End Card -->

        <!-- Card -->
        <NuxtLink to="/about" class="group flex flex-col h-full border border-gray-200 transition duration-300 rounded-xl p-5" href="#">
          <div class="overflow-hidden rounded-xl">
            <img
              class="w-full object-cover group-hover:scale-105 transition-all duration-200"
              src="https://www.asterisknepal.com/storage/ais/files/1/social%20responsibility/health%20camp.jpg"
              alt="Blog Image" />
          </div>
          <div class="my-5 text-center">
            <h3 class="text-xl font-semibold text-gray-800 group-hover:text-primary">Mindfulness Training</h3>
            <p class="mt-2 text-gray-600">At Wake, our mission has always been focused on bringing openness.</p>
          </div>
          <div class="text-center pb-1.5">
            <NuxtLink to="/about" class="text-primary text-sm inline-block border border-primary rounded-full px-5 py-2 hover:bg-primary hover:text-white"
              >Read More</NuxtLink
            >
          </div>
        </NuxtLink>
        <!-- End Card -->
      </div>
      <!-- End Grid -->
    </div>
    <!-- End Card Blog -->
  </div>
</template>
