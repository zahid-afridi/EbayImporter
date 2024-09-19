import React, { useEffect } from "react";
import { fileHomeImage } from "../assets";
import { Button } from "@shopify/polaris";

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
        <h1 className="text-black text-2xl font-bold">Product</h1>
        <div className="center border rounded-xl mt-3 py-24 bg-white">
          <img className="homeImage" src={fileHomeImage} alt="" />
          <article class="text-wrap">
            <h3 className="font-bold text-black text-center mb-2">
              Welcome to Ebay importer
            </h3>
            <p className="mb-5">New Yorkers are facing the winter chill...</p>
          </article>
          <Button tone="critical" className="bg-green-600" size="micro">
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
