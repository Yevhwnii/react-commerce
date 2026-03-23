# Create Explicit Component Variants

**Impact:** HIGH
**Category:** Component Architecture

## The Problem

A single component with many boolean props creates impossible states and hides what actually renders.

```tsx
// WRONG — what does this render? unclear.
<ProductCard isFeatured isCompact showQuickAdd isOutOfStock />
```

## The Solution

Create separate, purpose-built variant components. Each variant explicitly composes only the pieces it needs.

```tsx
// CORRECT — self-documenting, no hidden conditionals
<FeaturedProductCard product={product} />
<CompactProductCard product={product} />
<OutOfStockProductCard product={product} />
```

Variants may share internal building blocks (`ProductCard.Image`, `ProductCard.Title`, `ProductCard.Price`) but each variant owns its own structure.

## Ecommerce Context

Apply this pattern to:
- **ProductCard** → `FeaturedProductCard`, `CompactProductCard`, `RelatedProductCard`
- **Button** → `PrimaryButton`, `SecondaryButton`, `DestructiveButton`, `GhostButton`
- **OrderStatus** → `PendingOrder`, `ShippedOrder`, `DeliveredOrder`, `CancelledOrder`
- **CartItem** → `CartLineItem`, `SavedForLaterItem`, `GiftItem`

Keep variants in `packages/ui/src/` if shared across client and admin, otherwise in the app's own `components/` folder.
