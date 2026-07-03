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
  <main class="container mx-auto px-4 sm:px-6 py-8 md:py-12 max-w-7xl" v-if="productsInCategory.length">
    
    <!-- Hero Header Zone -->
    <header class="mb-12 border-l-2 border-primary pl-6 pb-2">
      <div class="max-w-3xl">
        <h1 class="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 leading-none">
          {{ category?.name || 'Products' }}
        </h1>
        <!-- Global Brand Paragraph Styling: Rich text matched to home site typography scales -->
        <p v-if="category?.description" class="mt-4 text-xs sm:text-sm leading-relaxed text-gray-500 font-medium max-w-2xl break-words" v-html="category.description"></p>
        <p v-else class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mt-3">
          Handcrafted in Nepal
        </p>
      </div>
    </header>

    <!-- Subcategories Section -->
    <section v-if="subcategories.length > 0" class="mb-14 md:mb-20">
      <h2 class="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">
        Explore Subcategories
      </h2>
      <div class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <CategoryCard
          v-for="(subcategory, i) in subcategories" 
          :key="subcategory.id || i" 
          :node="subcategory"
          :image-loading="i <= 3 ? 'eager' : 'lazy'"
          class="h-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md rounded-xl overflow-hidden border border-gray-100 cursor-pointer" 
        />
      </div>
    </section>

    <!-- Filter & Filter Context Controls -->
    <section class="flex items-center justify-between gap-4 mb-10 border-b border-gray-100 pb-5">
      <!-- Standardized counter typography -->
      <ProductResultCount class="text-[11px] font-black uppercase tracking-[0.2em] text-gray-600" />
      <div class="flex items-center gap-4">
        <OrderByDropdown class="hidden md:inline-flex" v-if="storeSettings.showOrderByDropdown" />
        <ShowFilterTrigger v-if="storeSettings.showFilters" class="md:hidden" />
      </div>
    </section>

    <!-- Main Dynamic Product Grid Grid -->
    <section class="min-h-[400px]">
      <ProductGrid :products="productsToShow" />
    </section>

    <!-- Progressive Pagination & Status Bars -->
    <footer class="mt-24 mb-40 flex flex-col items-center gap-10">
      
      <!-- Brand Button Style -->
      <button 
        v-if="products.length > 20"
        @click="loadMore"
        :disabled="!hasMore"
        class="group relative w-full sm:w-auto px-20 py-5 overflow-hidden transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <div class="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center ease-out"></div>
        <div class="absolute inset-0 border border-primary group-hover:border-transparent transition-colors duration-500"></div>
        <span 
          class="relative z-10 text-[11px] font-black uppercase tracking-[0.5em] transition-colors duration-500 block text-center" 
          :class="hasMore ? 'text-primary group-hover:text-white' : 'text-gray-300'"
        >
          {{ hasMore ? 'Load More' : 'End of Collection' }}
        </span>
      </button>
      
      <!-- Brand Tracker Label -->
      <div class="flex flex-col items-center gap-3 w-full">
        <div class="flex items-center gap-4 w-full justify-center">
          <span class="h-px w-8 bg-gray-100"></span>
          <p class="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em] text-center whitespace-nowrap">
            Showing {{ productsToShow.length }} of {{ products.length }} items
          </p>
          <span class="h-px w-8 bg-gray-100"></span>
        </div>
        <div class="w-40 h-[1px] bg-gray-100 mt-2 relative rounded-full overflow-hidden">
          <div 
            class="absolute top-0 left-0 h-full bg-primary transition-all duration-1000 ease-out" 
            :style="{ width: `${(productsToShow.length / (products.length || 1)) * 100}%` }"
          ></div>
        </div>
      </div>
    </footer>
  </main>

  <!-- Empty State Fallback -->
  <main v-else class="container mx-auto px-4 py-20 text-center max-w-xl">
    <Icon name="lucide:shopping-bag" class="size-12 text-gray-300 mx-auto mb-5" />
    <h1 class="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 leading-none mb-4">
      {{ category?.name || 'Products' }}
    </h1>
    <!-- Cleaned up inner standard paragraph message -->
    <p class="text-xs sm:text-sm text-gray-500 font-medium tracking-wide mt-2">
      We couldn't find any products in this collection right now.
    </p>
  </main>
</template>