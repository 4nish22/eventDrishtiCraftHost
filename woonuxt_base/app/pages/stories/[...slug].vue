<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug;

// WordPress URI construction
const uri = `/stories/${slug}/`;

const { data, pending, error } = await useAsyncData(`story-${slug}`, () => {
  return GqlGetSingleStory({ uri });
});

const story = computed(() => data.value?.nodeByUri);

useHead({
  title: story.value?.title ? `${story.value.title} | Story` : 'Story',
  meta: [
    { name: 'description', content: story.value?.excerpt || 'Read our artisan stories.' }
  ]
});
</script>

<template>
  <main class="bg-white min-h-screen">
    <div v-if="pending" class="py-40 text-center">
      <div class="inline-block animate-pulse text-[10px] font-bold tracking-[0.5em] uppercase text-gray-400">
        Opening Story...
      </div>
    </div>

    <div v-else-if="error || !story" class="py-40 text-center">
      <h1 class="text-2xl font-bold uppercase tracking-tighter text-gray-900">Story Not Found</h1>
      <NuxtLink to="/" class="mt-6 inline-block text-[10px] font-bold text-primary uppercase tracking-widest border-b border-primary pb-1">
        Return to Home
      </NuxtLink>
    </div>

    <article v-else class="relative">
      <header class="container mx-auto px-6 max-w-4xl pt-20 lg:pt-32 pb-16">
        <div class="flex items-center gap-4 mb-8">
          <NuxtLink to="/" class="text-[10px] font-bold text-gray-400 hover:text-primary transition-colors uppercase tracking-widest">
            Home
          </NuxtLink>
          <div class="w-8 h-px bg-gray-200"></div>
          <time class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {{ new Date(story.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }}
          </time>
        </div>

        <h1 class="text-4xl md:text-7xl font-black text-gray-900 uppercase tracking-tighter leading-[0.85] mb-12" v-html="story.title"></h1>
        
        <div v-if="story.featuredImage" class="aspect-video overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
          <img 
            :src="story.featuredImage.node.sourceUrl" 
            :alt="story.title" 
            class="w-full h-full object-contain"
          />
        </div>
      </header>

      <div class="container mx-auto px-6 max-w-3xl pb-32">
        <div 
          class="prose prose-lg prose-gray max-w-none 
                 prose-headings:uppercase prose-headings:tracking-tighter prose-headings:font-black
                 prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-8
                 prose-img:rounded-sm prose-img:border prose-img:border-gray-100"
          v-html="story.content"
        ></div>

        <footer class="mt-20 pt-10 border-t border-gray-100 flex justify-between items-center">
          <NuxtLink to="/" class="group flex items-center gap-4">
            <div class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all">
              <Icon name="ph:arrow-left" class="text-sm text-gray-400 group-hover:text-white" />
            </div>
            <span class="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 group-hover:text-black transition-colors">Return Home</span>
          </NuxtLink>
          
          <div class="hidden md:block text-[9px] font-bold text-gray-300 uppercase tracking-[0.4em]">
            Artisan Documentation © 2026
          </div>
        </footer>
      </div>
    </article>
  </main>
</template>

<style scoped>
/* Refined Typography Layout */
:deep(.prose) p {
  @apply text-[17px] md:text-[19px] leading-[1.9] mb-10;
}

:deep(.prose) strong {
  @apply text-gray-900 font-bold;
}

:deep(.prose) h2 {
  @apply text-3xl mt-16 mb-8 text-gray-900;
}

:deep(.prose) img {
  @apply w-full h-auto object-contain my-12;
}

/* Removes top margin from first element in content for cleaner alignment */
:deep(.prose) > *:first-child {
  @apply mt-0;
}
</style>