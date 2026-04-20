<template>
  <div class="container my-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-6">
      <!-- Contact Info Section -->
      <div class="space-y-7">
        <div>
          <h1 class="text-3xl font-bold text-black">Let's connect</h1>
        </div>

        <div class="space-y-6">
          <!-- Email -->
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-600 text-sm">Email</p>
              <p class="text-black font-medium"><a href="mailto:info@everestdrishticraft.com" class="hover:underline">info@everestdrishticraft.com</a></p>
            </div>
          </div>

          <!-- Phone -->
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-600 text-sm">Phone</p>
              <p class="text-black font-medium">+977-{{ whatsappNumber }}</p>
            </div>
          </div>

          <!-- Address -->
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-600 text-sm">Address</p>
              <p class="text-black font-medium">{{ address }}</p>
            </div>
          </div>
        </div>
        <!-- <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56548.327222316875!2d85.2930597060873!3d27.647103020941795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1968ab18ad71%3A0x37bf1a159269d662!2sEverest%20Himalayan%20handicraft%20industry!5e0!3m2!1sen!2snp!4v1753622663893!5m2!1sen!2snp"
          class="w-full h-[200px] bg-gray-50 rounded-lg"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe> -->
      </div>

      <!-- Contact Form Section -->
      <div class="bg-white">
        <form class="space-y-6" ref="formRef" @submit.prevent="submitForm">
          <!-- Name and Email Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                required
                id="name"
                name="name"
                placeholder="Enter your name"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors" />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                id="email"
                name="email"
                placeholder="Enter your email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors" />
            </div>
          </div>

          <!-- Phone and Subject Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                required
                id="phone"
                name="phone"
                placeholder="Enter your phone"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors" />
            </div>
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                required
                id="subject"
                name="subject"
                placeholder="Enter your subject"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors" />
            </div>
          </div>

          <!-- Message -->
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              required
              id="message"
              name="message"
              rows="6"
              placeholder="Enter your message"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors resize-none"></textarea>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              class="inline-flex min-w-40 justify-center items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/80 transition-colors group"
              :class="{ 'animate-pulse opacity-70 pointer-events-none cursor-not-allowed': isLoading }">
              Submit
              <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { whatsappNumber, address } from '~/constants';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Add any necessary script logic here
definePageMeta({
  title: 'Contact Us',
});

// Replace with your actual Google Apps Script Web App URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwIcKNCIUOOy3a7TGv4GvXS8n4N8j9mpMRrsJ58wJnONX5QFjKy5yCJE4w-7-k_T3Maig/exec';

const statusMessage = ref('');
const formRef = ref(null);
const isLoading = ref(false);

const submitForm = async (e) => {
  isLoading.value = true;
  statusMessage.value = '';
  const form = formRef.value;
  const formData = new FormData(form);

  // Build the data object
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  };

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    await Swal.fire({
      title: 'Success',
      text: 'Your message has been sent successfully',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#000',
    });

    form.reset();
  } catch (err) {
    await Swal.fire({
      title: 'Error',
      text: 'Something went wrong. Please try again.',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#d33',
    });
    console.error('Error:', err);
  } finally {
    isLoading.value = false;
  }
};
</script>
