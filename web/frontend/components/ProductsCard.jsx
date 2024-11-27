import { useState } from "react";
import toast from "react-hot-toast";

const ProductsCard = ({
  data,
  onView,
  onUpload,
  onDelete,
  uploadLoad,
  DeleteLoad,
}) => {
  console.log('data', data);
  const [inputUrl, setInputUrl] = useState(data.product_url || "");
  const [isUpdating, setIsUpdating] = useState(false); // Track loading state for URL update

  // Function to handle URL input change
  const handleUrlChange = (e) => {
    setInputUrl(e.target.value);
  };

  // Function to handle the update button click
  const handleUrlUpdate = async () => {
    console.log('productId', data._id);  // Ensure this prints the correct product ID
    console.log('inputUrl', inputUrl);

    setIsUpdating(true);  // Set loading state to true

    try {
      const response = await fetch('/api/products/update_url', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Always include Content-Type for JSON requests
        },
        body: JSON.stringify({
          productId: data._id,  // Ensure productId is being sent correctly
          productUrl: inputUrl,  // Use inputUrl for the updated URL
        }),
      });

      const result = await response.json();
      console.log('updateUrl data', result);

      if (response.ok) {
        toast.success(result.message);  // Show success toast message
      } else {
        toast.error('Something went wrong');  // Show error toast message
      }
    } catch (error) {
      console.log('updaterul error', error); // Log any network or other errors
      toast.error('An error occurred while updating the URL');  // Show error toast on failure
    } finally {
      setIsUpdating(false);  // Reset loading state after the operation completes
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      <td className="py-3 px-4 border-b">
        <img
          src={data?.image_url[0]}
          alt={data?.title}
          className="w-20 h-20 object-cover rounded border border-gray-300"
        />
      </td>
      <td className="py-3 px-4 border-b text-gray-800 font-medium text-sm">
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
              {uploadLoad.id === data._id && uploadLoad.show
                ? "Uploading..."
                : "Upload"}
            </button>
          )}
          <button
            className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition duration-200 shadow hover:shadow-lg text-sm"
            onClick={onDelete}
            disabled={uploadLoad.show}
          >
            {DeleteLoad.id === data._id && DeleteLoad.show
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>

        {/* Product URL Section */}
        <div className="mt-4">
          <input
            type="text"
            value={inputUrl}
            onChange={handleUrlChange}
            className="p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter Product URL"
          />
          <button
            onClick={handleUrlUpdate}
            className="bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 transition duration-200 mt-2 w-full"
            disabled={isUpdating}  // Disable the button while updating
          >
            {isUpdating ? "Updating..." : "Update URL"}  {/* Show loading text */}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductsCard;
