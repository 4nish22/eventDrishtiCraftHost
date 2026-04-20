<template>
  <WpPage slug="gallery" fallback-title="Gallery" fallback-description="Gallery" :show-featured="false" :show-meta="false" />
</template>

<script setup>
import WpPage from '~/components/generalElements/WpPage.vue';

definePageMeta({
  title: 'Gallery',
});
</script>
