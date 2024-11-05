import { combineReducers } from "@reduxjs/toolkit";
import StoreSlice from "../Slices/user/UserStoreSlice"; // Ensure this is the default export
import productSlice from "../Slices/user/productStoreSlice"; // Ensure this is the default export
import  BlogsSlice  from "../Slices/BlogsSlice/BlogSlice";


const rootReducer = combineReducers({
  StoreSlice, // Use the same key that you are referring to in the store
  product: productSlice,
  blogs:BlogsSlice
});

export { rootReducer };
