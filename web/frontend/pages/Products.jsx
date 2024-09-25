import FlatList from "flatlist-react";
import { useDispatch, useSelector } from "react-redux";
import { HomeProductModal, ProductsCard, Spinner } from "../components";
import { deleteApi, ProductApi, uploadApi } from "../redux/query/user";
import React, { useEffect, useState } from "react";

const Products = () => {
  const dispatch = useDispatch();
  const { productData } = useSelector((state) => state.product);
  const { StoreDetail } = useSelector((state) => state.StoreSlice);
  const [load, setLoad] = useState(false);
  const [uploadLoad, setUploadLoad] = useState(false);
  const [modal, setModal] = useState({
    visible: false,
    data: {},
  });
  useEffect(() => {
    dispatch(ProductApi(StoreDetail.Store_Id, setLoad));
  }, []);

  const onUpload = (data) => {
    dispatch(uploadApi(data, StoreDetail.Store_Id, setLoad));
  };
  const onDelete = (data) => {
    dispatch(deleteApi(data.shopifyId, setUploadLoad));
  };
  console.log(productData);
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
                renderItem={(e, i) => (
                  <ProductsCard
                    key={i}
                    data={e}
                    onUpload={() => onUpload(e)}
                    uploadLoad={uploadLoad}
                    onDelete={() => onDelete(e)}
                  />
                )}
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
      <HomeProductModal
        open={modal.visible}
        title={modal.data?.title || "title"}
        des={modal.data?.description || "description"}
        price={modal.data?.price?.value || "price"}
        image={
          modal.data?.mainImage ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
        onClose={() => setModal({ visible: false })}
      />
    </div>
  );
};

export default Products;
