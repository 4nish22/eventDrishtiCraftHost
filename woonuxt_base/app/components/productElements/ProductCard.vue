<script setup lang="ts">
const route = useRoute();
const { storeSettings } = useAppConfig();

const props = defineProps({
  node: { type: Object as PropType<Product>, required: true },
  index: { type: Number, default: 1 },
});

const filterQuery = ref(route.query?.filter as string);

const paColor = ref(
  filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || [],
);

watch(
  () => route.query,
  () => {
    filterQuery.value = route.query.filter as string;
    paColor.value =
      filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || [];
  },
);

const primaryCategory = computed(
  () => props.node?.productCategories?.nodes?.[0]?.name || null,
);

const mainImage = computed<string>(
  () =>
    props.node?.image?.producCardSourceUrl ||
    props.node?.image?.sourceUrl ||
    '/images/placeholder.jpg',
);

const imagetoDisplay = computed<string>(() => {
  if (paColor.value.length) {
    const activeColorImage = props.node?.variations?.nodes.filter(
      (variation) => {
        const hasMatchingAttributes = variation.attributes?.nodes.some(
          (attribute) =>
            paColor.value.some((color) =>
              attribute?.value?.includes(color),
            ),
        );

        const hasMatchingSlug = paColor.value.some((color) =>
          variation.slug?.includes(color),
        );

        return hasMatchingAttributes || hasMatchingSlug;
      },
    );

    if (activeColorImage?.length) {
      return (
        activeColorImage[0]?.image?.producCardSourceUrl ||
        activeColorImage[0]?.image?.sourceUrl ||
        mainImage.value
      );
    }
  }

  return mainImage.value;
});
</script>

<template>
  <div class="relative group h-full">
    <div
      class="relative flex flex-col h-full overflow-hidden bg-white border border-gray-100 rounded-xl transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50"
    >
      <NuxtLink
        v-if="node.slug"
        :to="`/product/${decodeURIComponent(node.slug)}`"
        :title="node.name"
        class="relative block w-full overflow-hidden aspect-[3/4] sm:aspect-[4/5]"
      >
        <div class="absolute top-3 left-3 z-20 flex flex-col gap-2">
          <SaleBadge :node class="shadow-sm" />

          <span
            v-if="primaryCategory"
            class="w-fit rounded-sm bg-primary px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-white shadow-md transition-transform duration-300 group-hover:scale-105"
          >
            {{ primaryCategory }}
          </span>
        </div>

        <NuxtImg
          v-if="imagetoDisplay"
          :src="imagetoDisplay"
          :alt="node.name"
          :loading="index <= 3 ? 'eager' : 'lazy'"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
          class="block h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          placeholder
          placeholder-class="blur-xl"
        />

        <div
          class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/40 p-6 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100"
        >
          <span
            class="mb-2 translate-y-4 transform text-[9px] font-bold uppercase tracking-[0.4em] text-primary transition-transform duration-500 group-hover:translate-y-0"
          >
            Everest Craft
          </span>

          <h3
            class="mb-6 translate-y-4 transform text-center text-xs font-black uppercase leading-tight tracking-widest text-gray-900 transition-transform duration-500 delay-75 group-hover:translate-y-0"
          >
            {{ node.name }}
          </h3>

          <div
            class="translate-y-4 transform transition-transform duration-500 delay-100 group-hover:translate-y-0"
          >
            <span
              class="border-b-2 border-primary pb-1 text-[10px] font-black uppercase text-gray-900"
            >
              View Details
            </span>
          </div>
        </div>
      </NuxtLink>

      <div class="flex flex-col items-center p-3 sm:p-4 text-center">
        <h2
          class="mb-1 w-full truncate text-[12px] sm:text-[13px] font-bold uppercase tracking-tight text-gray-800 transition-colors duration-300 group-hover:text-primary"
        >
          {{ node.name }}
        </h2>

        <ProductPrice
          class="text-[11px] sm:text-[12px] font-bold text-gray-500"
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