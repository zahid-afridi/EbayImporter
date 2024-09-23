import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductData: (state, action) => {
      state.productData = action.payload;
    },
  },
});

export const { setProductData } = productSlice.actions;
export default productSlice.reducer;
