<template>
  <WpPage slug="about" fallback-title="About Us" fallback-description="Learn more about us" />
</template>

<script setup>
import WpPage from '~/components/generalElements/WpPage.vue';

definePageMeta({
  title: 'About Us',
  description: 'Learn more about us',
});
</script>
