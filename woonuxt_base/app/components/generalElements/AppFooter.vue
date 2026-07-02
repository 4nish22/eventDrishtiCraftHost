<script setup lang="ts">
const { wooNuxtVersionInfo } = useHelpers();
const { wishlistLink } = useAuth();
import { address, phone, email } from '~/woonuxt_base/app/constants';
</script>

<template>
  <footer class="bg-[#111111] text-white order-last border-t border-white/5 mt-10">
    <div class="container flex flex-wrap justify-between gap-12 my-16 md:gap-24">
      <div class="mr-auto">
        <Logo class="brightness-0 invert" />

        <div class="mt-6">
          <p class="mt-2 text-sm text-gray-400 xl:max-w-md">Address: <span class="text-white">{{ address }}</span></p>
          <p class="mt-2 text-sm text-gray-400 xl:max-w-md">
            Phone: <a :href="`tel:${phone}`" class="text-white hover:text-primary transition-colors">{{ phone }}</a>
          </p>
          <p class="mt-2 text-sm text-gray-400 xl:max-w-md">
            Email: <a :href="`mailto:${email}`" class="text-white hover:text-primary transition-colors">{{ email }}</a>
          </p>
        </div>
        <div class="mt-6 ">
          <WebsiteShortDescription />
        </div>
      </div>

      <div class="w-3/7 lg:w-auto">
        <div class="mb-4 font-black text-[10px] uppercase tracking-[0.3em] text-primary">Information</div>
        <div class="text-[13px] flex flex-col gap-2 font-bold uppercase tracking-widest text-gray-400">
          <NuxtLink to="/about" class="hover:text-white transition-colors">About</NuxtLink>
          <NuxtLink to="/gallery" class="hover:text-white transition-colors">Gallery</NuxtLink>
          <NuxtLink to="/blog-posts" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">
            Blogs
          </NuxtLink>
          <NuxtLink to="/faq" class="hover:text-white transition-colors">FAQ's</NuxtLink>
        </div>
      </div>

      <div class="w-3/7 lg:w-auto">
        <div class="mb-4 font-black text-[10px] uppercase tracking-[0.3em] text-primary">{{
          $t('messages.general.customerService') }}</div>
        <div class="text-[13px] flex flex-col gap-2 font-bold uppercase tracking-widest text-gray-400">
          <NuxtLink to="/contact" class="hover:text-white transition-colors">Contact Us</NuxtLink>
          <NuxtLink to="/shipping-returns" class="hover:text-white transition-colors">Shipping & Returns</NuxtLink>
          <NuxtLink to="/privacy-policy" class="hover:text-white transition-colors">Privacy Policy</NuxtLink>
        </div>
      </div>

      <div class="w-3/7 lg:w-auto">
        <div class="mb-4 font-black text-[10px] uppercase tracking-[0.3em] text-primary">Connect with us</div>
        <SocialIconsList bigIcons class="-ml-2 invert brightness-0 opacity-70 hover:opacity-100 transition-opacity" />
      </div>
    </div>

    <div class="container border-t border-white/5 flex items-center justify-center">
      <div class="copywrite">
        <p class="py-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 text-center">
          &copy; {{ new Date().getFullYear() }} <NuxtLink to="/" class="hover:text-primary">Everest Drishti Craft
          </NuxtLink>. All rights reserved
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="postcss">
/* Strictly no underlines for the sharp aesthetic */
a {
  @apply no-underline transition-all duration-300;
}
</style>