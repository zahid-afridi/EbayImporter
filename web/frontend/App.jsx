import { NavMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap//dist/js/bootstrap.bundle.min.js";
import "./style.css";

import "@fontsource/poppins";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/400-italic.css";

import { QueryProvider, PolarisProvider } from "./components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreInfo } from "./redux/query/user";

export default function App() {
  const dispatch = useDispatch();
  const StoreData = useSelector((state) => state.StoreInfo.StoreDetail);
  console.log("Store data form redux", StoreData);

  useEffect(() => {
    if (!StoreData) {
      dispatch(StoreInfo());
    }
  }, []);
  const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", {
    eager: true,
  });

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
