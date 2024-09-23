import React, { useEffect, useState } from "react";
import { horzImg, vertImg } from "../assets";
import { ProductsCard } from "../components";
// import { productApi } from "../redux/query/user";

import { useDispatch, useSelector } from "react-redux";
import { ProductApi } from "../redux/query/user";
const Products = () => {
  const dispatch = useDispatch();
  const { productData } = useSelector((state) => state.product);
  const [stl, setStl] = useState(1);
  console.log({ productData });
  const [load, setLoad] = useState(true);
  const { StoreDetail } = useSelector((state) => state.StoreSlice);

  useEffect(() => {
    dispatch(ProductApi(StoreDetail.Store_Id));
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between px-5 py-4">
        <p>Products</p>
        <div className="flex flex-row gap-2">
          {[
            { id: 1, img: horzImg },
            { id: 2, img: vertImg },
          ].map((e, i) => (
            <div
              key={i}
              onClick={() => setStl(e.id)}
              style={{
                width: "30px",
                border: "1px solid",
                padding: "3px",
                borderColor: stl === e.id ? "black" : "grey",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              <img style={{ width: "100%", height: "100%" }} src={e.img} />
            </div>
          ))}
        </div>
      </div>
      {[
        {
          title: "regatta",
          price: {
            value: 100,
            currency: "USD",
          },
          description:
            "European Linen Blend Wide Leg Linen Co-ordinate Pant in Olive/white Contrast Top Stitching OliveRegattaEuropean Linen Blend Wide Leg Linen Co-ordinate Pant in Olive/white Contrast Top Stitching Olive... pants will be a staple in your wardrobe. The classic design creates a versatile and timeless look that can be dressed up or down. The fabric ... Quality fabric Solid ; Ankle Length ; Relaxed ; Mid Waist ; 55% European Linen, ...",
          image:
            "https://cdn.fantasticpestscontrol.com.au/wp-content/uploads/2017/04/house_mouse.jpg",
        },
      ].map((e, i) => (
        <ProductsCard key={i} dime={stl} data={e} />
      ))}
    </div>
  );
};

export default Products;
