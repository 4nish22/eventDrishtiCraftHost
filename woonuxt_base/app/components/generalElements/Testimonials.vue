<script setup lang="ts">
const testimonials = [
  {
    name: 'Sunil Shrestha',
    image: '/images/avatar1.jpeg',
    description: 'The personal touch in their service makes me feel valued. They remember my preferences and always follow up.',
  },
  {
    name: 'Birendra Bhattarai',
    image: '/images/avatar2.jpeg',
    description: 'I am really impressed with their service. The vegetables are fresh and healthy. I would definitely recommend them.',
  },
  {
    name: 'Ram Kumar Rai',
    image: '/images/avatar3.jpeg',
    description: 'The personal touch in their service makes me feel valued. They remember my preferences and always follow up.',
  },
];

// Function to get initials from full name
const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length >= 2) {
    const firstName = names[0] || '';
    const lastName = names[names.length - 1] || '';
    if (firstName.length > 0 && lastName.length > 0) {
      return (firstName[0] + lastName[0]).toUpperCase();
    }
  }
  return name.substring(0, 2).toUpperCase();
};

// Function to generate a color based on name
const getColorFromName = (name: string) => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500',
    'bg-emerald-500',
    'bg-violet-500',
    'bg-rose-500',
    'bg-sky-500',
    'bg-lime-500',
  ];

  // Simple hash function to get consistent color for same name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};
</script>
<template>
  <section class="pt-10 md:pt-12 pb-0 md:pb-0.5">
    <div class="container">
      <h2 class="text-xl font-bold md:text-2xl mb-6">What Our Customers Say</h2>
      <div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-7">
          <div v-for="(testimonial, index) in testimonials" :key="index" class="last:hidden md:last:block">
            <div class="group border flex justify-between flex-col border-gray-200 rounded-xl p-5 slide_active:border-indigo-600 h-full">
              <div>
                <div class="flex items-center mb-3 md:mb-3.5 text-amber-500 transition-all duration-500">
                  <Icon name="ic:sharp-star-rate" class="text-yellow-400 size-5 md:size-6" />
                  <Icon name="ic:sharp-star-rate" class="text-yellow-400 size-5 md:size-6" />
                  <Icon name="ic:sharp-star-rate" class="text-yellow-400 size-5 md:size-6" />
                  <Icon name="ic:sharp-star-rate" class="text-yellow-400 size-5 md:size-6" />
                  <Icon name="ic:sharp-star-rate" class="text-yellow-400 size-5 md:size-6" />
                  <!-- <Icon name="ic:baseline-star-half" class="text-yellow-400 size-5 md:size-7" /> -->
                </div>
                <p class="text-base text-gray-600 leading-6 transition-all duration-500 pb-4">
                  {{ testimonial.description }}
                </p>
              </div>
              <div class="flex items-center gap-3">
                <div class="size-12 rounded-full flex items-center justify-center text-white font-medium text-base" :class="getColorFromName(testimonial.name)">
                  {{ getInitials(testimonial.name) }}
                </div>
                <div class="block">
                  <h5 class="text-gray-900 font-medium transition-all duration-500">{{ testimonial.name }}</h5>
                  <span class="text-sm leading-4 text-gray-500">Customer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
