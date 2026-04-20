<script setup lang="ts">
const { data } = await useAsyncData('stories-home', () => {
  return GqlGetStories({ first: 3 }); 
});

// Ensure we only ever take the first 3 stories regardless of data source
const stories = computed(() => (data.value?.stories?.nodes || []).slice(0, 3));
</script>

<template>
  <section class="bg-[#FDFDFD] py-10 lg:py-10 border-t border-gray-50">
    <div class="container mx-auto px-6 max-w-7xl">
      
      <header class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div class="max-w-xl">
          <h2 class="text-[10px] font-bold tracking-[0.4em] text-primary uppercase mb-3">
            Collaborators & Artisans
          </h2>
          <h3 class="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-[0.9]">
            Handmade <span class="text-gray-300">Stories</span>
          </h3>
        </div>

      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
        <NuxtLink 
          v-for="story in stories" 
          :key="story.id"
          :to="`/stories/${story.slug}`" 
          class="group block"
        >
          <div class="overflow-hidden aspect-square bg-gray-50 mb-6">
            <img 
              v-if="story.featuredImage"
              :src="story.featuredImage.node.sourceUrl" 
              :alt="story.title" 
              class="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
            />
          </div>
          <div class="space-y-3">
            <h4 class="text-lg font-bold text-gray-900 uppercase tracking-tight group-hover:text-primary transition-colors" v-html="story.title"></h4>
            <div class="text-gray-500 text-sm leading-relaxed line-clamp-2" v-html="story.excerpt"></div>
          </div>
        </NuxtLink>
      </div>


    </div>
  </section>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>