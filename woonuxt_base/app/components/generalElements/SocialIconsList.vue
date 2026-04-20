<script setup>
import { phone } from '~/woonuxt_base/app/constants';
const props = defineProps({
  bigIcons: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <ul class="items-center flex">
    <li>
      <a
        href="https://www.facebook.com/people/Everest-Drishti-Craft/100069869753601/"
        target="_blank"
        rel="noreferrer"
        class="flex items-center gap-2 hover:bg-[#1877F2] hover:text-white rounded-full p-2">
        <Icon name="ion:logo-facebook" :class="props.bigIcons ? 'size-7' : 'size-5'" />
        <span class="sr-only">Facebook</span>
      </a>
    </li>
    <li>
      <a :href="`https://wa.me/${phone}`" target="_blank" rel="noreferrer" class="flex items-center gap-2 hover:bg-[#25D366] hover:text-white rounded-full p-2">
        <Icon name="ion:logo-whatsapp" :class="props.bigIcons ? 'size-7' : 'size-5'" />
        <span class="sr-only">Whatsapp</span>
      </a>
    </li>
    <li>
      <a
        href="https://www.instagram.com/everest.drishticraft?igsh=MW9yYmM1aW1pYjNvNQ=="
        target="_blank"
        rel="noreferrer"
        class="flex items-center gap-2 hover:bg-[#C13584] hover:text-white rounded-full p-2">
        <Icon name="ion:logo-instagram" :class="props.bigIcons ? 'size-7' : 'size-5'" />
        <span class="sr-only">Instagram</span>
      </a>
    </li>
    <li>
      <a
        href="https://www.linkedin.com/in/everestdrishticraft"
        target="_blank"
        rel="noreferrer"
        class="flex items-center gap-2 hover:bg-[#665191] hover:text-white rounded-full p-2">
        <Icon name="mdi:linkedin" :class="props.bigIcons ? 'size-8' : 'size-6'" />
        <span class="sr-only">Linkedin</span>
      </a>
    </li>
  </ul>
</template>
