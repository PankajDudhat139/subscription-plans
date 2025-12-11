import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isCartOpen: false,
  isModalOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOrIncreaseItem: (state, action) => {
      const { productId, productName, optionLabel, price, image, category } =
        action.payload;
      const id = `${productId}-${category}-${optionLabel}`;
      const existing = state.items.find((i) => i.id === id);
      if (existing) existing.qty += 1;
      else
        state.items.push({
          id,
          productId,
          category,
          productName,
          optionLabel,
          price,
          qty: 1,
          image,
        });

      state.isCartOpen = true;
    },
    increaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.qty++;
    },
    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.qty > 1) item.qty--;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const {
  addOrIncreaseItem,
  increaseQty,
  decreaseQty,
  removeItem,
  toggleCart,
  openModal,
  closeModal,
} = cartSlice.actions;

export const selectCartItems = (s) => s.cart.items;
export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + i.price * i.qty, 0)
);
export const selectIsCartOpen = (s) => s.cart.isCartOpen;
export const selectIsModalOpen = (s) => s.cart.isModalOpen;

export default cartSlice.reducer;
