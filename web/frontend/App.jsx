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
import toast, { Toaster } from 'react-hot-toast';
import { updateCsvProduct, updateEbayProduct } from "./redux/Slices/user/UserStoreSlice";

const App = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  // Ensure you are accessing the correct state property
  const StoreDetail = useSelector((state) => state.StoreSlice);


  const getParamsFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    const paramObj = {};
    for (const [key, value] of params.entries()) {
      paramObj[key] = value;
    }
    return paramObj;
  };
  useEffect(() => {
    const FetchData = async () => {
      try {
        setLoad(true);
  
        const urlParams = getParamsFromURL();
        const chargeId = urlParams.charge_id;
        console.log("chargeId:", chargeId);
        console.log("ebay:", StoreDetail?.ebayProduct);
        console.log("csvProduct:", StoreDetail?.csvProduct);
        console.log("storeId:", StoreDetail?.StoreDetail?.Store_Id);
  
        // If `chargeId` is present, call the billing API
        if (chargeId && StoreDetail?.StoreDetail?.Store_Id) {
          try {
            const response = await fetch(
              `/api/billing/GetPayment?ChargeId=${chargeId}&StoreId=${StoreDetail?.StoreDetail?.Store_Id}&ebayproduct=${StoreDetail?.ebayProduct}&CsvProduct=${StoreDetail?.csvProduct}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
  
            if (!response.ok) {
              toast.error("Failed to fetch payment details");
            } else {
              const data = await response.json();
              console.log("Api_Billing:", data);
              toast.success("Payment Success");
              // Reset product quantities after successful API call
              dispatch(updateEbayProduct(0));
              dispatch(updateCsvProduct(0));
            }
          } catch (error) {
            console.error("Error fetching billing data:", error);
            toast.error("Error fetching billing details");
          }
        }
  
        // Always fetch store information, even if `chargeId` is not present
        dispatch(StoreInfo(setLoad));
      } catch (error) {
        console.error("API Fetch Error:", error);
      } finally {
        setLoad(false);
      }
    };
  
    FetchData();
  }, [dispatch, StoreDetail?.StoreDetail?.Store_Id]);
  
  

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
          <a href="/UploadCsv">{"Upload Csv"}</a>
          <a href="/Blog">{"Blog"}</a>
          <a href="/Products">{"Products"}</a>
          <a href="/Pricing">{"Pricing"}</a>
        </NavMenu>
        <Routes pages={pages} />
      </QueryProvider>
    </PolarisProvider>
  );
};

export default App;
