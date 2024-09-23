import React, { useState } from "react";
import { ReorderOutlined, MenuOutlined } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
const Products = () => {
  const [stl, setStl] = useState(1);
  return (
    <div>
      <div className="flex flex-row justify-between">
        <p>Products</p>
        {[{ id: 1 }, { id: 2 }].map((e, i) => (
          <ReorderOutlined key={i} onClick={() => setStl(e.id)} />
        ))}
      </div>
    </div>
  );
};

export default Products;
