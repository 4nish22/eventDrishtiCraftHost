import { ref, computed } from 'vue';
import type { ProductCategory } from '~/woonuxt_base/app/types';

export function useCategoryNavigation(productCategories: { value: ProductCategory[] }) {
  // Track the navigation path (parent, child, grandchild)
  const selectedCategories = ref<ProductCategory[]>([]);

  function selectCategory(category: ProductCategory) {
    const last = selectedCategories.value[selectedCategories.value.length - 1];
    if (!last || last.id !== category.id) {
      selectedCategories.value.push(category);
    }
  }

  function goBack() {
    selectedCategories.value.pop();
  }

  const getCurrentCategories = computed<ProductCategory[]>(() => {
    if (selectedCategories.value.length === 0) {
      return productCategories.value || [];
    }
    const last = selectedCategories.value[selectedCategories.value.length - 1];
    if (!last) return [];
    return last.children?.nodes || [];
  });

  const getCurrentCategoryName = computed<string | null>(() => {
    if (selectedCategories.value.length === 0) return null;
    const last = selectedCategories.value[selectedCategories.value.length - 1];
    return last ? last.name : null;
  });

  return {
    selectedCategories,
    selectCategory,
    goBack,
    getCurrentCategories,
    getCurrentCategoryName,
  };
}
