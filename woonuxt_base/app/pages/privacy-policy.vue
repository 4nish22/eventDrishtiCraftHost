<template>
  <WpPage slug="privacy-policy" fallback-title="Privacy Policy" fallback-description="Privacy policy" :show-featured="false" :show-meta="false" />
</template>

<script setup>
import WpPage from '~/components/generalElements/WpPage.vue';

definePageMeta({
  title: 'Privacy Policy',
});
</script>
