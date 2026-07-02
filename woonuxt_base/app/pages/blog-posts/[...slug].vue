<template>
  <div class="bg-white min-h-screen text-[#1a1a1a] selection:bg-black selection:text-white pb-32">
    
    <div v-if="pending" class="max-w-6xl mx-auto px-6 py-32">
       <div class="animate-pulse space-y-12">
        <div class="h-10 w-2/3 bg-gray-100"></div>
        <div class="aspect-[21/9] w-full bg-gray-50"></div>
      </div>
    </div>

    <div v-else-if="post" class="max-w-6xl mx-auto px-6 pt-32">
      <article>
        <header class="mb-20 border-b border-gray-100 pb-12">
          <div class="flex items-center gap-4 mb-8 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
            <span v-if="post.categories?.nodes?.length" class="text-black">
              {{ post.categories.nodes[0].name }}
            </span>
            <span class="text-gray-200">/</span>
            <time :datetime="post.date">{{ formatDate(post.date) }}</time>
          </div>

          <h1 class="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] max-w-4xl">
            {{ post.title }}
          </h1>
        </header>

        <div v-if="post.featuredImage" class="mb-24">
          <div class="aspect-[21/9] overflow-hidden bg-gray-50 border border-gray-100">
            <img 
              :src="post.featuredImage.node.sourceUrl" 
              :alt="post.featuredImage.node.altText || post.title"
              class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>
        </div>

        <div class="grid grid-cols-12 gap-8 lg:gap-16">
          <div 
            class="col-span-12 lg:col-span-8 lg:col-start-3 prose prose-neutral max-w-none 
                   prose-h2:text-2xl prose-h2:font-black prose-h2:uppercase prose-h2:tracking-tight prose-h2:mt-16
                   prose-p:text-[14px] prose-p:leading-[1.9] prose-p:text-gray-600 prose-p:mb-8
                   prose-strong:text-black prose-strong:font-black
                   prose-img:my-20"
            v-html="post.content"
          ></div>
        </div>

    
      </article>

      <section v-if="relatedPosts.length" class="mt-48 pt-24 border-t border-gray-100">
        <h3 class="text-[10px] font-black uppercase tracking-[0.5em] mb-16 text-center text-gray-400">Related Reading</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          <NuxtLink 
            v-for="related in relatedPosts" 
            :key="related.id" 
            :to="related.uri"
            class="group"
          >
            <div class="aspect-[16/10] overflow-hidden bg-gray-50 border border-gray-100 mb-6">
              <img 
                v-if="related.featuredImage" 
                :src="related.featuredImage.node.sourceUrl" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <h4 class="text-sm font-black uppercase tracking-tight leading-tight group-hover:text-primary transition-colors">
              {{ related.title }}
            </h4>
          </NuxtLink>
        </div>
      </section>
    </div>

    <div v-else class="h-screen flex flex-col items-center justify-center text-center">
      <h2 class="text-2xl font-black uppercase tracking-tighter mb-4">Story not found</h2>
      <NuxtLink to="/blog" class="text-[10px] font-black uppercase tracking-widest border-b-2 border-black pb-2">
        Return to Journal
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
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
/* Force sharp edges */
* { border-radius: 0 !important; }

:deep(.prose) {
  --tw-prose-body: #555;
  --tw-prose-headings: #1a1a1a;
}

:deep(.prose p:first-of-type) {
  font-size: 1.1rem;
  color: #111;
  line-height: 2;
}

article { cursor: default; }
</style>