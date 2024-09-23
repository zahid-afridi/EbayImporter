import { combineReducers } from "@reduxjs/toolkit";
import { productSlice } from "../Slices/user/productStoreSlice";
import { StoreSlice } from "../Slices/user/UserStoreSlice";

const rootReducer = combineReducers({
  StoreSlice: StoreSlice.reducer,
  product: productSlice.reducer,
});

export { rootReducer };
