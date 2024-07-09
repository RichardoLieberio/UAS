import { createSlice } from '@reduxjs/toolkit'
import products from './product.json'

function sortItems(items) {
  let shops = {};
  items.forEach(item => {
    if (shops[item.shop.id]) {
      shops[item.shop.id].items.push(item);
    } else {
      shops[item.shop.id] = {
        name: item.shop.name,
        items: [item],
      };
    }
  });
  return shops;
}

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: products,
    shops: sortItems(products),
    cart: {total: 0},
  },
  reducers: {
    addToCart(state, action) {
      if (state.cart[action.payload.id]) {
        state.cart[action.payload.id].count += 1;
      } else {
        state.cart[action.payload.id] = {... action.payload, count: 1};
      }
      state.cart.total += 1;
    }
  },
})

export const { addToCart } = productSlice.actions

export default productSlice.reducer