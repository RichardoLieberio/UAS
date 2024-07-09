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

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    items: products,
    shops: sortItems(products),
    cart: {total: 0},
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      if (state.cart[product.shop.id] && state.cart[product.shop.id].items[product.id]) {
        state.cart[product.shop.id].items[product.id].count += 1;
      } else if (state.cart[product.shop.id]) {
        state.cart[product.shop.id].items[product.id] = {... product, count: 1};
      } else {
        state.cart[product.shop.id] = {name: product.shop.name, items: {[product.id]: {... product, count: 1}}};
      }
      state.cart.total += 1;
    }
  },
})

export const { addToCart } = shopSlice.actions

export default shopSlice.reducer