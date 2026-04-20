import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver(import.meta.url);

// Environment variables with fallbacks
const GQL_HOST = process.env.GQL_HOST || 'http://localhost:4000/graphql';
const APP_HOST = process.env.APP_HOST || 'http://localhost:3000';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', href: '/favicon.png', type: 'image/png' }],
    },
    pageTransition: { name: 'page', mode: 'default' },
  },

  plugins: [resolve('./app/plugins/init.ts')],

  components: [{ path: resolve('./app/components'), pathPrefix: false }],

  modules: ['woonuxt-settings', 'nuxt-graphql-client', '@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxt/image', '@nuxtjs/i18n', 'nuxt-gtag', '@nuxtjs/google-fonts'],

  googleFonts: {
    families: {
      'Noto Sans': true,
    },
  },

  'graphql-client': {
    clients: {
      default: {
        host: GQL_HOST,
        corsOptions: { mode: 'cors', credentials: 'include' },
        headers: { Origin: APP_HOST },
      },
    },
  },

  gtag: {
    id: 'G-PWX2N2Z56L',
  },

  // test

  alias: {
    '#constants': resolve('./app/constants'),
    '#woo': '../.nuxt/gql/default',
  },

  hooks: {
    'pages:extend'(pages) {
      const addPage = (name: string, path: string, file: string) => {
        pages.push({ name, path, file: resolve(`./app/pages/${file}`) });
      };

      addPage('product-page-pager', '/products/page/:pageNumber', 'products.vue');
      addPage('product-category-page', '/product-category/:categorySlug', 'product-category/[slug].vue');
      addPage('product-category-page-pager', '/product-category/:categorySlug/page/:pageNumber', 'product-category/[slug].vue');
      addPage('order-received', '/checkout/order-received/:orderId', 'order-summary.vue');
      addPage('order-summary', '/order-summary/:orderId', 'order-summary.vue');
    },
  },

  nitro: {
    routeRules: {
      '/checkout/order-received/**': { ssr: false },
      '/order-summary/**': { ssr: false },
    },
  },

  // Multilingual support
  i18n: {
    locales: [{ code: 'en_US', file: 'en-US.json', name: 'English 🇺🇸' }],
    langDir: 'locales',
    defaultLocale: 'en_US',
    strategy: 'no_prefix',
    restructureDir: false,
  },
});
