<script setup lang="ts">
import { email, phone } from '~/woonuxt_base/app/constants';

const { isShowingSearch } = useSearching();

// Logic for scroll direction
const lastScrollTop = ref(0);
const isHidden = ref(false);

const handleScroll = () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop.value && currentScroll > 150) {
    // Scrolling down - hide navbar
    isHidden.value = true;
  } else {
    // Scrolling up - show navbar
    isHidden.value = false;
  }

  // Update last position, preventing negative values on mobile
  lastScrollTop.value = currentScroll <= 0 ? 0 : currentScroll;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header :class="[
    'bg-white sticky top-0 z-50 shadow-md transition-transform duration-300',
    isHidden ? '-translate-y-full' : 'translate-y-0'
  ]">
    <!-- Top Section -->
    <div class="border-b border-gray-100">
      <div class="container flex items-center justify-between py-1 lg:py-1">
        <div class="flex items-center">
          <MenuTrigger class="absolute top-5 left-[18px] lg:hidden" />
          <Logo class="md:w-[200px] transition-all" />
        </div>

        <div class="flex items-center md:flex-1 md:px-4">
          <ProductSearch class="hidden sm:inline-flex" :has-submit-button="true" />
          <SearchTrigger />
        </div>

        <ul class="hidden lg:flex items-center gap-6 font-semibold text-[12px] uppercase tracking-wider text-gray-600">
          <li class="flex items-center gap-2 hover:text-primary transition-colors cursor-default">
            <Icon name="bi:phone" class="size-3.5 text-primary" />
            <a :href="`tel:${phone}`">{{ phone }}</a>
          </li>
          <li class="flex items-center gap-2 hover:text-primary transition-colors cursor-default">
            <Icon name="mage:email" class="size-3.5 text-primary" />
            <a :href="`mailto:${email}`">{{ email }}</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Middle Section -->
    <div class="bg-white border-b border-gray-50">
      <div class="container flex items-center justify-between py-1">
        <MainMenu
          class="items-center hidden gap-6 text-[13px] font-bold uppercase tracking-tight text-gray-700 lg:flex" />

        <div class="sm:hidden py-1 flex-1" v-if="isShowingSearch">
          <ProductSearch class="flex w-full" />
        </div>

        <SocialIconsList class="hidden lg:flex scale-90 origin-right" />
      </div>
    </div>

    <!-- Bottom Section (Primary Color Bar) -->
    <div class="bg-primary">
      <div class="container">
        <div class="flex justify-between items-stretch">
          <CategoriesMenu />

          <ul class="items-center gap-6 text-white text-[12px] font-bold uppercase tracking-wider hidden lg:flex">
            <li class="h-full flex items-center">
              <NuxtLink to="/product-category/dryer-ball" class="hover:opacity-80 transition-opacity py-2.5">
                Dryer Balls
              </NuxtLink>
            </li>
            <li class="h-full flex items-center">
              <NuxtLink to="/product-category/shoes-slippers" class="hover:opacity-80 transition-opacity py-2.5">
                Felt Slippers
              </NuxtLink>
            </li>
            <li class="h-full flex items-center">
              <NuxtLink to="/product-category/cat-cave" class="hover:opacity-80 transition-opacity py-2.5">
                Cat Cave
              </NuxtLink>
            </li>
            <li class="h-full flex items-center">
              <NuxtLink to="/product-category/felt" class="hover:opacity-80 transition-opacity py-2.5">
                Felt Product
              </NuxtLink>
            </li>
            <li class="h-full flex items-center">
              <NuxtLink to="/product-category/lokta-paper-products" class="hover:opacity-80 transition-opacity py-2.5">
                Lokta Product
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>