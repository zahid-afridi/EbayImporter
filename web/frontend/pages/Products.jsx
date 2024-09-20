import React, { useState } from "react";
import { ReorderOutlinedIcon, MenuOutlinedIcon } from "@mui/icons-material";
const Products = () => {
  const [stl, setStl] = useState(1);
  return (
    <div>
      <div className="flex flex-row justify-between">
        <p>Products</p>
        {[{ id: 1 }, { id: 2 }].map((e) => (
          <ReorderOutlinedIcon key={e.id} onClick={() => setStl(e.id)} />
        ))}
      </div>
    </div>
  );
};

export default Products;
