import { setProductData } from "../Slices/user/productStoreSlice";
import { UpdateStoreDetail } from "../Slices/user/UserStoreSlice";

export const StoreInfo = (load) => {
  return async (dispatch) => {
    try {
      load(true);
      const response = await fetch("/api/store/info");
      const data = await response.json();
      if (response.status === 200) {
        console.log("Store data from API", data);
        dispatch(UpdateStoreDetail(data)); // Dispatching action to update store
      }
      load(false);
    } catch (error) {
      load(false);
      console.error(error);
    }
  };
};
export const ProductApi = (StoreId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `/api/products/getProduct?shop_id=${StoreId}`
      );
      const data = await response.json();
      if (response.status === 200) {
        // console.log("Product data form redux", data);
        dispatch(setProductData(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
