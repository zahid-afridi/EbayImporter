import React, { useEffect, useState } from "react";

import { fileHomeImage } from "../assets";
import { Button, Stack } from "@mui/material";
import {
  SettingsOutlined,
  BatchPredictionOutlined,
  HelpOutlineOutlined,
  ChatOutlined,
  TextFields,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";

import { HomeProductModal } from "../components";
import { addToShopify } from "../redux/query/user";
import RemainingDays from "../components/RemainingDays";

const Index = () => {
  const [load, setLoad] = useState(false);
  const [btnInit, setButtonInit] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [modal, setModal] = useState({
    visible: false,
    data: {},
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api/test");
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  const StoreDetail = useSelector((state) => state.StoreSlice.StoreDetail);

  const onBtnPress = async () => {
    setLoad(true);
    if (inputValue == "") {
      alert("empity");
    } else {
      try {
        inputValue.trim();
        const res = await fetch(
          `/api/importProduct?url=${inputValue}&&Shop_id=${StoreDetail.Store_Id}`
        );
        const data = await res.json();
        // console.log("zahid lullu hay", data);
        if (res.status == 200) {
          setLoad(false);

          setModal({ visible: true, data: data.product });
          console.log(data.product);
        }
      } catch (error) {
        setLoad(false);
        console.log(error);
      }
    }
  };

  const btnProp = {
    backgroundColor: "#4caf50",
    borderRadius: "10px",
    height: "30px",
    padding: "0 10px",
    fontSize: "14px",
    color: "#fff",
  };
  const [uploadLoad, setUploadLoad] = useState(false);

  const onUpload = () => {
    // addToShopify(modal.data, setUploadLoad, setInputValue, setModal);
    console.log("modal.data", modal.data);
  };

  return (
    <div className="container center">
      <div className="container-sm home-container mt-3">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-black text-2xl font-bold">Products</h1>
          <Stack className="flex-wrap" spacing={2} direction="row">
            {[
              { name: "Settings", icon: SettingsOutlined },
              { name: "Plans", icon: BatchPredictionOutlined },
              { name: "Support", icon: ChatOutlined },
              { name: "FAQ", icon: HelpOutlineOutlined },
            ].map((item) => (
              <Button
                startIcon={<item.icon />}
                sx={{
                  height: "35px",
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "1px solid #ccc",
                  borderRadius: "20px",
                  padding: "0 10px",
                  textTransform: "none",
                  fontSize: "12px",
                }}
                variant="outlined"
                key={item.name}
              >
                {item.name}
              </Button>
            ))}
          </Stack>
        </div>
        <div className="center border rounded-xl mt-3 py-24 bg-white text-center">

        <RemainingDays/>


          <img className="homeImage mb-4" src={fileHomeImage} alt="Home" />
      

          <article className="text-wrap mb-4">
            <h3 className="font-bold text-black text-center mb-2">
              {btnInit == 1
                ? "Welcome to Shafs Ebay Affiliate Importer!"
                : btnInit == 2
                ? "Copy the Ebay product link"
                : "Import your first Ebay product"}
            </h3>
            <p className="mb-3">
              {btnInit == 1
                ? "Let's start with a quick product tour, and you'll be up and running in no time!"
                : btnInit == 2
                ? "Navigate to Ebay and copy the link of the desired product you wish to sell."
                : "Paste the copied Ebay link into the search bar and click import."}
            </p>
          </article>

          {btnInit == 3 ? (
             <div className="flex flex-row flex-wrap justify-center">
               <input
                 className="border px-1 py-1 rounded-lg border-gray-400 focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                 value={inputValue}
                 placeholder="Ebay Import link"
                 onChange={(e) => setInputValue(e.target.value)}
               />

              

               <Button
                 onClick={onBtnPress}
                 className="bg-green-700"
                 sx={{
                   ...btnProp,
                   marginLeft: "5px",
                 }}
                 variant="contained"
               >
                 {load ? "Loading..." : "import"}
               </Button>
             </div>






//             <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//             <a href="#">
//                 <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Upgrade Required!</h5>
//             </a>
//             <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Please purchase a plan to continue using this app</p>
//             <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300">
//   Upgrade Now
//   <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
//   </svg>
// </a>

//           </div>
            
          ) : (
            <Button
              onClick={() => setButtonInit((pre) => pre + 1)}
              sx={btnProp}
              variant="contained"
            >
              {btnInit == 1 ? "Start" : "next"}
            </Button>
          )}




       

        </div>

      


      </div>

      <footer className="text-center mt-4">
        <span>Email us:</span>
        <a href="mailto:support@reputon.com" className="text-blue-500">
          support@reputon.com
        </a>
      </footer>
      <HomeProductModal
        open={modal.visible}
        title={modal.data?.title || "title"}
        des={modal.data?.description || "description"}
        price={modal.data?.price || "price"}
        image={
          modal?.data?.mainImage ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
        onPrimeAction={onUpload}
        onClose={() => setModal({ visible: false })}
        load={uploadLoad}
      />
    </div>
  );
};

export default Index;
