<script setup lang="ts">
import type { Product } from '~/woonuxt_base/app/types';

// 1. Setup Composables
const { setProducts, updateProductList, products } = useProducts();
const { isQueryEmpty } = useHelpers();
const { storeSettings } = useAppConfig();
const route = useRoute();
const slug = route.params.slug as string;

// 2. Fetch Category Specific Data (Fetching 100 to support local Load More)
const { data: productsData } = await useAsyncGql('getProducts', { slug, first: 100 });
const productsInCategory = (productsData.value?.products?.nodes || []) as Product[];

// Set the global products state so filters/sorting work on this specific set
setProducts(productsInCategory);

// Fetch category information
const { data: categoryData } = await useAsyncGql('getProductCategory', { slug });
const category = categoryData.value?.productCategory;
const subcategories = computed(() => category?.children?.nodes || []);

// 3. Load More Logic
const displayLimit = ref(20);

// Use a computed property to slice the ALREADY filtered/sorted products from the store
const productsToShow = computed(() => {
  return products.value.slice(0, displayLimit.value);
});

const hasMore = computed(() => {
  return displayLimit.value < products.value.length;
});

const loadMore = () => {
  displayLimit.value += 20;
};

// 4. Lifecycle & Watchers
onMounted(() => {
  if (!isQueryEmpty.value) updateProductList();
});

watch(() => route.query, () => {
  displayLimit.value = 20; // Reset pagination on filter change
  if (route.name === 'product-category-slug') updateProductList();
});

useHead({
  title: category?.name || 'Products',
  meta: [{ name: 'description', content: category?.description || 'Products' }],
});
</script>

<template>
  <div class="container flex flex-col items-center" v-if="productsInCategory.length">
    <div class="w-full">
      <div class="mb-12 mt-16 border-l-2 border-primary pl-6">
        <h1 class="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 leading-none">
          {{ category?.name || 'Products' }}
        </h1>
        <p v-if="category?.description" class="mt-4  text-sm leading-relaxed text-gray-500 font-medium">
  {{ category.description }}
</p>
      </div>

      <div v-if="subcategories.length > 0" class="mb-12">
        <h2 class="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Explore Subcategories</h2>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <CategoryCard
            v-for="(subcategory, i) in subcategories"
            :key="subcategory.id || i"
            :node="subcategory"
            :image-loading="i <= 2 ? 'eager' : 'lazy'"
            class="cursor-pointer" />
        </div>
      </div>

      <div class="mt-16 flex items-center justify-between w-full gap-4 mb-10 border-b border-gray-100 pb-6">
        <ProductResultCount />
        <div class="flex items-center gap-8">
          <OrderByDropdown class="hidden md:inline-flex" v-if="storeSettings.showOrderByDropdown" />
          <ShowFilterTrigger v-if="storeSettings.showFilters" class="md:hidden" />
        </div>
      </div>

      <ProductGrid :products="productsToShow" />

      <div class="mt-24 mb-40 flex flex-col items-center gap-10">
        <button 
          v-if="products.length > 20"
          @click="loadMore"
          :disabled="!hasMore"
          class="group relative px-20 py-5 overflow-hidden transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <div class="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center ease-out"></div>
          <div class="absolute inset-0 border border-primary group-hover:border-transparent transition-colors duration-500"></div>
          <span class="relative z-10 text-[11px] font-black uppercase tracking-[0.5em] transition-colors duration-500" 
                :class="hasMore ? 'text-primary group-hover:text-white' : 'text-gray-300'">
            {{ hasMore ? 'Load More' : 'End of Category' }}
          </span>
        </button>
        
        <div class="flex flex-col items-center gap-3">
          <div class="flex items-center gap-4">
            <span class="h-px w-8 bg-gray-100"></span>
            <p class="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">
              Showing {{ productsToShow.length }} of {{ products.length }} items
            </p>
            <span class="h-px w-8 bg-gray-100"></span>
          </div>
          <div class="w-40 h-[1px] bg-gray-100 mt-2 relative">
            <div 
              class="absolute top-0 left-0 h-full bg-primary transition-all duration-1000" 
              :style="{ width: `${(productsToShow.length / (products.length || 1)) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container mt-20">
    <div class="w-full text-center">
      <h1 class="text-4xl font-black uppercase tracking-tighter text-gray-900 mb-4">
        {{ category?.name || 'Products' }}
      </h1>
      <NoProductsFound>No products found in this category.</NoProductsFound>
    </div>
  </div>
</template>