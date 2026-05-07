<script setup lang="ts">
const { setProducts, updateProductList, products } = useProducts();
const route = useRoute();
const { storeSettings } = useAppConfig();
const { isQueryEmpty } = useHelpers();

// 1. Fetch data - using 'first: 100' to ensure we get all 88 products
const { data } = await useAsyncGql('getProducts', { first: 100 });
const allFetchedNodes = (data.value?.products?.nodes as Product[]) || [];
setProducts(allFetchedNodes);

// 2. Load More Logic
const displayLimit = ref(20);

// Use a computed property to slice the ALREADY filtered/sorted products
const productsToShow = computed(() => {
  return products.value.slice(0, displayLimit.value);
});

const hasMore = computed(() => {
  return displayLimit.value < products.value.length;
});

const loadMore = () => {
  displayLimit.value += 20;
};

// 3. Reset limit only when filters or route changes
watch(() => route.query, () => {
  displayLimit.value = 20;
  if (route.name === 'products') updateProductList();
});

onMounted(() => {
  if (!isQueryEmpty.value) updateProductList();
});

useHead({
  title: `Products`,
  meta: [{ name: 'description', content: 'Explore our handmade collection.' }],
});
</script>

<template>
  <!-- 
    Changed: Removed 'flex flex-col items-center' from main div. 
    Home page uses 'section class="container"', so we follow that structure.
  -->
  <main class="overflow-x-hidden bg-white" v-if="allFetchedNodes.length">
    <section class="container mx-auto px-4 pt-12">
      
      <!-- Header Section: Matches the spacing/padding of your Home sections -->
      <div class="mb-12 border-l-2 border-primary pl-6">
        <h1 class="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 leading-none">
          {{ route.query.filter === 'tag[best-selling]' ? 'Best Sellers' : 'Collection' }}
        </h1>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mt-2">
          Handcrafted in Nepal
        </p>
      </div>
      
      <!-- Controls -->
      <div class="flex items-center justify-between w-full gap-4 mb-10 border-b border-gray-100 pb-6">
        <ProductResultCount />
        <div class="flex items-center gap-8">
          <OrderByDropdown class="hidden md:inline-flex" v-if="storeSettings.showOrderByDropdown" />
          <ShowFilterTrigger v-if="storeSettings.showFilters" class="md:hidden" />
        </div>
      </div>

      <!-- 
        LAYOUT FIX: 
        We use the exact grid classes from your home page's ProductRow.
        This forces 2 columns on mobile, preventing images from becoming "too big".
      -->
      <div class="w-full">
        <ProductRow
          :products="productsToShow" 
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8" 
        />
      </div>

      <!-- Load More Section -->
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
            {{ hasMore ? 'Load More' : 'Collection Complete' }}
          </span>
        </button>
        
        <div class="flex flex-col items-center gap-3">
          <div class="flex items-center gap-4">
            <span class="h-px w-8 bg-gray-100"></span>
            <p class="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">
              Showing {{ productsToShow.length }} of {{ products.length }} Artifacts
            </p>
            <span class="h-px w-8 bg-gray-100"></span>
          </div>
          <div class="w-40 h-[1px] bg-gray-100 mt-2 relative">
            <div 
              class="absolute top-0 left-0 h-full bg-primary transition-all duration-1000" 
              :style="{ width: `${(productsToShow.length / products.length) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <NoProductsFound v-else />
</template>

<style scoped>
/* Matching the clean transition style from your home page */
.shrink-enter-active, .shrink-leave-active {
  transition: all 0.3s ease;
}
.shrink-enter-from, .shrink-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>