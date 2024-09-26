import FlatList from "flatlist-react";
import { useDispatch, useSelector } from "react-redux";
import { HomeProductModal, ProductsCard, Spinner } from "../components";
import {
  addToShopify,
  deleteApi,
  ProductApi,
  uploadApi,
} from "../redux/query/user";
import React, { useEffect, useState } from "react";

const Products = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [modalLoad, setModalLoad] = useState(false);
  const { productData } = useSelector((state) => state.product);
  const { StoreDetail } = useSelector((state) => state.StoreSlice);
  const [modal, setModal] = useState({ visible: false, data: {} });
  const [uploadLoad, setUploadLoad] = useState({ show: false, id: null });
  const [DeleteLoad, setDeleteLoad] = useState({ show: false, id: null });

  useEffect(() => {
    dispatch(ProductApi(StoreDetail.Store_Id, setLoad));
  }, [refresh]);

  const [inputValue, setInputValue] = useState("");
  const modalUpload = (data) => {
    addToShopify(modal.data, setUploadLoad, setInputValue, setModal);
  };

  const onUpload = (data) => {
    dispatch(uploadApi(data, StoreDetail.Store_Id, setUploadLoad, setRefresh));
  };
  const onDelete = (data) => {
    dispatch(deleteApi(data, setDeleteLoad, setRefresh));
    /*
    setDeleteLoad({ show: true, id: data._id });
    setTimeout(() => {
    setDeleteLoad({ show: false, id: null });
    }, 2000);
    console.log(DeleteLoad);
    */
  };
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
              {productData.length === 0 ? (
                <tr>
                  <td className="text-center py-10" colSpan="4">
                    List is empty!
                  </td>
                </tr>
              ) : (
                productData.map((e, i) => (
                  <ProductsCard
                    key={i}
                    data={e}
                    onUpload={() => onUpload(e)}
                    uploadLoad={uploadLoad}
                    DeleteLoad={DeleteLoad}
                    onDelete={() => onDelete(e)}
                    onView={() => setModal({ visible: true, data: e })}
                  />
                ))
              )}
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
        des={modal.data?.description}
        price={modal.data?.price || "price"}
        image={
          // modal.data?.image_url[0] ||
          // "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          "https://i.ebayimg.com/images/g/zb0AAOSw-hFm8NdO/s-l1600.webp"
        }
        noBtn
        // noBtn={modal.data?.inShopify}
        // onPrimeAction={modalUpload}
        // load={modalLoad}
        onClose={() => setModal({ visible: false })}
      />
    </div>
  );
};

export default Products;
