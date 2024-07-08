import { createSlice } from '@reduxjs/toolkit'
import products from './product.json'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: products,
  },
  reducers: {},
})

// export const {} = productSlice.actions

export default productSlice.reducer