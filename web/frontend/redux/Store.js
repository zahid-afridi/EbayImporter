import { configureStore } from "@reduxjs/toolkit";
import { StoreSlice } from "./Slices";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ['Auth']
};
const persistedReducer = persistReducer(persistConfig, StoreSlice);
export const store = configureStore({
  reducer: {
    StoreInfo: persistedReducer,
  },
});
export const persistor = persistStore(store);
