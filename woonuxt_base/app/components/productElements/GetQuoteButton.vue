<script setup lang="ts">
import { whatsappNumber } from '../../constants';

const props = defineProps<{
  productName: string;
  productSKU?: string; // make SKU optional
}>();

const whatsappUrl = computed(() => {
  const baseText = `Hello, I would like to enquire about this product: ${props.productName}`;
  const skuText = props.productSKU ? ` (${props.productSKU})` : '';
  const message = encodeURIComponent(baseText + skuText + '.');
  return `https://wa.me/${whatsappNumber}?text=${message}`;
});
</script>

<template>
  <div class="flex mt-7">
    <NuxtLink
      target="_blank"
      class="flex px-5 py-3 text-lg text-center text-white bg-green-500 rounded-lg shadow-md justify-evenly items-center hover:bg-green-600"
      :to="whatsappUrl">
      <Icon name="mdi:whatsapp" size="24" class="ml-1" />
      <span class="mx-2 font-medium">Get a Quote</span>
    </NuxtLink>
  </div>
</template>
