import { createSlice } from '@reduxjs/toolkit'
import products from './product.json'

function sortItems(items) {
  const shops = {};
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
  },
  reducers: {},
})

export default shopSlice.reducer