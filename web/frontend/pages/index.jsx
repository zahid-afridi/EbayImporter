import React, { useEffect } from "react";
import { fileHomeImage } from "../assets";
import { Button } from "@shopify/polaris";

const Index = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/test');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-black text-3xl font-bold mb-4">Product</h1>
        
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <img 
            className="w-full h-48 object-cover" 
            src={fileHomeImage} 
            alt="Home"
          />
          
          <div className="p-4">
            <h3 className="font-bold text-xl text-gray-800 text-center mb-3">
              Welcome to Ebay Importer
            </h3>
            <p className="text-gray-600 mb-4">
              New Yorkers are facing the winter chill...
            </p>
            <div className="text-center">
              <Button primary>Add Product</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
