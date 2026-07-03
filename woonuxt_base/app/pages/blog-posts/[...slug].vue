<template>
  <div class="min-h-screen bg-white text-gray-900 selection:bg-black selection:text-white pb-32">
    
    <!-- Shimmer Loader State -->
    <div v-if="pending" class="container mx-auto px-4 sm:px-6 py-24 md:py-32 max-w-7xl">
       <div class="animate-pulse space-y-12 border-l-2 border-gray-100 pl-6">
        <div class="h-12 w-2/3 bg-gray-100"></div>
        <div class="aspect-[21/9] w-full bg-gray-50"></div>
      </div>
    </div>

    <!-- Active Article View State -->
    <div v-else-if="post" class="container mx-auto px-4 sm:px-6 pt-16 md:pt-24 max-w-7xl">
      <article>
        
        <!-- Hero Header Zone -->
        <header class="mb-12 md:mb-16 border-l-2 border-primary pl-6 pb-2">
          <div class="flex items-center gap-3 mb-4 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">
            <span v-if="post.categories?.nodes?.length" class="text-primary font-black">
              {{ post.categories.nodes[0].name }}
            </span>
            <span v-if="post.categories?.nodes?.length" class="w-1 h-1 bg-gray-200 rotate-45"></span>
            <time :datetime="post.date">{{ formatDate(post.date) }}</time>
          </div>

          <h1 class="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 leading-none max-w-5xl">
            {{ post.title }}
          </h1>
        </header>

        <!-- Featured Banner Layer -->
        <div v-if="post.featuredImage" class="mb-16 md:mb-24">
          <div class="aspect-[21/9] overflow-hidden bg-gray-50 border border-gray-100">
            <img 
              :src="post.featuredImage.node.sourceUrl" 
              :alt="post.featuredImage.node.altText || post.title"
              class="w-full h-full object-cover transition-transform duration-1000 hover:scale-102"
            />
          </div>
        </div>

        <!-- Rendered Core Content Grid -->
        <div class="grid grid-cols-12 gap-4 sm:gap-6 md:gap-8">
          <div 
            class="col-span-12 lg:col-span-8 lg:col-start-3 prose prose-neutral max-w-none 
                   prose-h2:text-xl prose-h2:md:text-2xl prose-h2:font-black prose-h2:uppercase prose-h2:tracking-tight prose-h2:text-gray-900 prose-h2:mt-12 prose-h2:mb-4
                   prose-p:text-xs prose-p:sm:text-sm prose-p:leading-relaxed prose-p:text-gray-500 prose-p:font-medium prose-p:mb-6
                   prose-strong:text-gray-900 prose-strong:font-black
                   prose-img:my-12 prose-img:border prose-img:border-gray-100"
            v-html="post.content"
          ></div>
        </div>
      </article>

      <!-- Related Publications Grid Segment -->
      <section v-if="relatedPosts.length" class="mt-24 md:mt-36 pt-16 border-t border-gray-100">
        <h3 class="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 mb-12 text-center">
          Related Reading
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          <NuxtLink 
            v-for="related in relatedPosts" 
            :key="related.id" 
            :to="related.uri"
            class="group flex flex-col"
          >
            <div class="aspect-[16/10] overflow-hidden bg-gray-50 border border-gray-100 mb-4">
              <img 
                v-if="related.featuredImage" 
                :src="related.featuredImage.node.sourceUrl" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                alt=""
              />
            </div>
            <!-- Related item headers matching standard index cards -->
            <h4 class="text-sm font-bold uppercase tracking-tight text-gray-900 leading-snug group-hover:text-primary transition-colors">
              {{ related.title }}
            </h4>
          </NuxtLink>
        </div>
      </section>
    </div>

    <!-- Empty/404 Alternate Layout -->
    <div v-else class="min-h-[60vh] flex flex-col items-center justify-center text-center container mx-auto px-4">
      <Icon name="lucide:file-x" class="size-12 text-gray-300 mb-4" />
      <h2 class="text-2xl font-black uppercase tracking-tighter text-gray-900 mb-4">Story not found</h2>
      <NuxtLink to="/blog" class="text-[11px] font-black uppercase tracking-[0.5em] text-primary hover:underline pb-1">
        Return to Journal
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const uri = computed(() => {
  const segments = route.params.slug
  const path = Array.isArray(segments) ? segments.join('/') : segments
  const cleanPath = path.replace(/^\/|\/$/g, '')
  return `/blog-posts/${cleanPath}/`
})

const { data, pending } = await useAsyncGql('GetSinglePost', { uri: uri.value })
const post = computed(() => data.value?.nodeByUri)

const { data: relatedData } = await useAsyncGql('GetRelatedPosts', { exclude: [post.value?.id] })
const relatedPosts = computed(() => relatedData.value?.blogPosts?.nodes || [])

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

useSeoMeta({
  title: () => post.value?.title ? `${post.value.title} | Everest Drishti Craft` : 'Loading Story...',
  description: () => post.value?.excerpt?.replace(/<[^>]*>/g, '') || 'Read our latest handcrafted story.',
})
</script>

<style scoped>
/* Strict structural hard edges across all node blocks */
* { 
  border-radius: 0px !important; 
}

/* Precise typography color injects matching standard collection descriptions */
:deep(.prose) {
  --tw-prose-body: #6b7280; /* matches gray-500 */
  --tw-prose-headings: #111827; /* matches gray-900 */
}

/* Explicit font overwrite for your primary introductory article paragraph */
:deep(.prose p:first-of-type) {
  font-size: 0.875rem !important; /* matches text-sm font scale layout overrides */
  font-weight: 500 !important;
  color: #4b5563 !important; /* matches gray-600 */
  line-height: 1.75 !important;
}

article { 
  cursor: default; 
}
</style>