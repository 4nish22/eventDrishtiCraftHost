<script lang="ts" setup>
import { ProductsOrderByEnum } from '#woo';
import { useCategoryNavigation } from '~/woonuxt_base/app/composables/useCategoryNavigation';
import { ref } from 'vue';

const { siteName, description, shortDescription, siteImage } = useAppConfig();

const { data } = await useAsyncGql('getProductCategories', { first: 30 });
const productCategories = ref((data.value?.productCategories?.nodes || []).filter((category) => category.slug !== 'uncategorized'));

const categoryNavigation = useCategoryNavigation(productCategories as any);
const { selectedCategories, selectCategory, goBack, getCurrentCategories, getCurrentCategoryName } = categoryNavigation;

function resetNavigation() {
  selectedCategories.value = [];
}
function jumpToLevel(idx: number) {
  selectedCategories.value = selectedCategories.value.slice(0, idx + 1);
}

const { data: productData } = await useAsyncGql('getProducts', { first: 20, orderby: ProductsOrderByEnum.POPULARITY });
const popularProducts = productData.value.products?.nodes || [];

const { data: hotProductsData } = await useAsyncGql('getHotProducts' as any, { first: 10 });
const hotProducts = hotProductsData.value?.products?.nodes || [];

const { data: highlightProductsData } = await useAsyncGql('getHighlightProducts' as any, { first: 10 });
const highlightProducts = highlightProductsData.value?.products?.nodes || [];

useSeoMeta({
  title: `Home`,
  ogTitle: siteName,
  description: description,
  ogDescription: shortDescription,
  ogImage: siteImage,
  twitterCard: `summary_large_image`,
});
</script>

<template>
  <main class="overflow-x-hidden bg-white">
    <HeroBanner />
    <OurStories />

    <section class="container pt-16 lg:pt-24">
      <div class="flex items-end justify-between  pl-6 mb-10">
        <div>
          <h2 class="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">
            {{ $t('messages.shop.shopByCategory') }}
          </h2>
          <h3 class="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight uppercase">
            Collections
          </h3>
        </div>
        <NuxtLink
          class="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors border-b border-gray-200"
          to="/categories">
          {{ $t('messages.general.viewAll') }}
        </NuxtLink>
      </div>

      <div class="bg-gray-100/60 p-6 md:p-10 relative border-t border-gray-100">
        <nav v-if="selectedCategories.length"
          class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-gray-400">
          <span class="cursor-pointer hover:text-primary transition-colors" @click="resetNavigation">Categories</span>
          <template v-for="(cat, idx) in selectedCategories" :key="cat.id">
            <span class="opacity-30">/</span>
            <span class="cursor-pointer text-primary" @click="jumpToLevel(idx)"
              :class="{ 'font-black': idx === selectedCategories.length - 1 }">{{
                cat.name
              }}</span>
          </template>
        </nav>

        <button v-if="selectedCategories.length > 0" @click="goBack"
          class="absolute top-8 right-8 text-[10px] font-black uppercase tracking-widest border border-primary px-4 py-2 text-primary hover:bg-primary hover:text-white transition-all flex items-center gap-1">
          <Icon name="ic:round-arrow-back" class="size-4" /> Back
        </button>

        <h2 v-if="selectedCategories.length > 0" class="text-lg font-bold mb-6 text-gray-900 uppercase tracking-tight">
          {{
            getCurrentCategoryName }}</h2>

        <div v-if="getCurrentCategories.length">
          <div>
            <TransitionGroup name="shrink" tag="div" mode="in-out"
              class="grid justify-center grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              <CategoryCard v-for="(category, i) in getCurrentCategories" :key="category.id || i" :node="category"
                :image-loading="i <= 2 ? 'eager' : 'lazy'" :disable-link="true" @click="
                  category.children?.nodes?.length
                    ? selectCategory(category)
                    : category.slug
                      ? $router.push(`/product-category/${decodeURIComponent(String(category.slug))}`)
                      : null
                  " class="w-full cursor-pointer hover:bg-white hover:shadow-xl transition-all duration-300" />
            </TransitionGroup>
          </div>
        </div>
        <div v-else class="text-gray-400 text-sm font-light py-12 text-center">No subcategories found.</div>
      </div>
    </section>

    <section class="container pt-20 pb-20" v-if="highlightProducts && highlightProducts.length">
      <div class="flex items-end justify-between  pl-6 mb-10">
        <div>
          <h2 class="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Our Special</h2>
          <h3 class="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight uppercase">Highlighted Products</h3>
        </div>
        <NuxtLink
          class="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors border-b border-gray-200"
          to="/products?filter=tag[highlight]">
          {{ $t('messages.general.viewAll') }}
        </NuxtLink>
      </div>
      <ProductRow :products="highlightProducts" class="grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        :hide-last-products="true" />
    </section>

    <section class="container pt-20" v-if="popularProducts">
      <div class="flex items-end justify-between pl-6 mb-10">
        <div>
          <h2 class="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">New Arrivals</h2>
          <h3 class="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight uppercase">Latest Collection</h3>
        </div>
        <NuxtLink
          class="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors border-b border-gray-200"
          to="/products">
          {{ $t('messages.general.viewAll') }}
        </NuxtLink>
      </div>
      <ProductRow :products="popularProducts" class="grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        :hide-last-products="true" />
    </section>

    <section class="container pt-20 pb-20" v-if="hotProducts && hotProducts.length">
      <div class="flex items-end justify-between  pl-6 mb-10">
        <div>
          <h2 class="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Best Selling</h2>
          <h3 class="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight uppercase">Most Loved</h3>
        </div>
        <NuxtLink
          class="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors border-b border-gray-200"
          to="/products?filter=tag[best-selling]">
          {{ $t('messages.general.viewAll') }}
        </NuxtLink>
      </div>
      <ProductRow :products="hotProducts" class="grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        :hide-last-products="true" />
    </section>


    <Benefits />

    <Gallery />

    <ExportCountries />
  </main>
</template>

<style scoped>
.brand img {
  max-height: min(8vw, 120px);
  object-fit: contain;
  object-position: center;
}

.shrink-move {
  transition: all 400ms;
}

.shrink-leave-active {
  transition: transform 150ms;
  position: absolute;
  opacity: 0;
}

.shrink-enter-active {
  transition:
    opacity 200ms ease-out 100ms,
    transform 200ms ease-out;
  will-change: opacity, transform;
}

.shrink-enter,
.shrink-leave-to,
.shrink-enter-from {
  opacity: 0;
  transform: scale(0.98);
  /* Less scaling for a sharper transition */
}
</style>