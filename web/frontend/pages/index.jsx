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

  const onBtnPress = async () => {
    setLoad(true);
    if (inputValue == "") {
      alert("empity");
    } else {
      try {
        inputValue.trim();
        const res = await fetch(`/api/importProduct?url=${inputValue}`);
        const data = await res.json();
        console.log({ res, data });
        if (res.status == 200) {
          setLoad(false);

          setModal({ visible: true, data: data.product.body });
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
          {" "}
          support@reputon.com
        </a>
      </footer>
      <HomeProductModal
        open={modal.visible}
        title={modal.data.title}
        des={modal.data.title}
        price={modal.data.title}
        onClose={() => setModal({ visible: false })}
      />
    </div>
  );
};

export default Index;
