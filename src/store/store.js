import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// ---- Load cart state from localStorage ----
const loadCartFromLocalStorage = () => {
  try {
    const savedState = localStorage.getItem("cartState");
    if (savedState === null) return undefined;
    return JSON.parse(savedState);
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return undefined;
  }
};

// ---- Save cart state to localStorage ----
const saveCartToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartState", serializedState);
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

// Initialize store with persisted state (if available)
const persistedState = {
  cart: loadCartFromLocalStorage(),
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: persistedState,
});

// ---- Subscribe to store updates ----
store.subscribe(() => {
  const state = store.getState();
  saveCartToLocalStorage(state.cart);
});
