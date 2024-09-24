import FlatList from "flatlist-react";
import { useDispatch, useSelector } from "react-redux";
import { ProductsCard, Spinner } from "../components";
import { ProductApi } from "../redux/query/user";
import React, { useEffect, useState } from "react";

const Products = () => {
  const dispatch = useDispatch();
  const { productData } = useSelector((state) => state.product);
  const { StoreDetail } = useSelector((state) => state.StoreSlice);
  const [load, setLoad] = useState(false);
  console.log("StoreDetail.Store_Id ==>", productData);
  useEffect(() => {
    dispatch(ProductApi(StoreDetail.Store_Id, setLoad));
  }, []);
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl mb-2 text-gray-800">Product Table</h1>
      {load ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                {["Image", "Title", "Price", "Actions"].map((e) => (
                  <th
                    key={e}
                    className="py-2 px-4 border-b text-left text-gray-600 text-sm"
                  >
                    {e}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <FlatList
                list={productData}
                renderItem={(e, i) => <ProductsCard key={i} data={e} />}
                renderWhenEmpty={() => (
                  <tr>
                    <td className="text-center py-10" colSpan="4">
                      List is empty!
                    </td>
                  </tr>
                )}
              />
            </tbody>
          </table>
        </div>
      )}

      <h2 className="text-lg font-semibold mt-6 text-center text-gray-700">
        Manage Your Products Efficiently
      </h2>
    </div>
  );
};

export default Products;
