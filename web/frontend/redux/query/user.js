import { UpdateStoreDetail } from "../Slices/user/UserStoreSlice";

export const StoreInfo = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("/api/store/info");
      const data = await response.json();
      if (response.status == 200) {
        console.log("Sotre data form api ", data);
        dispatch(UpdateStoreDetail(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
