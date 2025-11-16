import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Each item: { name, image, description, cost, quantity }
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existing = state.items.find((item) => item.name === newItem.name);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    // Remove an item from the cart by its name.
    // Accepts either a plain string (item name) or an object { name }.
    removeItem: (state, action) => {
      const nameToRemove =
        typeof action.payload === 'string' ? action.payload : action.payload.name;
      state.items = state.items.filter((item) => item.name !== nameToRemove);
    },
    // Update the quantity of a specific cart item.
    // Expects payload: { name, amount } where `amount` is the new quantity.
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;
      const item = state.items.find((i) => i.name === name);
      if (!item) return; // No matching item – nothing to do

      if (amount > 0) {
        item.quantity = amount;
      } else {
        // If the new amount is 0 or negative, remove the item from the cart
        state.items = state.items.filter((i) => i.name !== name);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
