import React, { useEffect, useState } from "react";
import { fileHomeImage } from "../assets";
import { Button, Stack } from "@mui/material";
import {useNavigate} from 'react-router-dom'
import {
  SettingsOutlined,
  BatchPredictionOutlined,
  HelpOutlineOutlined,
  ChatOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { HomeProductModal } from "../components";
import RemainingDays from "../components/RemainingDays";

const Index = () => {
  const navigate=useNavigate()
  const [load, setLoad] = useState(false);
  const [btnInit, setButtonInit] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [storeBilling, setStoreBilling] = useState({});
  const [modal, setModal] = useState({ visible: false, data: {} });
  const [uploadLoad, setUploadLoad] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const StoreDetail = useSelector((state) => state.StoreSlice.StoreDetail);

  // Fetch billing details
 // Fetch billing details
useEffect(() => {
  const getBilling = async () => {
    if (StoreDetail?.Store_Id) {
      try {
        const response = await fetch(
          `/api/billing/getBilling?StoreId=${StoreDetail.Store_Id}`
        );
        const data = await response.json();
        console.log('paymethome',data)
        console.log('paymenthome', data);
        setStoreBilling(data.StorePayment);
      } catch (error) {
        console.error("Error fetching billing data:", error);
      }
    }
  };

  // Adding a timeout to ensure that StoreDetail is fully loaded
  const timeout = setTimeout(() => {
    getBilling();
  }, 500); // delay of 500ms, adjust as needed

  return () => clearTimeout(timeout); // cleanup
}, [StoreDetail, refresh]);


  // Handle product import
  const onBtnPress = async () => {
    setLoad(true);
    if (!inputValue.trim()) {
      alert("Please enter a valid link.");
      setLoad(false);
      return;
    }

    try {
      const res = await fetch(
        `/api/importProduct?url=${inputValue.trim()}&Shop_id=${StoreDetail.Store_Id}`
      );
      const data = await res.json();

      if (res.status === 200) {
        setModal({ visible: true, data: data.product });
      } else {
        console.error("Error importing product:", data);
      }
    } catch (error) {
      console.error("Import failed:", error);
    } finally {
      setLoad(false);
    }
  };

  // Handle product upload
  const onUpload = () => {
    console.log("Uploading product:", modal.data);
    setUploadLoad(true);
    setUploadLoad(false);
  };

  const btnStyles = {
    backgroundColor: "#4caf50",
    borderRadius: "10px",
    height: "35px",
    padding: "0 15px",
    fontSize: "14px",
    color: "#fff",
    textTransform: "none",
  };

  const onModalClose = () => {
    setModal({ visible: false });
    setRefresh((prev) => !prev);
  };
  const handleNavigate=()=>{
    navigate('/Pricing')
  }

  return (
    <div className="container center">
      <div className="container-sm home-container mt-3">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-black text-2xl font-bold">Products</h1>
          <div className="p-2 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
            <span className="font-medium">Remaining Products: </span>
            <span className="font-bold">
  {storeBilling?.ebayProductNumber === 0
    ? "0"
    : storeBilling?.ebayProductNumber ?? "loading..."}
</span>

          </div>
        </div>

        <div className="center border rounded-xl mt-3 py-24 bg-white text-center">
          <img className="homeImage mb-4" src={fileHomeImage} alt="Home" />

          <article className="text-wrap mb-4">
            <h3 className="font-bold text-black text-center mb-2">
              {btnInit === 1
                ? "Welcome to Shafs Ebay Affiliate Importer!"
                : btnInit === 2
                ? "Copy the Ebay product link"
                : "Import your first Ebay product"}
            </h3>
            <p className="mb-3">
              {btnInit === 1
                ? "Let's start with a quick product tour!"
                : btnInit === 2
                ? "Navigate to Ebay and copy the product link."
                : "Paste the link into the search bar and click import."}
            </p>
          </article>

          {/* Conditionally Render the Import URL Section */}
          {btnInit === 3 && storeBilling?.ebayProductNumber > 0 ? (
            <div className="flex flex-row flex-wrap justify-center">
              <input
                className="border px-2 py-1 rounded-lg border-gray-400 focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={inputValue}
                placeholder="Ebay Import link"
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button
                onClick={onBtnPress}
                sx={{ ...btnStyles, marginLeft: "10px" }}
                variant="contained"
              >
                {load ? "Loading..." : "Import"}
              </Button>
            </div>
          ) : btnInit === 3 && storeBilling?.ebayProductNumber === 0 ? (
            <div className="text-center mt-4">
              <p className="text-red-600 font-semibold mb-2">
                You have reached your product import limit.
              </p>
              <Button sx={btnStyles} onClick={handleNavigate} variant="contained">
                Upgrade Now
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setButtonInit((prev) => prev + 1)}
              sx={btnStyles}
              variant="contained"
            >
              {btnInit === 1 ? "Start" : "Next"}
            </Button>
          )}
        </div>
      </div>

      {/* <footer className="text-center mt-4">
        <span>Email us: </span>
        <a href="mailto:support@reputon.com" className="text-blue-500">
          support@reputon.com
        </a>
      </footer> */}

      {/* Modal for Product Preview */}
      <HomeProductModal
        open={modal.visible}
        title={modal.data?.title || "No Title"}
        des={modal.data?.description || "No Description"}
        price={modal.data?.price || "No Price"}
        image={
          modal?.data?.mainImage ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
        onPrimeAction={onUpload}
        onClose={onModalClose}
        load={uploadLoad}
      />
    </div>
  );
};

export default Index;
