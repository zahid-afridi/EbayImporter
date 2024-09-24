import React from 'react';

const products = [
  { id: 1, title: 'Product 1', img: 'https://via.placeholder.com/150', price: '$20' },
  { id: 2, title: 'Product 2', img: 'https://via.placeholder.com/150', price: '$30' },
  { id: 3, title: 'Product 3', img: 'https://via.placeholder.com/150', price: '$40' },
];

export default function Products() {
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl  mb-2  text-gray-800">Product Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left text-gray-600 text-sm">Image</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 text-sm">Title</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 text-sm">Price</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="py-3 px-4 border-b">
                  <img src={product.img} alt={product.title} className="w-20 h-20 object-cover rounded border border-gray-300" />
                </td>
                <td className="py-3 px-4 border-b text-gray-800 font-medium text-sm">{product.title}</td>
                <td className="py-3 px-4 border-b text-green-600 font-bold text-sm">{product.price}</td>
                <td className="py-3 px-4 border-b">
                  <div className="flex space-x-2">
                    <button
                      className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition duration-200 shadow hover:shadow-lg text-sm"
                      onClick={() => alert(`Upload for ${product.title}`)}
                    >
                      Upload
                    </button>
                    <button
                      className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition duration-200 shadow hover:shadow-lg text-sm"
                      onClick={() => alert(`Delete ${product.title}`)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="text-lg font-semibold mt-6 text-center text-gray-700">Manage Your Products Efficiently</h2>
    </div>
  );
}
