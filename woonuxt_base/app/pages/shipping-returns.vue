<template>
  <WpPage
    slug="shipping-returns"
    fallback-title="Shipping & Returns"
    fallback-description="Shipping and returns information"
    :show-featured="false"
    :show-meta="false" />
</template>

<script setup>
import WpPage from '~/components/generalElements/WpPage.vue';

definePageMeta({
  title: 'Shipping & Returns',
});
</script>
