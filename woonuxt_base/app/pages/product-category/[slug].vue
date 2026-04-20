<script setup lang="ts">
import type { Product } from '~/woonuxt_base/app/types';

const { setProducts, updateProductList } = useProducts();
const { isQueryEmpty } = useHelpers();
const { storeSettings } = useAppConfig();
const route = useRoute();
const slug = route.params.slug as string;

// Fetch products in the category
const { data: productsData } = await useAsyncGql('getProducts', { slug });
const productsInCategory = (productsData.value?.products?.nodes || []) as Product[];
setProducts(productsInCategory);

// Fetch category information
const { data: categoryData } = await useAsyncGql('getProductCategory', { slug });
const category = categoryData.value?.productCategory;

// Get subcategories from the category data
const subcategories = computed(() => category?.children?.nodes || []);

onMounted(() => {
  if (!isQueryEmpty.value) updateProductList();
});

watch(
  () => route.query,
  () => {
    if (route.name !== 'product-category-slug') return;
    updateProductList();
  },
);

useHead({
  title: category?.name || 'Products',
  meta: [{ name: 'description', content: category?.description || 'Products' }],
});
</script>

<template>
  <div class="container flex items-start gap-16" v-if="productsInCategory.length">
    <!-- <Filters v-if="storeSettings.showFilters" :hide-categories="true" /> -->

    <div class="w-full">
      <!-- Category Heading -->
      <div class="mb-8 mt-16">
        <h1 class="text-2xl font-bold text-gray-900 md:text-3xl mb-4 uppercase">
          {{ category?.name || 'Products' }}
        </h1>
        <p v-if="category?.description" class="mt-2 text-gray-600">
          {{ category.description }}
        </p>
      </div>

      <!-- Subcategories Section -->
      <div v-if="subcategories.length > 0" class="mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Subcategories</h2>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <CategoryCard
            v-for="(subcategory, i) in subcategories"
            :key="subcategory.id || i"
            :node="subcategory"
            :image-loading="i <= 2 ? 'eager' : 'lazy'"
            :disable-link="false"
            class="cursor-pointer" />
        </div>
      </div>
      <div class="mt-16">
        <h2 class="text-xl font-semibold text-gray-900">Products</h2>
        <div class="flex items-center justify-between w-full gap-4 md:gap-8">
          <ProductResultCount />
          <OrderByDropdown class="hidden md:inline-flex" v-if="storeSettings.showOrderByDropdown" />
          <ShowFilterTrigger v-if="storeSettings.showFilters" class="md:hidden" />
        </div>
        <ProductGrid />
      </div>
    </div>
  </div>

  <!-- No products found -->
  <div v-else class="container mt-8">
    <div class="w-full">
      <!-- Category Heading -->
      <div class="mb-8">
        <h1 class="text-xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
          {{ category?.name || 'Products' }}
        </h1>
        <p v-if="category?.description" class="mt-2 text-gray-600">
          {{ category.description }}
        </p>
      </div>

      <!-- Subcategories Section -->
      <div v-if="subcategories.length > 0" class="mb-8">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Subcategories</h2>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <CategoryCard
            v-for="(subcategory, i) in subcategories"
            :key="subcategory.id || i"
            :node="subcategory"
            :image-loading="i <= 2 ? 'eager' : 'lazy'"
            :disable-link="false"
            class="cursor-pointer" />
        </div>
      </div>

      <NoProductsFound>No products found in this category.</NoProductsFound>
    </div>
  </div>
</template>
