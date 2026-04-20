<script setup>
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Pagination } from 'vue3-carousel';

const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
  autoplay: 6000,
  transition: 1000,
  pauseAutoplayOnHover: false,
};

// 1. Fetch Dynamic Banners from WordPress
const { data, pending } = await useAsyncData('home-banners', () => GqlGetBanners());

// 2. Map WP Data to your Slide Structure
const slides = computed(() => {
  return data.value?.banners?.nodes.map(banner => ({
    id: banner.id,
    title: banner.title || '',
    // Subtitle comes from the 'Excerpt' field (stipping HTML tags)
    subtitle: banner.excerpt ? banner.excerpt.replace(/<[^>]*>?/gm, '') : '', 
    image: banner.featuredImage?.node?.sourceUrl || '/images/banner.jpeg'
  })) || [];
});
</script>

<template>
  <section class="relative h-[600px] md:h-[90vh] w-full overflow-hidden bg-gray-900">
    <ClientOnly>
      <Carousel v-if="slides.length > 0" v-bind="carouselConfig" class="h-full">
        <Slide v-for="(slide, index) in slides" :key="slide.id" class="w-full h-full">
          <div class="relative w-full h-full flex items-end justify-start p-8 md:p-20 lg:p-32 overflow-hidden">
            
            <img 
              :src="slide.image" 
              class="absolute inset-0 w-full h-full object-cover slide-image" 
              :alt="slide.title"
            />
            
            <div class="absolute inset-0 bg-black/20"></div> 
            <div class="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent"></div>

            <div class="relative z-10 text-left max-w-4xl">
              <p class="slide-subtitle text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-primary mb-6">
                {{ slide.subtitle }}
              </p>
              
              <h2 
                class="slide-title text-5xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-[0.8] whitespace-pre-line"
                v-html="slide.title"
              ></h2>

              <div class="mt-12 slide-action">
                <NuxtLink to="/products" class="group inline-flex items-center gap-6">
                  <span class="px-10 py-4 border border-white/20 group-hover:border-primary group-hover:bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500">
                    Shop Collection
                  </span>
                  <div class="w-12 h-px bg-white/40 group-hover:w-16 group-hover:bg-primary transition-all duration-500 hidden md:block"></div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </Slide>

        <template #addons>
          <div class="absolute bottom-10 right-10 md:right-20 w-auto">
            <Pagination />
          </div>
        </template>
      </Carousel>

      <div v-else-if="pending" class="w-full h-full flex items-center justify-center text-white font-black uppercase tracking-widest">
        Loading Artistry...
      </div>
    </ClientOnly>
  </section>
</template>

<style scoped>
:deep(.carousel),
:deep(.carousel__viewport),
:deep(.carousel__track) {
  height: 100% !important;
}

.slide-image {
  transition: transform 10s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: scale(1.05);
}

.carousel__slide--active .slide-image {
  transform: scale(1.2);
}

/* Minimalist Text Animations */
.slide-subtitle, .slide-title, .slide-action {
  opacity: 0;
  transform: translateX(-40px);
  transition: all 1200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.carousel__slide--active .slide-subtitle {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 400ms;
}

.carousel__slide--active .slide-title {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 600ms;
}

.carousel__slide--active .slide-action {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 800ms;
}

/* Sharp Pagination Styling */
:deep(.carousel__pagination) {
  @apply flex flex-col gap-4;
}

:deep(.carousel__pagination-button) {
  @apply w-1 h-1 rounded-full bg-white/30 p-0 transition-all duration-500;
}

:deep(.carousel__pagination-button--active) {
  @apply h-10 bg-primary; /* Sharp vertical line effect */
}

:deep(.carousel__pagination-button::after) {
  display: none;
}
</style>