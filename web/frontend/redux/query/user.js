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

export const ProductApi = (StoreId, load) => {
  return async (dispatch) => {
    try {
      load(true);
      const response = await fetch(
        `/api/products/getProduct?shop_id=${StoreId}`
      );
      const data = await response.json();
      console.log("fetchProduct", data);
      if (response.status === 200) {
        load(false);
        // console.log("Product data form redux", data);
        dispatch(setProductData(data.products));
      }
    } catch (error) {
      load(false);
      console.error(error);
    }
  };
};

export const uploadApi = (data, id, setLoad) => {
  return async (dispatch) => {
    setLoad(true);
    try {
      const response = await fetch("/api/products/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify JSON format
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          image_url: data.image_url,
          ProductId: data._id,
          price: data.price,
        }),
      });

      const res = await response.json();
      console.log("upload", res);
      if (response.ok) {
        setLoad(false);
        dispatch(ProductApi(id, setLoad));
      }
    } catch (error) {
      setLoad(false);
      console.log("upload error:===>", error);
    }
  };
};

export const deleteApi = (shopifyId, productId, setLoad) => {
  return async (dispatch) => {
    setLoad(true);
    try {
      const response = await fetch("/api/products/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Specify JSON format
        },
        body: JSON.stringify({
          shopifyId,
          productId,
        }),
      });

      const res = await response.json();
      console.log("delete", res);
      if (response.ok) {
        setLoad(false);
        dispatch(ProductApi(shopifyId, setLoad));
      }
    } catch (error) {
      setLoad(false);
      console.log("upload error:===>", error);
    }
  };
};
