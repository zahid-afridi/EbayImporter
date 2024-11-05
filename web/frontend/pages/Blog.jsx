import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BlogFetchApi } from '../redux/query/blog';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';

export default function Blog() {
  const dispatch = useDispatch();
  const [blog, setBlog] = useState([]);
  const [soldBlogIds, setSoldBlogIds] = useState(new Set());
  const [loading, setLoading] = useState(true); // Step 1: Create loading state
  const StoreDetail = useSelector((state) => state.StoreSlice.StoreDetail);
  const [refresh,setRefresh]=useState(false)
  console.log('StoreDetail', StoreDetail.Store_Id);

  useEffect(() => {
    const fetchData = async () => {
      await GetBlogs();
      await GetSoldBlogs();
      setLoading(false); // Step 3: Set loading to false after data is fetched
    };
    
    fetchData();
  }, [refresh]);

  const GetBlogs = async () => {
    console.log('Fetching blogs...');
    await dispatch(BlogFetchApi(setBlog));
  };

  const GetSoldBlogs = async () => {
    try {
      const response = await fetch(`/api/blog/get-sold-bolg?shop_id=${StoreDetail.Store_Id}`);
      const data = await response.json();
      console.log('soldblog', data);
      const ids = data.soldBlog.map((sold) => sold.BlogId);
      setSoldBlogIds(new Set(ids));
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = () => {
    alert('Navigate to blog details');
  };

  const handlePurchase = async (id) => {
    try {
      const response = await fetch(`/api/blog/blog-sold?shop_id=${StoreDetail.Store_Id}&&BlogId=${id}`, {
        method: "POST"
      });
      const data = await response.json();
      console.log('data', data);
      if (response.status === 200) {
        toast.success(data.message);
        setRefresh((prev)=>!prev)
      }
    } catch (error) {
      console.log('Sold blog error', error);
    }
  };

  return (
    <>
      {loading ? ( // Step 2: Show spinner when loading
        <Spinner />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Blogs of the Day</h1>

          {/* Blog Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {blog && blog.map((item, index) => (
              !soldBlogIds.has(item._id) && ( // Check if the blog is sold
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
                >
                  <img
                    src={item?.image}
                    alt="Blog post"
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-base mb-4 line-clamp-3">
                      {item.desc}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-semibold text-green-700">
                        {`$${item.price}`} {/* Static price for now */}
                      </span>
                      <button
                        onClick={handleNavigate}
                        className="text-blue-500 hover:text-blue-700 font-medium"
                      >
                        Read More
                      </button>
                    </div>
                    <button
                      className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      onClick={() => handlePurchase(item._id)}
                    >
                      Purchase Now
                    </button>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </>
  );
}
