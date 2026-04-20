/**
 * App configuration.
 * This file is used to configure the app settings.
 * Below are the default values.
 */
export default defineAppConfig({
  siteName: 'Everest Drishti Craft',
  shortDescription: 'Everest Drishti Craft is a brand that offers a wide range of products, including handmade crafts, home decor, and lifestyle items.',
  description: `Everest Drishti Craft is a brand that offers a wide range of products, including handmade crafts, home decor, and lifestyle items.`,
  baseUrl: 'https://www.everestdrishticraft.com',
  siteImage: 'https://www.everestdrishticraft.com/images/og-image.png',
  storeSettings: {
    autoOpenCart: false,
    showReviews: true,
    showFilters: true,
    showOrderByDropdown: true,
    showSKU: true,
    showRelatedProducts: true,
    showProductCategoriesOnSingleProduct: true,
    showBreadcrumbOnSingleProduct: true,
    showMoveToWishlist: true,
    hideBillingAddressForVirtualProducts: false,
    initStoreOnUserActionToReduceServerLoad: true,
    saleBadge: 'percent', // 'percent', 'onSale' or 'hidden'
    socialLoginsDisplay: 'buttons', // 'buttons' or 'icons'
  },
});
