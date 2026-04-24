<template>
  <div class="faq-page container mx-auto py-12 px-4">
    <header class="mb-12 border-b pb-8">
      <h1 class="text-4xl font-bold">Frequently Asked Questions</h1>
      <p class="text-gray-500 mt-2">Last updated: {{ new Date().toLocaleDateString() }}</p>
    </header>

    <div v-if="pending" class="flex justify-center py-10">
      <p>Loading answers...</p>
    </div>

    <div v-else-if="faqs.length" class="max-w-4xl space-y-10">
      <article v-for="faq in faqs" :key="faq.id" class="faq-item">
        <div class="flex flex-col gap-2">
          <h2 class="text-2xl font-semibold text-gray-900">
            {{ faq.title }}
          </h2>
          
          <span v-if="faq.date" class="text-sm text-gray-400">
            Updated on {{ formatDate(faq.date) }}
          </span>

          <div 
            class="mt-4 prose prose-slate max-w-none text-gray-700 leading-relaxed"
            v-html="faq.content"
          ></div>
        </div>
      </article>
    </div>

    <div v-else class="text-center py-20">
      <p class="text-xl text-gray-500">No FAQs found.</p>
    </div>
  </div>
</template>

<script setup>
// Fetching using your preferred useAsyncGql helper
// Note: Ensure 'GetFAQs' is defined in your .graphql files or queries
const { data, pending } = await useAsyncGql('GetFAQs')

// Mapping the nodes from your CPT
const faqs = computed(() => data.value?.faqs?.nodes || [])

// Date formatter as requested
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

definePageMeta({
  title: 'FAQ',
});
</script>

<style scoped>
.faq-item {
  @apply transition-all duration-300;
}

/* Ensures WordPress blocks inside the content look clean */
:deep(.prose p) {
  margin-bottom: 1.25rem;
}
</style>