<script setup>
import 'vue3-carousel/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { ref } from 'vue';

const configTop = {
  itemsToShow: 1.4,
  gap: 12,
  autoplay: 3500,
  wrapAround: true,
  transition: 1200, 
  pauseAutoplayOnHover: true,
  breakpoints: {
    768: { itemsToShow: 2.8, gap: 15 },
    1024: { itemsToShow: 4.8, gap: 20 }, 
  },
};

const configBottom = {
  ...configTop,
  autoplay: 4000, 
  transition: 1500,
};

const images1 = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  url: `/images/gallery/top/${index + 1}.jpg`,
}));

const images2 = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  url: `/images/gallery/bottom/${index + 1}.jpg`,
}));
</script>

<template>
  <section class="py-16 lg:py-24 bg-gray-100/50 overflow-hidden relative">
    
    <div class="absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-gray-100 via-gray-100/70 to-transparent z-10 pointer-events-none"></div>
    <div class="absolute inset-y-0 right-0 w-[30%] bg-gradient-to-l from-gray-100 via-gray-100/70 to-transparent z-10 pointer-events-none"></div>

    <div class="container mx-auto px-6 mb-12 relative z-20">
      <div class="pl-6">
        <h2 class="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-2">Portfolio</h2>
        <h3 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight uppercase">Our Gallery</h3>
      </div>
    </div>

    <div class="relative w-full">
      <div class="space-y-4 md:space-y-6 gallery-mask relative">
        <Carousel v-bind="configTop">
          <Slide v-for="image in images1" :key="image.id">
            <div class="w-full aspect-[16/10] bg-white overflow-hidden group border border-gray-200/50">
              <img 
                :src="image.url" 
                alt="Gallery item" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms] ease-out" 
              />
            </div>
          </Slide>
        </Carousel>

        <Carousel v-bind="configBottom" dir="rtl">
          <Slide v-for="image in images2" :key="image.id">
            <div class="w-full aspect-[16/10] bg-white overflow-hidden group border border-gray-200/50">
              <img 
                :src="image.url" 
                alt="Gallery item" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms] ease-out" 
              />
            </div>
          </Slide>
        </Carousel>
      </div>
    </div>

    <div class="container mx-auto px-6 mt-16 text-center relative z-20">
      <NuxtLink 
        to="/gallery" 
        class="group inline-flex flex-col items-center"
      >
        <span class="text-[10px] font-black uppercase tracking-[0.4em] text-gray-900 group-hover:text-primary transition-colors">
          View Full Gallery
        </span>
        <div class="h-[2px] w-8 bg-primary/20 group-hover:w-full transition-all duration-500 mt-2"></div>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
:deep(.carousel__track) {
  transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
}

:deep(.carousel__slide) {
  padding: 0;
}


.gallery-mask {
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}
</style>