// ------------------------------------------------------------------
//  CartContext
//  A very simple shopping cart.
//
//  The cart is an array of book objects with an extra "quantity".
//  It is saved in localStorage, so no cart table is needed in
//  MySQL and the cart survives a page refresh.
//
//  localStorage works like a small cupboard inside the browser: we
//  put the cart in as a STRING (JSON.stringify) and take it back out
//  as an OBJECT (JSON.parse).
// ------------------------------------------------------------------
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'bookstore_cart';

export function CartProvider({ children }) {
  // Load the saved cart on first render.
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  // Every time the cart changes, save it back to localStorage.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Add a book. If it is already in the cart, just increase quantity.
  const addToCart = (book) => {
    setCart((prev) => {
      const alreadyThere = prev.find((item) => item.id === book.id);
      if (alreadyThere) {
        return prev.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  // Take a book completely out of the cart.
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Quantity +1, but never goes below 1.
  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Quantity -1. At 1 the item is removed instead.
  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  // Derived values, recalculated automatically from the cart.
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * Number(item.price),
    0
  );

  // useMemo avoids recalculating on every render for no reason.
  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [cart, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
