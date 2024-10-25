import { NavMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap//dist/js/bootstrap.bundle.min.js";
import "./style.css";

import "@fontsource/poppins";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/400-italic.css";

import { QueryProvider, PolarisProvider, Spinner } from "./components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreInfo } from "./redux/query/user";
import { Toaster } from 'react-hot-toast';

const App = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  // Ensure you are accessing the correct state property
  const {StoreDetail} = useSelector((state) => state.StoreSlice);

  useEffect(() => {
    if (!StoreDetail) {
      dispatch(StoreInfo(setLoad));
    }
  }, [dispatch]);
  const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", {
    eager: true,
  });

  return load ? (
    <Spinner />
  ) : (
    <PolarisProvider>
      <Toaster/>
      <QueryProvider>
        <NavMenu>
          <a href="/" rel="home" />
          <a href="/Products">{"Products"}</a>
          <a href="/Blog">{"Blog"}</a>
          <a href="/Pricing">{"Pricing"}</a>
          <a href="/UploadCsv">{"Upload Csv"}</a>
        </NavMenu>
        <Routes pages={pages} />
      </QueryProvider>
    </PolarisProvider>
  );
};

export default App;
