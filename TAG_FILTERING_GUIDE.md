# Tag Filtering Guide

This guide explains how to use the new tag filtering functionality in your WooCommerce store.

## How Tag Filtering Works

The tag filtering system allows you to filter products by their tags using URL parameters, similar to how category filtering works.

### URL Format

The tag filtering uses the following URL format:

```
http://localhost:3000/products?filter=tag[best-selling]
```

You can also combine multiple filters:

```
http://localhost:3000/products?filter=tag[best-selling],category[animals]
```

### Available Filter Types

1. **Tag Filter**: `tag[tag-slug]`
   - Example: `tag[best-selling]`
   - Filters products by specific tags

2. **Category Filter**: `category[category-slug]`
   - Example: `category[animals]`
   - Filters products by specific categories

3. **Combined Filters**: You can combine multiple filters with commas
   - Example: `tag[best-selling],category[animals]`

## Implementation Details

### 1. Backend Changes

- **useFiltering.ts**: Added tag filtering logic to the `filterProducts` function
- **TagFilter.vue**: New component for tag filter UI
- **Filters.vue**: Updated to include tag filtering in the sidebar

### 2. GraphQL Query

The system fetches all product tags using the `getAllTerms` query with `TaxonomyEnum.PRODUCTTAG`.

### 3. Filter Logic

The tag filtering works by:

1. Parsing the `tag` parameter from the URL filter query
2. Checking if each product has the specified tag in its `terms.nodes` array
3. Only showing products that match the tag criteria

## Usage Examples

### Filter by Best Selling Tag

```
http://localhost:3000/products?filter=tag[best-selling]
```

### Filter by Multiple Tags

```
http://localhost:3000/products?filter=tag[best-selling,featured]
```

### Combine with Category Filter

```
http://localhost:3000/products?filter=tag[best-selling],category[animals]
```

### Combine with Price Filter

```
http://localhost:3000/products?filter=tag[best-selling],price[0,100]
```

## UI Components

### TagFilter Component

- Located at: `woonuxt_base/app/components/filtering/TagFilter.vue`
- Provides checkbox interface for tag selection
- Automatically updates URL when tags are selected/deselected

### Integration with Filters

- Tag filter appears in the sidebar filters
- Only shows if product tags exist
- Follows the same UI pattern as other filters

## Setting Up Tags in WordPress

1. **Create Tags**: Go to WordPress Admin → Products → Tags
2. **Add Tags**: Create tags like "best-selling", "featured", etc.
3. **Assign to Products**: Edit products and add the desired tags
4. **Test**: Visit `/products` and use the tag filter in the sidebar

## Troubleshooting

### If tag filtering doesn't work:

1. **Check tag existence**: Ensure the tag exists in WordPress
2. **Check product assignment**: Verify products have the tag assigned
3. **Check GraphQL**: Ensure `getAllTerms` query includes `PRODUCTTAG`
4. **Check URL format**: Verify the URL parameter format is correct

### If no tags appear in the filter:

1. **Check WordPress**: Ensure product tags exist
2. **Check GraphQL**: Verify the query is fetching tag terms
3. **Check component**: Ensure TagFilter component is properly imported

## Customization

### Adding Custom Tag Filters

To add custom tag-based filtering:

1. **Create the tag** in WordPress
2. **Assign to products** you want to filter
3. **Use the URL format**: `?filter=tag[your-tag-slug]`

### Modifying the TagFilter Component

You can customize the TagFilter component by:

- Changing the label
- Modifying the UI layout
- Adding custom styling
- Adding additional functionality

## Technical Notes

- Tag filtering works client-side using the existing product data
- No additional GraphQL queries are needed for filtering
- The filter is applied in combination with other filters (category, price, etc.)
- Tag filtering respects the existing filter reset functionality
