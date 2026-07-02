<script setup lang="ts">
const { FALLBACK_IMG } = useHelpers();
const props = defineProps({
  node: { type: Object, required: true },
  imageLoading: { type: String as PropType<'lazy' | 'eager'>, default: 'lazy' },
  disableLink: { type: Boolean, default: false },
});

const imgWidth = 280;
const imgHeight = Math.round(imgWidth * 1.25);
</script>

<template>
  <NuxtLink
    v-if="!disableLink && node"
    :to="`/product-category/${decodeURIComponent(node.slug)}`"
    class="group relative flex flex-col justify-end overflow-hidden border border-gray-100 bg-white transition-all duration-500"
    @click="$emit('click')"
    style="cursor: pointer">

    <NuxtImg
      :width="imgWidth"
      :height="imgHeight"
      class="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
      :src="node.image?.sourceUrl || FALLBACK_IMG"
      :alt="node.image?.altText || node.name"
      :title="node.image?.title || node.name"
      :loading="imageLoading"
      sizes="(max-width: 480px) 45vw, (max-width: 768px) 33vw, (max-width: 1024px) 220px, 280px"
      placeholder
      placeholder-class="blur-xl" />

    <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

    <div class="relative z-10 p-3 sm:p-5 md:p-6 text-center">
      <h3
        class="text-[11px] sm:text-sm font-black text-white uppercase tracking-[0.08em] sm:tracking-[0.15em] md:text-base leading-tight drop-shadow-sm"
        v-html="node.name"
      />
      <span
        v-if="node.children?.nodes?.length"
        class="hidden sm:block text-[9px] font-bold uppercase tracking-[0.3em] text-white/60 mt-2"
      >
        View Collection
      </span>
    </div>
  </NuxtLink>

  <div
    v-else-if="node"
    class="group relative flex flex-col justify-end overflow-hidden border border-gray-100 bg-white transition-all duration-500"
    @click="$emit('click')"
    style="cursor: pointer">

    <NuxtImg
      :width="imgWidth"
      :height="imgHeight"
      class="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
      :src="node.image?.sourceUrl || FALLBACK_IMG"
      :alt="node.image?.altText || node.name"
      :title="node.image?.title || node.name"
      :loading="imageLoading"
      sizes="(max-width: 480px) 45vw, (max-width: 768px) 33vw, (max-width: 1024px) 220px, 280px"
      placeholder
      placeholder-class="blur-xl" />

    <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

    <div class="relative z-10 p-3 sm:p-5 md:p-6 text-center">
      <h3
        class="text-[11px] sm:text-sm font-black text-white uppercase tracking-[0.08em] sm:tracking-[0.15em] md:text-base leading-tight drop-shadow-sm"
        v-html="node.name"
      />
      <span
        v-if="node.children?.nodes?.length"
        class="hidden sm:block text-[9px] font-bold uppercase tracking-[0.3em] text-white/60 mt-2"
      >
        View Collection
      </span>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.group {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  aspect-ratio: 3 / 4;
}

@media (max-width: 480px) {
  .group {
    aspect-ratio: 1 / 1.15;
  }
}
</style>