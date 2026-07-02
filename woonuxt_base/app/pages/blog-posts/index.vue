<template>
  <div class="bg-[#F9FAFB] min-h-screen font-sans text-slate-900">
    
    <div class="bg-white border-b border-gray-200">
      <header class="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div class="flex flex-col gap-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/10 w-fit">
            <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span class="text-[11px] font-bold uppercase tracking-wider text-primary"> News & Insights</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Blogs 
          </h1>
          <p class="text-slate-500 max-w-2xl text-lg leading-relaxed">
            Stay updated with the latest industry trends, artisan documentation, and corporate milestones from Drishti Craft.
          </p>
        </div>
      </header>
    </div>

    <main class="max-w-7xl mx-auto px-6 py-16">
      <div v-if="posts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article 
          v-for="post in posts" 
          :key="post.id" 
          class="flex flex-col bg-white border border-gray-200 group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 cursor-pointer"
          @click="navigateTo(post.uri)"
        >
          <div class="aspect-[16/10] overflow-hidden bg-slate-100 border-b border-gray-100">
            <img 
              v-if="post.featuredImage" 
              :src="post.featuredImage.node.sourceUrl" 
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              :alt="post.title"
            />
          </div>

          <div class="p-8 flex flex-col flex-1">
            <div class="flex items-center gap-3 mb-4">
              <time class="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {{ formatDate(post.date) }}
              </time>
              <span class="w-1 h-1 rounded-full bg-slate-300"></span>
              <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Insights</span>
            </div>

            <h2 class="text-xl font-bold text-slate-900 leading-snug mb-4 group-hover:text-primary transition-colors">
              {{ post.title }}
            </h2>

            <div 
              v-html="post.excerpt" 
              class="text-sm leading-relaxed text-slate-600 line-clamp-3 mb-8"
            ></div>

            <div class="mt-auto pt-6 border-t border-gray-50">
              <span class="text-xs font-bold uppercase tracking-widest text-primary inline-flex items-center gap-2">
                Read Full Report
                <Icon name="ph:arrow-right-bold" class="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </article>
      </div>

      <div v-else-if="!pending" class="py-24 text-center bg-white border border-gray-200">
        <Icon name="ph:folder-open-light" class="text-4xl text-slate-300 mb-4" />
        <p class="text-sm font-medium text-slate-500">No publications found at this time.</p>
      </div>
    </main>

   
  </div>
</template>

<script setup>
const { data, pending } = await useAsyncGql('GetAllBlogs')
const posts = computed(() => data.value?.blogPosts?.nodes || [])

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
/* Standard Corporate Sharpness (5px for a professional touch) */
* {
  border-radius: 4px;
}

/* Remove rounding from specific structural containers if you want it very sharp */
.bg-white, .border, article {
  border-radius: 0px;
}

:deep(p) {
  margin: 0;
}
</style>