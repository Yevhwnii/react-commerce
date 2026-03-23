# Avoid Boolean Prop Proliferation

**Impact:** HIGH
**Category:** Component Architecture

## The Problem

Do not accumulate boolean props like `isPrimary`, `isDisabled`, `isLoading`, `isOutline` on a single component. Each boolean doubles the possible states and creates unmaintainable conditional logic inside the component.

```tsx
// WRONG — boolean soup
<Button isPrimary isLarge isLoading disabled={outOfStock}>
  Add to Cart
</Button>
```

## The Solution

Use composition and explicit variants instead of flags. See `rules/explicit-variants.md`.

```tsx
// CORRECT — intent is clear, no conditionals inside Button
<PrimaryButton size="lg" loading={isSubmitting}>
  Add to Cart
</PrimaryButton>
```

## Ecommerce Context

This will matter immediately for:
- `@commerce/ui` Button (primary, secondary, destructive, ghost)
- ProductCard (featured, compact, out-of-stock)
- Badge (sale, new, low-stock)
- Form inputs (error, disabled, loading states)

Never add a boolean prop to an existing component to handle a new use case. Create a variant instead.
