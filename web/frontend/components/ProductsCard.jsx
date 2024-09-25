import React, { useState } from "react";

const ProductsCard = ({ data, onView, onUpload,onDelete }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      <td className="py-3 px-4 border-b">
        <img
          src={data?.image_url[0]}
          alt={data?.title}
          className="w-20 h-20 object-cover rounded border border-gray-300"
        />
      </td>
      <td className="py-3 px-4 border-b text-gray-800 font-medium text-sm ">
        {data?.title}
      </td>
      <td className="py-3 px-4 border-b text-green-600 font-bold text-sm">
        {data?.price}
      </td>
      <td className="py-3 px-4 border-b">
        <div className="flex space-x-2">
          <button
            className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition duration-200 shadow hover:shadow-lg text-sm"
            onClick={onView}
          >
            View
          </button>
          {!data?.inShopify && (
            <button
              className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition duration-200 shadow hover:shadow-lg text-sm"
              onClick={onUpload}
            >
              Upload
            </button>
          )}

          <button
            className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition duration-200 shadow hover:shadow-lg text-sm"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductsCard;
