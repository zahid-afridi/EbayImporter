import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap//dist/js/bootstrap.bundle.min.js";
import "./style.css";

import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style

import { QueryProvider, PolarisProvider } from "./components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { UpdateStoreDetail } from "./redux/UserStoreSlice";

export default function App() {
  const dispatch = useDispatch();
  const StoreData = useSelector((state) => state.StoreInfo.StoreDetail);
  console.log('Store data form redux',StoreData)

  useEffect(()=>{
if (!StoreData) {
  const StoreInfo=async()=>{
    try {
         const response=await fetch('/api/store/info')
         const data=await response.json()
         if (response.status==200) {
         console.log('Sotre data form api ',data)
         dispatch(UpdateStoreDetail(data));

         }
    } catch (error) {
      console.log(error)
    }
  }
  StoreInfo()
}
  },[])
  const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", {
    eager: true,
  });
  const { t } = useTranslation();

  return (
    <PolarisProvider>
  
        <QueryProvider>
          <NavMenu>
            <a href="/" rel="home" />
            
          </NavMenu>
          <Routes pages={pages} />
        </QueryProvider>
  
    </PolarisProvider>
  );
}
