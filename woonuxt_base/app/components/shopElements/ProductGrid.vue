<script setup lang="ts">
const route = useRoute();

const props = defineProps<{
  products: any[];
}>();
</script>

<template>
  <Transition name="fade" mode="out-in">
    <section v-if="props.products.length" class="relative w-full">
      <TransitionGroup
        name="shrink"
        tag="div"
        mode="in-out"
        class="product-grid"
      >
        <ProductCard
          v-for="(node, i) in props.products"
          :key="node.id || i"
          :node="node"
          :index="i"
        />
      </TransitionGroup>
    </section>

    <NoProductsFound v-else />
  </Transition>
</template>

<style lang="postcss" scoped>
.product-grid {
  @apply my-4 grid gap-3 sm:gap-4 md:gap-6 lg:gap-8 transition-all lg:my-8;

  /* Mobile */
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.product-grid:empty {
  display: none;
}

/* Tablet */
@media (min-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Small laptop */
@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

/* Large Desktop */
@media (min-width: 1280px) {
  .product-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

/* Animations */
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