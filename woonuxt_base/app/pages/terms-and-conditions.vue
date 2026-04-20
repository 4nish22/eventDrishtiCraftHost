<template>
  <WpPage
    slug="terms-and-conditions"
    fallback-title="Terms & Conditions"
    fallback-description="Terms and conditions"
    :show-featured="false"
    :show-meta="false" />
</template>

<script setup>
import WpPage from '~/components/generalElements/WpPage.vue';

definePageMeta({
  title: 'Terms & Conditions',
});
</script>
