<script setup>
const { getSearchQuery, setSearchQuery, clearSearchQuery } = useSearching();
const searchQuery = ref(getSearchQuery());

const props = defineProps({
  hasSubmitButton: {
    type: Boolean,
    default: false,
  },
});

const reset = () => {
  clearSearchQuery();
  searchQuery.value = '';
};

watch(getSearchQuery, (value) => {
  if (!value) reset();
});
</script>

<template>
  <form
    class="relative items-center flex-1 -space-x-px rounded-md shadow-sm"
    @submit.prevent="setSearchQuery(searchQuery)"
    :class="{ 'w-full': hasSubmitButton, 'flex-1': !hasSubmitButton }">
    <Icon name="ion:search-outline" size="20" class="absolute z-10 opacity-50 pointer-events-none left-2" v-if="!hasSubmitButton" />
    <input
      id="product-search-input"
      v-model="searchQuery"
      type="text"
      :placeholder="$t('messages.shop.searchProducts')"
      class="z-0 inline-flex items-center w-full p-2 pl-10 text-sm text-gray-500 border border-primary-light rounded-md outline-none bg-white focus:border-primary transition-all duration-200"
      :class="hasSubmitButton ? 'pl-3' : 'pl-10'" />
    <span
      v-if="searchQuery && !hasSubmitButton"
      class="absolute z-10 flex items-center gap-1 px-2 py-1 text-xs rounded cursor-pointer bg-primary bg-opacity-10 hover:bg-opacity-20 text-primary right-2"
      @click="reset">
      <span>{{ $t('messages.general.clear') }}</span>
      <Icon name="ion:close-outline" size="18" />
    </span>
    <button
      type="submit"
      class="absolute top-0 text-sm uppercase bottom-0 right-0 z-10 flex items-center gap-1 px-5 font-medium py-1 rounded-tr-md rounded-br-md cursor-pointer bg-primary/90 text-white hover:bg-primary">
      <span>Search</span>
    </button>
  </form>
</template>
