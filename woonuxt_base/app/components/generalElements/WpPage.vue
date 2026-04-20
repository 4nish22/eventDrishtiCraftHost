<template>
  <div>
    <div v-if="pending" class="container py-12">
      <div class="flex justify-center items-center">
        <LoadingIcon size="32" stroke-width="1" class="text-primary/50" />
      </div>
    </div>

    <div v-else-if="error" class="container py-12">
      <div class="max-w-xl mx-auto text-center border border-red-100 p-10">
        <h1 class="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-4">System Error</h1>
        <p class="text-gray-500 text-sm uppercase tracking-widest">Unable to retrieve content.</p>
      </div>
    </div>

    <main v-else-if="pageData" class="container pt-12 pb-16">
      
      <!-- <div v-if="showFeatured && pageData.featuredImage?.node?.sourceUrl" class="mb-12">
        <NuxtImg
          :src="pageData.featuredImage.node.sourceUrl"
          :alt="pageData.featuredImage.node.altText || pageData.title"
          class="w-full aspect-[21/9] md:aspect-[21/7] object-cover border border-gray-100"
          loading="eager" />
      </div> -->

      <header class="mb-12 w-full mx-auto" >
        <h1 class="text-4xl md:text-6xl font-black text-gray-900 mb-5 uppercase tracking-tighter leading-none">
          {{ pageData.title }} 
        </h1>
        
        <div v-if="showMeta && (pageData.author?.node?.name || pageData.date)" 
             class="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400"
             :class="{ 'justify-center': pageData.slug === 'gallery' }">
          <span v-if="pageData.author?.node?.name" class="flex items-center gap-2">
            <span class="text-primary">/</span> {{ pageData.author.node.name }}
          </span>
          <span v-if="pageData.date">
             {{ formatDate(pageData.date) }}
          </span>
        </div>
      </header>

      <article class="prose prose-lg max-w-none w-full mx-auto">
        <div v-html="pageData.content" class="wordpress-content"></div>
      </article>
    </main>

    <div v-else class="container py-12">
      <div class="max-w-xl mx-auto text-center border border-gray-100 p-10">
        <h1 class="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4">404 Not Found</h1>
        <p class="text-gray-500 text-sm uppercase tracking-widest">Archive missing.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  slug: { type: String, required: true },
  fallbackTitle: { type: String, default: '' },
  fallbackDescription: { type: String, default: '' },
  showFeatured: { type: Boolean, default: true },
  showMeta: { type: Boolean, default: true },
});

const { data, error, pending } = await useAsyncGql('getPage', { slug: props.slug });
const pageData = computed(() => data.value?.page);

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

useSeoMeta({
  title: () => pageData.value?.title || props.fallbackTitle,
  description: () => props.fallbackDescription,
  ogTitle: () => pageData.value?.title || props.fallbackTitle,
  ogDescription: () => props.fallbackDescription,
  ogImage: () => pageData.value?.featuredImage?.node?.sourceUrl,
  twitterCard: 'summary_large_image',
});
</script>

<style scoped>
:deep(.wordpress-content) {
  @apply text-gray-600 leading-[1.7] text-[16px];
}

:deep(.wordpress-content h1),
:deep(.wordpress-content h2),
:deep(.wordpress-content h3) {
  @apply text-gray-900 font-black uppercase tracking-tight mt-10 mb-4;
}

:deep(.wordpress-content p) { @apply mb-6; }

:deep(.wordpress-content a) {
  @apply text-gray-900 font-bold decoration-primary/30 decoration-2 underline-offset-4 hover:decoration-primary transition-all;
}

:deep(.wordpress-content blockquote) {
  @apply border-l-2 border-primary pl-6 italic text-gray-500 my-10 text-xl font-light leading-relaxed;
}

:deep(.wordpress-content ul) {
  @apply list-none ml-0 space-y-3 my-6;
}

:deep(.wordpress-content li) {
  @apply flex gap-3 before:content-['—'] before:text-primary/50 text-[15px];
}

/* --- Tighter Masonry Gallery --- */
:deep(.wp-block-gallery) {
  display: block;
  column-count: 1;
  column-gap: 1rem;
  margin: 3rem 0;
}

@media (min-width: 768px) {
  :deep(.wp-block-gallery) { column-count: 2; }
}

@media (min-width: 1024px) {
  :deep(.wp-block-gallery) { column-count: 3; }
}

:deep(.wp-block-gallery .wp-block-image),
:deep(.wp-block-gallery figure) {
  display: inline-block;
  width: 100%;
  margin-bottom: 1rem;
  break-inside: avoid;
  overflow: hidden;
  @apply border border-gray-100;
}

:deep(.wp-block-gallery figure:nth-child(3n+1) img) { aspect-ratio: 3 / 4; }
:deep(.wp-block-gallery figure:nth-child(3n+2) img) { aspect-ratio: 1 / 1; }
:deep(.wp-block-gallery figure:nth-child(3n+3) img) { aspect-ratio: 4 / 3; }

:deep(.wp-block-gallery img) {
  @apply w-full h-full object-cover rounded-none m-0 transition-transform duration-700 hover:scale-110;
}

:deep(.wordpress-content table) {
  @apply w-full border-collapse border-none my-10 text-[13px] uppercase tracking-wider;
}

:deep(.wordpress-content th) {
  @apply bg-gray-50 text-gray-900 font-black p-3 text-left border-b border-gray-200;
}

:deep(.wordpress-content td) {
  @apply p-3 border-b border-gray-100 text-gray-500;
}
</style>