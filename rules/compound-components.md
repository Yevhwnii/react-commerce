# Use Compound Components

**Impact:** HIGH
**Category:** Component Architecture

## The Problem

Monolithic components that accept render props and boolean flags to control layout become impossible to extend.

```tsx
// WRONG — tightly coupled, inflexible
<CheckoutForm
  showShipping
  showBilling
  showSummary
  renderFooter={() => <PlaceOrderButton />}
/>
```

## The Solution

Use React Context to share state across subcomponents. Export the parent and its parts as a namespace.

```tsx
// CORRECT — consumer controls the layout
<Cart.Provider>
  <Cart.Header />
  <Cart.ItemList />
  <Cart.Summary />
  <Cart.Checkout />
</Cart.Provider>
```

Each subcomponent accesses shared state via context, not props. The provider owns all state and actions.

## Implementation Pattern

```tsx
// packages/ui/src/Cart/index.tsx
const CartContext = createContext<CartContextValue | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  // state lives here
  return <CartContext.Provider value={...}>{children}</CartContext.Provider>;
};

const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

// subcomponents consume useCart() directly
const CartSummary = () => {
  const { state } = useCart();
  return <div>Total: {state.total}</div>;
};

export const Cart = Object.assign(CartProvider, {
  Header: CartHeader,
  ItemList: CartItemList,
  Summary: CartSummary,
  Checkout: CartCheckout,
});
```

## Ecommerce Context

Use this pattern for:
- `Cart` — header, item list, summary, checkout CTA
- `ProductDetail` — gallery, info, variants, add-to-cart
- `CheckoutForm` — shipping, billing, payment, order summary
- `AdminDataTable` — toolbar, filters, rows, pagination
