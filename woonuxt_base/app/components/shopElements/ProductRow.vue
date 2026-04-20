<script setup>
const props = defineProps({
  products: { type: Array, default: null },
  hideLastProducts: { type: Boolean, default: false },
});
</script>

<template>
  <div v-if="products" class="grid gap-4 md:gap-8">
    <ProductCard
      v-for="(node, i) in products"
      :key="node.databaseId"
      class="w-full"
      :node="node"
      :index="i"
      :class="{
        hidden: hideLastProducts && i === products.length - 1,
        'lg:block': hideLastProducts && i === products.length - 1,
        'md:hidden': hideLastProducts && i === products.length - 2,
        'lg:!block': hideLastProducts && i === products.length - 2,
      }" />
  </div>
</template>
