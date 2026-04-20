<script setup>
const countries = [
  { name: 'USA', image: '/images/flags/usa.png' },
  { name: 'Canada', image: '/images/flags/canada.png' },
  { name: 'Germany', image: '/images/flags/germany.png' },
  { name: 'UK', image: '/images/flags/uk.png' },
  { name: 'New Zealand', image: '/images/flags/new-zealand.png' },
  { name: 'Denmark', image: '/images/flags/denmark.png' },
];
</script>

<template>
  <div class="py-16 md:py-24 bg-white">
    <div class="container mx-auto px-6">
      
      <div class="mb-16">
        <h2 class="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Global Reach</h2>
        <h3 class="text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase">Export Countries</h3>
        <p class="mt-4 text-gray-500 text-[13px] max-w-xl leading-relaxed uppercase tracking-wider">
          Exporting premium handmade treasures to international markets with resilience and pride.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        <div 
          v-for="country in countries" 
          :key="country.name" 
          class="group flex flex-col items-center justify-center p-10 bg-gray-50 border border-gray-100 transition-all duration-500 hover:bg-white hover:border-gray-200"
        >
          <div class="relative size-16 md:size-20 mb-6 filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out">
            <img 
              :src="country.image" 
              :alt="country.name" 
              class="w-full h-full object-contain"
              loading="lazy" 
            />
          </div>
          
          <strong class="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-primary transition-colors duration-500">
            {{ country.name }}
          </strong>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Ensuring sharp edges stay crisp */
.group {
  backface-visibility: hidden;
  transform: translateZ(0);
}
</style>