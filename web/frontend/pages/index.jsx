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
import { HomeProductModal } from "../components";

const Index = () => {
  const [btnInit, setButtonInit] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [modal, setModal] = useState({
    visible: true,
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

  const onBtnPress = async () => {
    if (inputValue == "") {
      alert("empity");
    } else {
      try {
        const response = await fetch(`/api/importProduct?url=${inputValue}`);
        const data = await response.json();
        console.log("product data", data);
      } catch (error) {
        console.log(error);
      }
    }

    console.log({ inputValue });
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
          <img className="homeImage mb-4" src={fileHomeImage} alt="Home" />
          <article className="text-wrap mb-4">
            <h3 className="font-bold text-black text-center mb-2">
              {btnInit == 1
                ? "Welcome to Ebay Product Importer!"
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
            <div className="flex flex-row items-center flex-wrap">
              <input
                value={inputValue}
                placeholder="Ebay Import link"
                onChange={(e) => setInputValue(e.target.value)}
              />

              <Button
                onClick={onBtnPress}
                className="bg-green-700"
                sx={{
                  backgroundColor: "#4caf50",
                  borderRadius: "10px",
                  height: "30px",
                  padding: "0 10px",
                  fontSize: "14px",
                  color: "#fff",
                  marginLeft: "5px",
                }}
                variant="contained"
              >
                import
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setButtonInit((pre) => pre + 1)}
              sx={{
                backgroundColor: "#4caf50",
                borderRadius: "10px",
                height: "30px",
                padding: "0 10px",
                fontSize: "14px",
                color: "#fff",
              }}
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
          {" "}
          support@reputon.com
        </a>
      </footer>
      <Button onClick={() => setModal({ visible: true })}>open</Button>
      <HomeProductModal
        open={modal.visible}
        title={"title"}
        des={
          "Use Instagram posts to share your products with millions ofpeople. Let shoppers buy from your store without leavingInstagram."
        }
        price={"200"}
        onClose={() => setModal({ visible: false })}
      />
    </div>
  );
};

export default Index;
