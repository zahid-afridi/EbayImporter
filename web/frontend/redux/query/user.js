import toast from "react-hot-toast";
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

export const uploadApi = (data, id, setLoad, setRefresh) => {
  return async (dispatch) => {
    setLoad({ show: true, id: data._id });
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

          price: data.price,
        }),
      });

      const res = await response.json();
      console.log("upload", res);
      if (response.ok) {
        setLoad({ show: false, id: data._id });
        dispatch(ProductApi(id, setLoad));
        setRefresh((prev) => !prev);
      } else {
        setLoad({ show: false, id: data._id });
        setRefresh(false);
      }
    } catch (error) {
      setLoad({ show: false, id: data._id });
      console.log("upload error:===>", error);
    }
  };
};

export const addToShopify = async (data, setLoad) => {
  // console.log(data);
  setLoad(true);
  try {
    const url = "/api/products/upload";
    const body = JSON.stringify({
      title: data.title,
      description: data.description,
      image_url: data.images,
      ProductId: data._id,
      price: data.price.value,
    });
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON format
      },
      body,
    });
    console.log(body);
    const res = await response.json();
    console.log("upload", res);
    setLoad(false);
    console.log("data.images ===>", data.images);
    if (response.ok) {
      toast.success(res.message);
    }
  } catch (error) {
    setLoad(false);
    console.log(error);
    toast.error("Try again letter");
  }
};
export const deleteApi = (data, setLoad, setRefresh) => {
  return async (dispatch) => {
    setLoad({ show: true, id: data._id });
    try {
      console.log("frontendshopifyd", data.shopifyId);
      const response = await fetch("/api/products/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shopifyId: data.shopifyId,
          productId: data._id,
        }),
      });
      const res = await response.json();
      console.log(res);
      if (response.ok) {
        toast.success(res.message);
        setLoad({ show: false, id: data._id });
        dispatch(ProductApi(data.shopifyId, setLoad));
        setRefresh((prev) => !prev);
      } else {
        setLoad({ show: false, id: data._id });
        setRefresh(false);
        toast.success(res.message);
      }
    } catch (error) {
      setLoad({ show: false, id: data._id });
      console.log("upload error:===>", error);
    }
  };
};
