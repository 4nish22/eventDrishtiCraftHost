<template>
  <div class="min-h-screen bg-white text-gray-900">
    
    <!-- Hero Header Zone -->
    <div class="border-b border-gray-100">
      <header class="container mx-auto px-4 sm:px-6 py-12 md:py-16 max-w-7xl">
        <div class="max-w-3xl border-l-2 border-primary pl-6">
          <div class="inline-flex items-center gap-2 mb-3">
            <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span class="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">News & Insights</span>
          </div>
          <h1 class="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 leading-none">
            Blogs
          </h1>
          <p class="mt-4 text-xs sm:text-sm leading-relaxed text-gray-500 font-medium max-w-2xl break-words">
            Stay updated with the latest industry trends, artisan documentation, and corporate milestones from Drishti Craft.
          </p>
        </div>
      </header>
    </div>

    <!-- Main Grid Content -->
    <main class="container mx-auto px-4 sm:px-6 py-12 md:py-16 max-w-7xl">
      <div v-if="posts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <article 
          v-for="post in posts" 
          :key="post.id" 
          class="flex flex-col bg-white border border-gray-100 group hover:shadow-md transition-all duration-300 cursor-pointer"
          @click="navigateTo(post.uri)"
        >
          <!-- Image Container -->
          <div class="aspect-[16/10] overflow-hidden bg-gray-50 border-b border-gray-100">
            <img 
              v-if="post.featuredImage" 
              :src="post.featuredImage.node.sourceUrl" 
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              :alt="post.title"
            />
          </div>

          <!-- Metadata & Body -->
          <div class="p-6 md:p-8 flex flex-col flex-1">
            <div class="flex items-center gap-3 mb-4">
              <time class="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">
                {{ formatDate(post.date) }}
              </time>
              <span class="w-1 h-1 bg-gray-300 rotate-45"></span>
              <span class="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Insights</span>
            </div>

            <!-- Title matched to product/category headline styling rules -->
            <h2 class="text-lg md:text-xl font-bold uppercase tracking-tight text-gray-900 leading-snug mb-3 group-hover:text-primary transition-colors">
              {{ post.title }}
            </h2>

            <!-- Paragraph excerpt text -->
            <div 
              v-html="post.excerpt" 
              class="text-xs sm:text-sm leading-relaxed text-gray-500 font-medium line-clamp-3 mb-6"
            ></div>

            <!-- Footer Link CTA -->
            <div class="mt-auto pt-5 border-t border-gray-50">
              <span class="text-[11px] font-black uppercase tracking-[0.5em] text-primary inline-flex items-center gap-2">
                Read Full Report
                <Icon name="lucide:arrow-right" class="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State Fallback -->
      <div v-else-if="!pending" class="py-20 text-center bg-white border border-dashed border-gray-200">
        <Icon name="lucide:folder-open" class="size-12 text-gray-300 mx-auto mb-4" />
        <h2 class="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">No Publications</h2>
        <p class="text-xs text-gray-500 font-medium tracking-wide">No publications found at this time.</p>
      </div>
    </main>

  </div>
</template>

<script setup>
import { computed } from 'vue'

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
/* Strict structural hard boundaries */
.bg-white, .border, article {
  border-radius: 0px !important;
}

:deep(p) {
  margin: 0;
}
</style>