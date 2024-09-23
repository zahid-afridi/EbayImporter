import React, { useEffect, useState } from "react";
import { horzImg, vertImg } from "../assets";
import { ProductsCard } from "../components";
// import { productApi } from "../redux/query/user";
import { ProductApi } from "../redux/query/user";
import { useDispatch, useSelector } from "react-redux";
const Products = () => {
  const dispatch = useDispatch();
  const { productData } = useSelector((state) => state.product);
  const [stl, setStl] = useState(1);
  console.log({ productData });
  const [load, setLoad] = useState(true);
  const StoreDetail = useSelector((state) => state.StoreSlice.StoreDetail);

  useEffect(() => {
    dispatch(ProductApi(setLoad));
  }, []);

  useEffect(()=>{
const getProduct=async()=>{
  try {
    const response = await fetch(`/api/products/getProduct?shop_id=${StoreDetail.Store_Id}`);
      const data = await response.json();
       console.log('MYProducts',data)
  } catch (error) {
    console.log(error)
  }
}
getProduct()
  },[])

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
      {[].map((e, i) => (
        <ProductsCard key={i} dime={stl} data={e} />
      ))}
    </div>
  );
};

export default Products;

