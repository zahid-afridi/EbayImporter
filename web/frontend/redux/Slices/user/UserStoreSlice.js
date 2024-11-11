import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  StoreDetail: null,
  ebayProduct:0,
  csvProduct:0,
};

export const StoreSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    UpdateStoreDetail: (state, action) => {
      state.StoreDetail = action.payload;
    },
    updateEbayProduct:(state,action)=>{
      state.ebayProduct=action.payload
  },
  updateCsvProduct:(state,action)=>{
      state.csvProduct=action.payload
  }
  },
});

export const { UpdateStoreDetail,updateEbayProduct,updateCsvProduct } = StoreSlice.actions;
export default StoreSlice.reducer;
