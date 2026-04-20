<script setup lang="ts">
const route = useRoute();

const props = defineProps<{
  products: any[]
}>();

// We removed productsPerPage and the computed productsToShow slice
// because the parent is already handling the "Load More" slicing logic.
</script>

<template>
  <Transition name="fade" mode="out-in">
    <section v-if="props.products.length" class="relative w-full">
      <TransitionGroup name="shrink" tag="div" mode="in-out" class="product-grid">
        <ProductCard v-for="(node, i) in props.products" :key="node.id || i" :node :index="i" />
      </TransitionGroup>
      
      </section>
    <NoProductsFound v-else />
  </Transition>
</template>

<style lang="postcss" scoped>
.product-grid {
  @apply my-4 grid transition-all gap-4 md:gap-8 lg:my-8;
  grid-template-columns: repeat(2, 1fr);
}

.product-grid:empty {
  display: none;
}

@media (min-width: 768px) {
  .product-grid {
    /* minmax(210px, 1fr) will naturally give you about 5 columns on large screens */
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  }
}

/* Animations kept exactly as they were */
.shrink-move {
  transition: all 400ms;
}

.shrink-leave-active {
  transition: transform 300ms;
  position: absolute;
  opacity: 0;
}

.shrink-enter-active {
  transition:
    opacity 400ms ease-out 200ms,
    transform 400ms ease-out;
  will-change: opacity, transform;
}

.shrink-enter,
.shrink-leave-to,
.shrink-enter-from {
  opacity: 0;
  transform: scale(0.75) translateY(25%);
}
</style>