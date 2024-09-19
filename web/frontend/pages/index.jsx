import React from "react";
import { Typography } from "@mui/material";
import { fileHomeImage } from "../assets";
import { Button } from "@shopify/polaris";

const index = () => {
  return (
    <div className="container center ">
      <div className="container-sm home-container mt-3">
        <h1 className="text-black text-2xl font-bold">Product</h1>
        <div className="center border rounded-xl mt-3">
          <img className="homeImage" src={fileHomeImage} alt="" />
          <article class="text-wrap">
            <h3 className="font-bold text-black text-center mb-2">
              Welcome to Ebay importer
            </h3>
            <p className="mb-5">New Yorkers are facing the winter chill...</p>
          </article>
          <Button variant="tertiary">Add product</Button>;
        </div>
      </div>
    </div>
  );
};

export default index;
