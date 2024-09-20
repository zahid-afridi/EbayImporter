import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  StoreDetail: null,
};

export const StoreSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    UpdateStoreDetail: (state, action) => {
      state.StoreDetail = action.payload;
    },
  },
});

export const { UpdateStoreDetail } = StoreSlice.actions;
export default StoreSlice.reducer;
