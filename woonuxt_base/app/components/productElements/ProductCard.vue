<script setup lang="ts">
const route = useRoute();
const { storeSettings } = useAppConfig();
const props = defineProps({
  node: { type: Object as PropType<Product>, required: true },
  index: { type: Number, default: 1 },
});

const imgWidth = 280;
const imgHeight = Math.round(imgWidth * 1.125);

const filterQuery = ref(route.query?.filter as string);
const paColor = ref(filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || []);

watch(
  () => route.query,
  () => {
    filterQuery.value = route.query.filter as string;
    paColor.value = filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || [];
  },
);

const primaryCategory = computed(() => props.node?.productCategories?.nodes?.[0]?.name || null);

const mainImage = computed<string>(() => props.node?.image?.producCardSourceUrl || props.node?.image?.sourceUrl || '/images/placeholder.jpg');
const imagetoDisplay = computed<string>(() => {
  if (paColor.value.length) {
    const activeColorImage = props.node?.variations?.nodes.filter((variation) => {
      const hasMatchingAttributes = variation.attributes?.nodes.some((attribute) => paColor.value.some((color) => attribute?.value?.includes(color)));
      const hasMatchingSlug = paColor.value.some((color) => variation.slug?.includes(color));
      return hasMatchingAttributes || hasMatchingSlug;
    });
    if (activeColorImage?.length) return activeColorImage[0]?.image?.producCardSourceUrl || activeColorImage[0]?.image?.sourceUrl || mainImage.value;
  }
  return mainImage.value;
});
</script>

<template>
  <div class="relative group h-full">
    <div class="relative flex flex-col h-full bg-white transition-all duration-500 overflow-hidden border border-gray-100 rounded-xl hover:shadow-2xl hover:shadow-gray-200/50">
      
      <NuxtLink 
        v-if="node.slug" 
        :to="`/product/${decodeURIComponent(node.slug)}`" 
        class="relative block overflow-hidden aspect-[4/5]" 
        :title="node.name"
      >
        <div class="absolute top-3 left-3 z-20 flex flex-col gap-2">
          <SaleBadge :node class="shadow-sm" /> 
          
          <span v-if="primaryCategory" 
            class="w-fit bg-primary text-white px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em] rounded-sm shadow-md transition-transform duration-300 group-hover:scale-105">
            {{ primaryCategory }}
          </span>
        </div>
        
        <NuxtImg
          v-if="imagetoDisplay"
          :width="imgWidth"
          :height="imgHeight"
          :src="imagetoDisplay"
          :alt="node.name"
          :loading="index <= 3 ? 'eager' : 'lazy'"
          class="object-cover w-full h-full transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          placeholder
          placeholder-class="blur-xl" />

        <div class="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 backdrop-blur-md bg-white/40">
           <span class="text-[9px] font-bold uppercase tracking-[0.4em] text-primary mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
             Everest Craft
           </span>
           <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest leading-tight text-center mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
             {{ node.name }}
           </h3>
           <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
             <span class="text-[10px] font-black uppercase border-b-2 border-primary pb-1 text-gray-900">View Details</span>
           </div>
        </div>
      </NuxtLink>

      <div class="p-4 flex flex-col items-center text-center">
        <h2 class="text-[13px] font-bold text-gray-800 uppercase tracking-tight truncate w-full mb-1 group-hover:text-primary transition-colors duration-300">
          {{ node.name }}
        </h2>
        <ProductPrice 
          class="text-[12px] font-bold text-gray-500" 
          :sale-price="node.salePrice" 
          :regular-price="node.regularPrice" 
        />
      </div>

    </div>
  </div>
</template>

<style scoped>
.backdrop-blur-md {
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}
</style>