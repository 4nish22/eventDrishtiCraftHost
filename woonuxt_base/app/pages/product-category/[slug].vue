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
  <!-- Force the outer container to strictly clamp its maximum width on mobile -->
  <div class="w-full max-w-full overflow-hidden px-4 sm:px-6 mx-auto flex flex-col items-center" v-if="productsInCategory.length">
    <div class="w-full max-w-full overflow-hidden">
      
      <!-- Header Banner Section -->
      <div class="mb-8 md:mb-12 mt-8 md:mt-16 border-l-2 border-primary pl-4 md:pl-6 max-w-full overflow-hidden">
        <h1 class="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 leading-none break-words">
          {{ category?.name || 'Products' }}
        </h1>
        <p v-if="category?.description" class="mt-3 text-xs sm:text-sm leading-relaxed text-gray-500 font-medium max-w-2xl break-words">
          {{ category.description }}
        </p>
      </div>

      <!-- Grid layout for Subcategories -->
      <div v-if="subcategories.length > 0" class="mb-10 md:mb-12 max-w-full">
        <h2 class="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4 md:mb-6">
          Explore Subcategories
        </h2>
        <!-- Explicitly forced layout boundaries with 'minw-0' and 'overflow-hidden' to lock image growth -->
        <div class="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full distribution-grid">
          <div v-for="(subcategory, i) in subcategories" :key="subcategory.id || i" class="min-w-0 overflow-hidden w-full">
            <CategoryCard
              :node="subcategory"
              :image-loading="i <= 2 ? 'eager' : 'lazy'"
              class="cursor-pointer w-full max-w-full" />
          </div>
        </div>
      </div>

      <!-- Sorting/results controls for mobile -->
      <div class="mt-10 md:mt-16 flex items-center justify-between w-full gap-4 mb-8 border-b border-gray-100 pb-4 md:pb-6">
        <ProductResultCount class="text-sm md:text-base whitespace-nowrap" />
        <div class="flex items-center gap-4 md:gap-8">
          <OrderByDropdown class="hidden md:inline-flex" v-if="storeSettings.showOrderByDropdown" />
          <ShowFilterTrigger v-if="storeSettings.showFilters" class="md:hidden" />
        </div>
      </div>

      <!-- Main Product Grid Component with strict layout containment wrapper -->
      <div class="w-full max-w-full overflow-hidden min-w-0">
        <ProductGrid :products="productsToShow" class="max-w-full" />
      </div>

      <!-- Footer section spacing and button scaling -->
      <div class="mt-16 md:mt-24 mb-20 md:mb-40 flex flex-col items-center gap-8 md:gap-10 w-full max-w-full">
        <button 
          v-if="products.length > 20"
          @click="loadMore"
          :disabled="!hasMore"
          class="group relative w-full sm:w-auto px-10 sm:px-20 py-4 sm:py-5 overflow-hidden transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <div class="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center ease-out"></div>
          <div class="absolute inset-0 border border-primary group-hover:border-transparent transition-colors duration-500"></div>
          <span class="relative z-10 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.5em] transition-colors duration-500 block text-center" 
                :class="hasMore ? 'text-primary group-hover:text-white' : 'text-gray-300'">
            {{ hasMore ? 'Load More' : 'End of Category' }}
          </span>
        </button>
        
        <div class="flex flex-col items-center gap-3 w-full">
          <div class="flex items-center gap-3 md:gap-4 w-full justify-center">
            <span class="h-px flex-1 max-w-[32px] bg-gray-100"></span>
            <p class="text-[8px] sm:text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] sm:tracking-[0.4em] text-center whitespace-nowrap">
              Showing {{ productsToShow.length }} of {{ products.length }} items
            </p>
            <span class="h-px flex-1 max-w-[32px] bg-gray-100"></span>
          </div>
          <div class="w-32 sm:w-40 h-[1px] bg-gray-100 mt-1 sm:mt-2 relative">
            <div 
              class="absolute top-0 left-0 h-full bg-primary transition-all duration-1000" 
              :style="{ width: `${(productsToShow.length / (products.length || 1)) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Empty state fallbacks -->
  <div v-else class="w-full max-w-full overflow-hidden px-4 mx-auto mt-12 md:mt-20">
    <div class="w-full text-center">
      <h1 class="text-3xl md:text-4xl font-black uppercase tracking-tighter text-gray-900 mb-4">
        {{ category?.name || 'Products' }}
      </h1>
      <NoProductsFound>No products found in this category.</NoProductsFound>
    </div>
  </div>
</template>

<style scoped>
/* Inline containment rules that pierce deep components without crashing the parser */
:deep(img),
:deep(picture img),
:deep(.w-full img) {
  width: 100% !important;
  max-width: 100% !important;
  height: 100% !important;
  max-height: 100% !important;
  object-fit: cover !important;
}

/* Fix for standard WooCommerce image wrappers which force fixed pixel heights */
:deep(.woocommerce-loop-product__title), 
:deep(.product-grid),
:deep(.grid) {
  max-width: 100% !important;
}
</style>