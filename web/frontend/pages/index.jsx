import React, { useEffect } from "react";
import { fileHomeImage } from "../assets"; // Ensure correct image path
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
    <div className="container center">
      <div className="container-sm home-container mt-3">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-black text-2xl font-bold">Products</h1>
          <Stack spacing={2} direction="row">
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
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
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
              Welcome to Amazon Product Importer!
            </h3>
            <p className="mb-3">
              Let's start with a quick product tour, and you'll be up and
              running in no time!
            </p>
          </article>
          <Button
            sx={{
              backgroundColor: "#4caf50", // Green color as in the image
              borderRadius: "30px", // Rounded button
              height: "40px",
              padding: "0 25px",
              fontSize: "14px",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#45a049",
              },
            }}
            variant="contained"
          >
            Start
          </Button>
        </div>
      </div>
      <footer className="text-center mt-4">
        <a href="mailto:support@reputon.com" className="text-blue-500">
          Email us: support@reputon.com
        </a>
      </footer>
    </div>
  );
};

export default Index;
