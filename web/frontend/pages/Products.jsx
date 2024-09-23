import React, { useState } from "react";
import { horzImg, vertImg } from "../assets";
const Products = () => {
  const [stl, setStl] = useState(1);
  return (
    <div>
      <div className="flex flex-row justify-between">
        <p>Products</p>
        {[
          { id: 1, img: horzImg },
          { id: 2, img: vertImg },
        ].map((e, i) => (
          <div
            onClick={() => setStl(e.id)}
            style={{
              width: "30",
              backgroundColor: stl == e.id ? "red" : "green",
            }}
          >
            <img src={e.img} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
