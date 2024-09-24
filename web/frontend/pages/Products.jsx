import React, { useEffect, useState } from "react";
import { horzImg, vertImg } from "../assets";
import { ProductsCard, Spinner } from "../components";
// import { productApi } from "../redux/query/user";
import FlatList from "flatlist-react";

import { useDispatch, useSelector } from "react-redux";
import { ProductApi } from "../redux/query/user";
const Products = () => {
  const dispatch = useDispatch();
  const { productData } = useSelector((state) => state.product);
  console.log("productData", productData);
  const [stl, setStl] = useState(1);
  const [load, setLoad] = useState(true);
  const { StoreDetail } = useSelector((state) => state.StoreSlice);

  useEffect(() => {
    dispatch(ProductApi(StoreDetail.Store_Id, setLoad));
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between px-5 py-4">
        <p>Products</p>
        <div className="flex flex-row gap-2">
          {[
            { id: 1, img: vertImg },
            { id: 2, img: horzImg },
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
      {load ? (
        <Spinner />
      ) : (
        <div className={`flex ${stl == 1 ? "flex-row flex-wrap" : "flex-col"}`}>
          <FlatList
            list={productData}
            renderItem={(e) => <ProductsCard dime={stl} data={e} />}
            renderWhenEmpty={() => <div>List is empty!</div>}
            // sortBy={["firstName", {key: "lastName", descending: true}]}
            // groupBy={person => person.info.age > 18 ? 'Over 18' : 'Under 18'}
          />
        </div>
      )}
    </div>
  );
};

export default Products;
