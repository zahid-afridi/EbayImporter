import React, { useEffect } from "react";
import { fileHomeImage } from "../assets";
import { ButtonGroup } from "@shopify/polaris";
import { Button, Stack } from "@mui/material";
import {
  SettingsOutlined,
  BatchPredictionOutlined,
  HelpOutlineOutlined,
  ChatOutlined,
} from "@mui/icons-material";
const Index = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/test");
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container center ">
      <div className="container-sm home-container mt-3">
        <div className="flex flex-row justify-between">
          <h1 className="text-black text-2xl font-bold">Product</h1>
          <Stack spacing={2} direction="row">
            {[
              { name: "setting", icon: SettingsOutlined },
              { name: "plan", icon: BatchPredictionOutlined },
              { name: "Support", icon: ChatOutlined },
              { name: "FAQs", icon: HelpOutlineOutlined },
            ].map((item) => (
              <Button
                startIcon={<item.icon fontSize="10" />}
                className="h-7 bg-white text-black border-black text-xs p-2"
                variant="outlined"
                key={item.name}
              >
                {item.name}
              </Button>
            ))}
          </Stack>
        </div>
        <div className="center border rounded-xl mt-3 py-24 bg-white">
          <img className="homeImage" src={fileHomeImage} alt="" />
          <article className="text-wrap">
            <h3 className="font-bold text-black text-center mb-2 ">
              Welcome to Ebay importer
            </h3>
            <p className="mb-3">New Yorkers are facing the winter chill...</p>
          </article>
          <Button className="h-7" color="success" variant="contained">
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
