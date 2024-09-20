import { UpdateStoreDetail } from "../Slices/user/UserStoreSlice";

export const StoreInfo = (load) => {
  return async (dispatch) => {
    try {
      load(true)
      const response = await fetch("/api/store/info");
      const data = await response.json();
      if (response.status == 200) {
        console.log("Sotre data form api ", data);
        dispatch(UpdateStoreDetail(data));
      }
      load(false)
    } catch (error) {
      load(false)
      console.log(error);
    }
  };
};
