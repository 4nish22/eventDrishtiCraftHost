<template>
  <WpPage slug="faq" fallback-title="FAQ" fallback-description="Frequently Asked Questions" :show-featured="false" :show-meta="false" />
</template>

<script setup>
import WpPage from '~/components/generalElements/WpPage.vue';

definePageMeta({
  title: 'FAQ',
});
</script>
