# Lift State into Provider Components

**Impact:** HIGH
**Category:** State Management

## The Problem

State trapped inside a single component is inaccessible to siblings and forces awkward workarounds.

```tsx
// WRONG — cart state is stuck inside CartIcon, unreachable from CartDrawer
const CartIcon = () => {
  const [items, setItems] = useState([]);
  // CartDrawer can't access `items` without prop drilling or refs
};
```

## The Solution

Move state into a dedicated provider. Any component inside the provider can access state and actions — regardless of visual nesting.

```tsx
// CORRECT
const CartProvider = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const addItem = (item: CartItem) => setItems(prev => [...prev, item]);
  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  return (
    <CartContext.Provider value={{ state: { items }, actions: { addItem, removeItem } }}>
      {children}
    </CartContext.Provider>
  );
};

// In layout — both CartIcon and CartDrawer can now access cart state
<CartProvider>
  <Header>
    <CartIcon />   {/* reads item count */}
  </Header>
  <CartDrawer />   {/* reads items, calls removeItem */}
  <ProductPage />  {/* calls addItem */}
</CartProvider>
```

## Key Insight

Components that share state don't have to be visually nested inside each other — they just need to be within the same provider.

## Ecommerce Context

Lift these state slices into providers from the start:
- **CartProvider** — items, totals, add/remove/update actions
- **AuthProvider** — current user, login/logout
- **WishlistProvider** — saved items
- **CheckoutProvider** — multi-step form state, shipping/billing/payment

Place providers in `apps/client/src/providers/` and wrap them in the root layout (`app/layout.tsx`).
