# Best Selling Tag Setup

This document explains how to set up the "best-selling" tag functionality in your WordPress WooCommerce store.

## Steps to Set Up Best Selling Tag

### 1. Create the "best-selling" Tag in WordPress

1. **Log into your WordPress Admin Dashboard**
2. **Navigate to Products > Tags** (or go to Products > Product Tags)
3. **Add a new tag:**
   - **Name:** `best-selling`
   - **Slug:** `best-selling` (should auto-generate)
   - **Description:** (optional) "Products marked as hot/popular items"
4. **Click "Add New Tag"**

### 2. Assign the Tag to Products

1. **Go to Products > All Products**
2. **Edit any product you want to mark as "hot"**
3. **In the product editor, find the "Product Tags" section**
4. **Add the tag `best-selling`** (you can type it or select from existing tags)
5. **Update/Publish the product**
6. **Repeat for all products you want to display in the "Best Selling" section**

### 3. Verify the Implementation

The code has been updated to:

- Fetch products with the "best-selling" tag using the new `getHotProducts` GraphQL query
- Display these products in the "Best Selling" section on the homepage
- Only show the section if products with the tag exist

## GraphQL Query Details

The new query `getHotProducts` filters products by:

- Tag: `best-selling` (using `tagIn` filter)
- Visibility: `VISIBLE`
- Status: `publish`
- Limit: 5 products (configurable)

## Troubleshooting

### If no products appear in the "Best Selling" section:

1. **Check that the tag exists:**
   - Go to Products > Tags
   - Verify `best-selling` tag exists

2. **Check that products have the tag:**
   - Edit a product
   - Verify `best-selling` is in the Product Tags section

3. **Check GraphQL permissions:**
   - Ensure your GraphQL endpoint allows querying products by tags
   - Verify the `tagIn` filter is supported

4. **Check product visibility:**
   - Ensure products are published and visible
   - Check that products are not set to "hidden" or "catalog only"

### If you see TypeScript errors:

The code uses `as any` type assertions to avoid complex type issues. This is a temporary solution and the functionality should work correctly.

## Customization

You can modify the number of Best Selling displayed by changing the `first` parameter in the GraphQL query:

```typescript
const { data: hotProductsData } = await useAsyncGql("getHotProducts" as any, {
  first: 10,
}); // Show 10 products instead of 5
```

## Alternative Tags

If you want to use a different tag name, simply:

1. Create a new tag with your preferred name
2. Update the GraphQL query in `getHotProducts.gql`:
   ```graphql
   where: {
     tagIn: ["your-tag-name"],
     visibility: VISIBLE,
     status: "publish"
   }
   ```
