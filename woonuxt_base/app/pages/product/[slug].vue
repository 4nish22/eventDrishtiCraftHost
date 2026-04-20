<script lang="ts" setup>
import { StockStatusEnum, ProductTypesEnum, type AddToCartInput } from '#woo';
import GetQuoteButton from '~/woonuxt_base/app/components/productElements/GetQuoteButton.vue';

const route = useRoute();
const { storeSettings } = useAppConfig();
const { arraysEqual, formatArray, checkForVariationTypeOfAny } = useHelpers();
const { addToCart, isUpdatingCart } = useCart();
const { t } = useI18n();
const slug = route.params.slug as string;

const { data } = await useAsyncGql('getProduct', { slug });
if (!data.value?.product) {
  throw showError({ statusCode: 404, statusMessage: t('messages.shop.productNotFound') });
}

const product = ref<Product>(data?.value?.product);
const quantity = ref<number>(1);
const activeVariation = ref<Variation | null>(null);
const variation = ref<VariationAttribute[]>([]);
const indexOfTypeAny = computed<number[]>(() => checkForVariationTypeOfAny(product.value));
const attrValues = ref();
const isSimpleProduct = computed<boolean>(() => product.value?.type === ProductTypesEnum.SIMPLE);
const isVariableProduct = computed<boolean>(() => product.value?.type === ProductTypesEnum.VARIABLE);
const isExternalProduct = computed<boolean>(() => product.value?.type === ProductTypesEnum.EXTERNAL);

const type = computed(() => activeVariation.value || product.value);
const selectProductInput = computed<any>(() => ({ productId: type.value?.databaseId, quantity: quantity.value })) as ComputedRef<AddToCartInput>;

const mergeLiveStockStatus = (payload: Product): void => {
  product.value.stockStatus = payload.stockStatus ?? product.value?.stockStatus;

  payload.variations?.nodes?.forEach((variation: Variation, index: number) => {
    if (product.value?.variations?.nodes[index]) {
      product.value.variations.nodes[index].stockStatus = variation.stockStatus;
    }
  });
};

onMounted(async () => {
  try {
    const { product } = await GqlGetStockStatus({ slug });
    if (product) mergeLiveStockStatus(product as Product);
  } catch (error: any) {
    const errorMessage = error?.gqlErrors?.[0].message;
    if (errorMessage) console.error(errorMessage);
  }
});

const updateSelectedVariations = (variations: VariationAttribute[]): void => {
  if (!product.value.variations) return;

  attrValues.value = variations.map((el) => ({ attributeName: el.name, attributeValue: el.value }));
  const clonedVariations = JSON.parse(JSON.stringify(variations));
  const getActiveVariation = product.value.variations?.nodes.filter((variation: any) => {
    // If there is any variation of type ANY set the value to ''
    if (variation.attributes) {
      // Set the value of the variation of type ANY to ''
      indexOfTypeAny.value.forEach((index) => (clonedVariations[index].value = ''));

      return arraysEqual(formatArray(variation.attributes.nodes), formatArray(clonedVariations));
    }
  });

  // Set variation to the selected variation if it exists
  activeVariation.value = getActiveVariation?.[0] || null;

  selectProductInput.value.variationId = activeVariation.value?.databaseId ?? null;
  selectProductInput.value.variation = activeVariation.value ? attrValues.value : null;
  variation.value = variations;
};

const stockStatus = computed(() => {
  if (isVariableProduct.value) {
    return activeVariation.value?.stockStatus || StockStatusEnum.OUT_OF_STOCK;
  }
  return type.value?.stockStatus || StockStatusEnum.OUT_OF_STOCK;
});

const disabledAddToCart = computed(() => {
  const isOutOfStock = stockStatus.value === StockStatusEnum.OUT_OF_STOCK;
  const isInvalidType = !type.value;
  const isCartUpdating = isUpdatingCart.value;
  const isValidActiveVariation = isVariableProduct.value ? !!activeVariation.value : true;
  return isInvalidType || isOutOfStock || isCartUpdating || !isValidActiveVariation;
});
</script>

