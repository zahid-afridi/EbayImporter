import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlogFetchApi } from "../redux/query/blog";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);
  const [soldBlogs, setSoldBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const StoreDetail = useSelector((state) => state.StoreSlice.StoreDetail);
  const [refresh, setRefresh] = useState(false);


  const getParamsFromURL = () => {
    const params = new URLSearchParams(window.location.search);
   
    const paramObj = {};
    for (const [key, value] of params.entries()) {
      paramObj[key] = value;
    }
    return paramObj;
  };
  useEffect(()=>{
   const verfiypayment=async()=>{
    try {
      const urlParams = getParamsFromURL();
      const chargeId = urlParams.charge_id;
      if (chargeId) {
        const response= await fetch(`/api/blog/verfy_sell_blog?ChargeId=${chargeId}`,{
          method:"POST"
        })
        const data=await response.json()
        console.log('verfiyapyment',data)

      }
    } catch (error) {
      console.log('verifypaemnt error',error)
    }
   }
    verfiypayment()
},[])
  useEffect(() => {
    const fetchData = async () => {
      await GetBlogs();
      await GetSoldBlogs();
      setLoading(false);
    };
    fetchData();
  }, [refresh]);

  // Fetch all blogs
  const GetBlogs = async () => {
    console.log("Fetching blogs...");
    await dispatch(BlogFetchApi(setBlog));
  };

  // Fetch sold blogs
  const GetSoldBlogs = async () => {
    try {
      const response = await fetch(
        `/api/blog/get-sold-bolg?shop_id=${StoreDetail.Store_Id}`
      );
      const data = await response.json();
      console.log("soldblog", data);
      setSoldBlogs(data.soldBlog || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = (item) => {
    navigate('/SingleBlog',{state:{data:item}})
    // console.log('itemmmmmmmm',item)
  };

  const handlePurchase = async (itemdata) => {
  
    const blogitem = {
      name: 'Blog',
      price: itemdata.price,
      BlogId:itemdata._id,
      StoreId:StoreDetail.Store_Id,
      retrun_url: `https://${StoreDetail.domain}/admin/apps/1354cfff91f5e6d65d50d36853a7e48a/Blog`
      
  }
    try {
      const response = await fetch(
        `/api/blog/sell_blog`
        // `/api/blog/sell_blog?shop_id=${StoreDetail.Store_Id}&&BlogId=${id}`
        ,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(blogitem)
        }
        
      );
      const data = await response.json();
      console.log('fetch sell blog',data)
      if (response.ok) {
        // toast.success(data.message);
        window.open(data.confirmation_url)

        setRefresh((prev) => !prev);
      }
    } catch (error) {
      console.log("Sold blog error", error);
    }
  };

  const handleMakePublic = async (id) => {
    // alert(id)
    try {
      const response = await fetch(
        `/api/blog/blog-public?shop_id=${StoreDetail.Store_Id}&&BlogId=${id}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      console.log('public api data',data)
      if (response.ok) {
        toast.success(data.message);
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      console.log("Make public error", error);
    }
  };

  // Function to check if a blog is sold
  const isBlogSold = (blogId) => {
    return soldBlogs.find((sold) => sold.BlogId === blogId);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            Blogs of the Day
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {blog &&
              blog.map((item, index) => {
                const soldBlog = isBlogSold(item._id);
                const isSold = soldBlog?.isSold;
                const isPublic = soldBlog?.isPublic;

                return (
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
                          {`$${item.price}`}
                        </span>
                        <button
                          onClick={()=>handleNavigate(item)}
                          className="text-blue-500 hover:text-blue-700 font-medium"
                        >
                          Read More
                        </button>
                      </div>

                      {/* Conditional Buttons */}
                      {!isSold ? (
                        <button
                          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                          onClick={() => handlePurchase(item)}
                        >
                          Purchase Now
                        </button>
                      ) : (
                        <button
                          className={`w-full py-2 rounded-lg transition-colors ${
                            isPublic
                              ? "bg-gray-500 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                          disabled={isPublic}
                          onClick={() => !isPublic && handleMakePublic(item._id)}
                        >
                          {isPublic ? "Published" : "Public Now"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}
