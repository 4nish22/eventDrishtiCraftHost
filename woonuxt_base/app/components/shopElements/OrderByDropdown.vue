<script setup>
const { getOrderQuery, setOrderQuery } = await useSorting();
const { storeSettings } = useAppConfig();
const selectedOrder = ref(getOrderQuery());
const orderby = ref(selectedOrder.value.orderBy || 'date');
const order = ref(selectedOrder.value.order);

// Update the URL when the checkbox is changed
watch([orderby, order], () => {
  setOrderQuery(orderby.value, order.value);
});
</script>

<template>
  <div class="inline-flex ml-auto isolate bg-white border border-gray-200">
    <button
      class="relative inline-flex items-center justify-center w-10 h-10 text-gray-900 hover:bg-gray-50 transition-colors border-r border-gray-200"
      aria-label="Sort Direction"
      @click="order = order === 'ASC' ? 'DESC' : 'ASC'">
      <Icon 
        name="ion:chevron-up-outline" 
        size="14" 
        :class="order === 'ASC' ? '' : 'rotate-180'" 
        class="transition-transform duration-500 ease-in-out" 
      />
    </button>

    <div class="hidden md:flex items-center px-3 border-r border-gray-200 bg-gray-50/50">
      <span class="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Sort By</span>
    </div>

    <select 
      id="orderby-dropdown" 
      v-model="orderby" 
      class="bg-transparent h-10 pl-4 pr-10 text-[11px] font-black uppercase tracking-widest text-gray-900 border-none focus:ring-0 cursor-pointer appearance-none uppercase" 
      aria-label="Order by"
    >
      <option value="date">{{ $t('messages.general.latest') }}</option>
      <option value="alphabetically">{{ $t('messages.general.alphabetically') }}</option>
      <option value="price">{{ $t('messages.shop.price') }}</option>
      <option v-if="storeSettings.showReviews" value="rating">{{ $t('messages.shop.rating') }}</option>
      <option value="discount">{{ $t('messages.shop.discount') }}</option>
    </select>

    <div class="flex items-center pr-3 pointer-events-none -ml-8">
      <Icon name="ion:chevron-down" size="10" class="text-primary" />
    </div>
  </div>
</template>

<style scoped>
/* Cleaning up the default select styling for a sharp look */
select {
  background-image: none !important;
  text-transform: uppercase;
}

/* Ensuring no blue outline on click */
button:focus, select:focus {
  outline: none;
  box-shadow: none;
}
</style>