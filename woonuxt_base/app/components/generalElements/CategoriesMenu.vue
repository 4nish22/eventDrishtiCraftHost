<script setup lang="ts">
import type { ProductCategory } from '~/woonuxt_base/app/types';

const { data } = await useAsyncGql('getAllProductCategories');

const productCategories = ref((data.value?.productCategories?.nodes || []).filter((category) => category.slug !== 'uncategorized') as ProductCategory[]);

// Mobile state management
const isMobileMenuOpen = ref(false);
const openCategories = ref<Set<string>>(new Set());

// Check if device is mobile
const isMobile = ref(false);

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768; // md breakpoint
  };

  checkMobile();
  window.addEventListener('resize', checkMobile);

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
  });
});

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (!isMobileMenuOpen.value) {
    openCategories.value.clear(); // Close all open categories when closing main menu
  }
};

// Toggle nested category
const toggleCategory = (categoryId: string) => {
  if (openCategories.value.has(categoryId)) {
    openCategories.value.delete(categoryId);
  } else {
    openCategories.value.add(categoryId);
  }
};

// Check if category is open
const isCategoryOpen = (categoryId: string) => {
  return openCategories.value.has(categoryId);
};
</script>

<template>
  <nav class="relative flex justify-between flex-1">
    <div class="flex flex-1">
      <!-- Categories Button with Hamburger Menu -->
      <div class="group relative py-2 flex-1">
        <button @click="isMobile ? toggleMobileMenu() : null"
          class="inline-flex items-center hover:text-white/90 font-medium text-white transition-colors rounded-md py-2 px-3 outline-none -ml-2 md:-ml-[14px]">
          <Icon name="mdi:menu" class="size-5 mr-2" />
          Categories
        </button>

        <!-- Main Categories Dropdown -->
        <div v-if="!isMobile || isMobileMenuOpen" :class="[
          isMobile
            ? 'relative left-0 w-full my-2 opacity-100 visible'
            : 'absolute left-0 z-50 w-52 transform opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out',
          isMobile ? 'static' : 'absolute',
        ]" :style="isMobile ? '' : 'top: 100%'">
          <div class="bg-white rounded-lg shadow-lg border border-gray-200">
            <!-- Main Categories List -->
            <div class="p-1.5">
              <div class="space-y-1">
                <div v-for="category in productCategories" :key="category.id" class="group/sub relative">
                  <!-- Main Category Link -->
                  <div class="flex items-center">
                    <NuxtLink 
                      :to="`/product-category/${category.slug}`"
                      @click="isMobile && (isMobileMenuOpen = false)"
                      class="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors duration-150 flex-1">
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate">{{ category.name }}</p>
                      </div>
                    </NuxtLink>

                    <!-- Mobile Expand/Collapse Button -->
                    <button v-if="isMobile && category.children?.nodes && category.children.nodes.length > 0"
                      @click="toggleCategory(category.id)"
                      class="p-2 hover:bg-gray-50 rounded-md transition-colors duration-150">
                      <svg
                        :class="['h-4 w-4 text-gray-400 transition-transform duration-200', isCategoryOpen(category.id) ? 'rotate-90' : '']"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    <!-- Desktop Sub-dropdown Arrow -->
                    <svg v-if="!isMobile && category.children?.nodes && category.children.nodes.length > 0"
                      class="h-4 w-4 text-gray-400 group-hover/sub:text-gray-600 transition-colors duration-150"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  <!-- Subcategories Dropdown -->
                  <div v-if="category.children?.nodes && category.children.nodes.length > 0" :class="[
                    isMobile
                      ? 'relative left-0 w-full mt-1 opacity-100 visible'
                      : 'absolute left-full -top-1.5 z-50 w-52 transform opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 ease-out ml-1',
                    isMobile && !isCategoryOpen(category.id) ? 'hidden' : '',
                    isMobile ? 'static' : 'absolute',
                  ]">
                    <div class="bg-white rounded-lg shadow-lg border border-gray-200">
                      <!-- Subcategories List -->
                      <div class="p-1.5">
                        <div class="space-y-2">
                          <div v-for="subcategory in category.children.nodes" :key="subcategory.id"
                            class="group/subsub relative">
                            <!-- Subcategory Link -->
                            <div class="flex items-center">
                              <NuxtLink 
                                :to="`/product-category/${subcategory.slug}`"
                                @click="isMobile && (isMobileMenuOpen = false)"
                                class="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors duration-150 flex-1">
                                <div class="flex-1 min-w-0">
                                  <p class="text-sm text-gray-900 truncate">{{ subcategory.name }}</p>
                                </div>
                              </NuxtLink>

                              <!-- Mobile Expand/Collapse Button for Subcategory -->
                              <button
                                v-if="isMobile && subcategory.children?.nodes && subcategory.children.nodes.length > 0"
                                @click="toggleCategory(subcategory.id)"
                                class="p-2 hover:bg-gray-50 rounded-md transition-colors duration-150">
                                <svg
                                  :class="['h-4 w-4 text-gray-400 transition-transform duration-200', isCategoryOpen(subcategory.id) ? 'rotate-90' : '']"
                                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7" />
                                </svg>
                              </button>

                              <!-- Desktop Sub-sub-dropdown Arrow -->
                              <svg
                                v-if="!isMobile && subcategory.children?.nodes && subcategory.children.nodes.length > 0"
                                class="h-4 w-4 text-gray-400 group-hover/subsub:text-gray-600 transition-colors duration-150"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M9 5l7 7-7 7" />
                              </svg>
                            </div>

                            <!-- Sub-subcategories Dropdown -->
                            <div v-if="subcategory.children?.nodes && subcategory.children.nodes.length > 0" :class="[
                              isMobile
                                ? 'relative left-0 w-full mt-1 opacity-100 visible'
                                : 'absolute left-full top-0 z-50 w-52 transform opacity-0 invisible group-hover/subsub:opacity-100 group-hover/subsub:visible transition-all duration-200 ease-out ml-1',
                              isMobile && !isCategoryOpen(subcategory.id) ? 'hidden' : '',
                              isMobile ? 'static' : 'absolute',
                            ]">
                              <div class="bg-white rounded-lg shadow-lg border border-gray-200">
                                <!-- Sub-subcategories List -->
                                <div class="p-1.5">
                                  <div class="space-y-2">
                                    <NuxtLink 
                                      v-for="subSubcategory in subcategory.children.nodes"
                                      :key="subSubcategory.id" 
                                      :to="`/product-category/${subSubcategory.slug}`"
                                      @click="isMobile && (isMobileMenuOpen = false)"
                                      class="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors duration-150">
                                      <div class="flex-1 min-w-0">
                                        <p class="text-sm text-gray-900 truncate">{{ subSubcategory.name }}</p>
                                      </div>
                                    </NuxtLink>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Additional custom styles for better hover behavior */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group:hover .group-hover\:visible {
  visibility: visible;
}

.group\/sub:hover .group-hover\/sub\:opacity-100 {
  opacity: 1;
}

.group\/sub:hover .group-hover\/sub\:visible {
  visibility: visible;
}

.group\/subsub:hover .group-hover\/subsub\:opacity-100 {
  opacity: 1;
}

.group\/subsub:hover .group-hover\/subsub\:visible {
  visibility: visible;
}

/* Ensure dropdowns don't disappear when moving to submenu */
.group:hover .group-hover\:opacity-100,
.group\/sub:hover .group-hover\/sub\:opacity-100,
.group\/subsub:hover .group-hover\/subsub\:opacity-100 {
  pointer-events: auto;
}

/* Smooth transitions */
.group,
.group\/sub,
.group\/subsub {
  transition: all 0.2s ease-out;
}
</style>
