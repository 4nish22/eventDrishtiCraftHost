<script setup lang="ts">
const { wishlistLink } = useAuth();
</script>

<template>
  <nav>
    <NuxtLink class="hover:text-primary" to="/">{{ $t('messages.general.home') }}</NuxtLink>
    <NuxtLink class="hover:text-primary" to="/products">{{ $t('messages.general.allProducts') }}</NuxtLink>
    <!-- <NuxtLink class="hover:text-primary" :to="wishlistLink" :prefetch="false">My Wishlist</NuxtLink> -->

    <NuxtLink class="hover:text-primary" to="/about">About Us</NuxtLink>
    <NuxtLink class="hover:text-primary" to="/gallery">Gallery</NuxtLink>
    <NuxtLink class="hover:text-primary" to="/blog">Blogs</NuxtLink>
    <NuxtLink class="hover:text-primary" to="/contact">{{ $t('messages.general.contact') }}</NuxtLink>
    <NuxtLink class="lg:hidden hover:text-primary" to="/my-account" :prefetch="false">My Account</NuxtLink>
  </nav>
</template>
