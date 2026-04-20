<script lang="ts" setup>
import { useCategoryNavigation } from '~/woonuxt_base/app/composables/useCategoryNavigation';
import { ref, computed, watch } from 'vue';
import type { ProductCategory } from '../types';

const { data } = await useAsyncGql('getProductCategories');

const productCategories = ref((data.value.productCategories?.nodes || []) as ProductCategory[]);
const filteredProductCategories = computed(() => productCategories.value.filter((category) => category.slug !== 'uncategorized'));
const { selectedCategories, selectCategory, goBack, getCurrentCategories, getCurrentCategoryName } = useCategoryNavigation(filteredProductCategories);

function resetNavigation() {
  selectedCategories.value = [];
}
function jumpToLevel(idx: number) {
  selectedCategories.value = selectedCategories.value.slice(0, idx + 1);
}

useHead({
  title: `Categories`,
  meta: [{ name: 'description', content: 'All product categories' }],
  link: [{ rel: 'canonical', href: 'https://www.everestdrishticraft.com/categories' }],
});

// Pagination logic
const page = ref(1);
const perPage = 12;
const paginatedCategories = computed(() => {
  const start = (page.value - 1) * perPage;
  return getCurrentCategories.value.slice(start, start + perPage);
});
const totalPages = computed(() => Math.ceil(getCurrentCategories.value.length / perPage));
function setPage(newPage: number) {
  page.value = newPage;
}
const getCurrentCategoryDescription = computed(() => {
  const last = selectedCategories.value[selectedCategories.value.length - 1];
  return last?.description ?? '';
});
watch(getCurrentCategories, () => {
  page.value = 1;
});
</script>

<template>
  <main class="container pt-10">
    <!-- Breadcrumb Navigation -->
    <nav v-if="selectedCategories.length" class="flex items-center gap-2 text-sm mb-4 mt-2">
      <span class="cursor-pointer text-primary" @click="resetNavigation">Categories</span>
      <template v-for="(cat, idx) in selectedCategories as ProductCategory[]" :key="cat.id">
        <span class="mx-1">/</span>
        <span class="cursor-pointer text-primary" @click="jumpToLevel(idx as number)" :class="{ 'font-bold': idx === selectedCategories.length - 1 }">{{
          cat.name
        }}</span>
      </template>
    </nav>
    <div v-if="selectedCategories.length > 0">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold">{{ getCurrentCategoryName ?? '' }}</h2>
        <button
          @click="goBack"
          class="px-3.5 py-1.5 text-sm bg-white border border-primary hover:bg-primary hover:text-white rounded-md text-primary flex items-center gap-1">
          <Icon name="ic:round-arrow-back" class="size-5 -ml-1.5" /> Back
        </button>
      </div>
      <p class="text-base text-gray-500 mb-7" v-html="getCurrentCategoryDescription"></p>
    </div>
    <div v-else>
      <h2 class="text-2xl font-bold text-gray-900 md:text-3xl mb-4 mt-6 uppercase">ALL CATEGORIES</h2>
      <p class="text-gray-600 mb-7">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
    </div>
    <div v-if="getCurrentCategories.length">
      <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <CategoryCard
          v-for="(category, i) in paginatedCategories"
          :key="category.id || i"
          :node="category"
          :image-loading="i <= 2 ? 'eager' : 'lazy'"
          :disable-link="true"
          @click="
            category.children?.nodes?.length
              ? selectCategory(category)
              : category.slug
                ? $router.push(`/product-category/${decodeURIComponent(String(category.slug))}`)
                : null
          "
          class="cursor-pointer" />
      </div>
      <Pagination v-if="totalPages > 1" :current-page="page" :total-pages="totalPages" @page-changed="setPage" class="mt-8 flex justify-center" />
    </div>
    <div v-else class="text-gray-500">No subcategories found.</div>
  </main>
</template>