<template>
  <main class="container relative py-12 lg:py-20 bg-[#fafafa]">
    <div v-if="product" class="max-w-[1400px] mx-auto">
      <SEOHead :info="product" />
      
      <Breadcrumb 
        v-if="storeSettings.showBreadcrumbOnSingleProduct" 
        :product 
        class="mb-10 px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400" 
      />

      <div class="bg-white p-6 md:p-12 lg:p-16 border border-gray-100 rounded-[2rem] shadow-sm mb-20">
        <div class="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          
          <div class="lg:w-[50%] xl:w-[55%]">
            <ProductImageGallery
              v-if="product.image"
              class="relative rounded-2xl overflow-hidden"
              :main-image="product.image"
              :gallery="product.galleryImages!"
              :node="type"
              :activeVariation="activeVariation || {}" />
            <NuxtImg v-else class="w-full aspect-[4/5] object-cover rounded-2xl skeleton" src="/images/placeholder.jpg" :alt="product?.name || 'Product'" />
          </div>

          <div class="lg:w-[45%] xl:w-[40%] flex flex-col">
            
            <div v-if="product.productCategories?.nodes?.length" class="mb-6 flex flex-wrap gap-2">
              <NuxtLink
                v-for="category in product.productCategories.nodes"
                :key="category.databaseId"
                :to="`/product-category/${decodeURIComponent(category?.slug || '')}`"
                class="bg-primary text-white px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] rounded-sm shadow-sm hover:opacity-90 transition-opacity"
              >
                {{ category.name }}
              </NuxtLink>
            </div>

            <div class="flex justify-between items-start gap-4 mb-6">
              <div class="flex-1">
                <h1 class="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter leading-[0.9] mb-4">
                  {{ type.name }}
                  <LazyWPAdminLink :link="`/wp-admin/post.php?post=${product.databaseId}&action=edit`" class="text-[10px] lowercase font-normal text-primary ml-2 underline">Edit</LazyWPAdminLink>
                </h1>
                
                <div v-if="storeSettings.showSKU && product.sku" class="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  {{ $t('messages.shop.sku') }}: <span class="text-gray-900">{{ product.sku }}</span>
                </div>
              </div>
              <ProductPrice class="text-2xl font-black text-gray-900" :sale-price="type.salePrice" :regular-price="type.regularPrice" />
            </div>

            <div class="h-px w-full bg-gray-100 my-8"></div>

            <div class="mb-10 font-medium text-gray-500 leading-relaxed prose prose-sm max-w-none" v-html="product.shortDescription || product.description" />

            <form @submit.prevent="addToCart(selectProductInput)" class="space-y-8">
              <AttributeSelections
                v-if="isVariableProduct && product.attributes && product.variations"
                class="attribute-selections-modern"
                :attributes="product.attributes.nodes"
                :defaultAttributes="product.defaultAttributes"
                :variations="product.variations.nodes"
                @attrs-changed="updateSelectedVariations" />

              <div class="flex flex-col gap-4">
                <GetQuoteButton :productName="product.name" :productSKU="product.sku" class="w-full !py-4" />
                
                <a
                  v-if="isExternalProduct && product.externalUrl"
                  :href="product.externalUrl"
                  target="_blank"
                  class="w-full bg-gray-900 text-white py-4 rounded-lg text-[11px] font-black uppercase tracking-widest text-center hover:bg-primary transition-all shadow-lg"
                >
                  {{ product?.buttonText || 'View product' }}
                </a>
              </div>
            </form>

            <div class="flex items-center gap-6 mt-12 pt-8 border-t border-gray-50">
              <WishlistButton :product class="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-primary flex items-center gap-2 transition-colors" />
              <ShareButton :product class="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-primary flex items-center gap-2 transition-colors" />
            </div>
          </div>
        </div>

        <div v-if="product.description || product.reviews" class="mt-24 lg:mt-32">
          <div class="h-px w-full bg-gray-100 mb-16"></div>
          <ProductTabs :product class="modern-tabs" />
        </div>
      </div>

      <div class="my-32 px-4" v-if="product.related && storeSettings.showRelatedProducts">
        <div class="flex items-end justify-between mb-10">
           <div>
              <h2 class="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">curated for you</h2>
              <h3 class="text-2xl md:text-3xl font-black text-gray-900 tracking-tight uppercase">{{ $t('messages.shop.youMayLike') }}</h3>
           </div>
        </div>
        <LazyProductRow :products="product.related.nodes" class="grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8" :hide-last-products="false" />
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Scoped Typography & Spacing */
.prose :deep(p) {
  margin-bottom: 1.25rem;
}

/* Modern Tab Styling Overrides */
:deep(.modern-tabs .tabs-nav) {
  @apply flex gap-10 border-none justify-start mb-10;
}

:deep(.modern-tabs .tab-trigger) {
  @apply text-[11px] font-black uppercase tracking-[0.2em] text-gray-300 border-none pb-4 relative transition-all;
}

:deep(.modern-tabs .tab-trigger.active) {
  @apply text-gray-900;
}

:deep(.modern-tabs .tab-trigger.active::after) {
  content: '';
  @apply absolute bottom-0 left-0 w-8 h-1 bg-primary;
}

input[type='number']::-webkit-inner-spin-button {
  opacity: 1;
}
</style>
