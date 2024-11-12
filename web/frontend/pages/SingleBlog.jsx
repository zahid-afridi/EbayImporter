import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function SingleBlog() {
  const navigate = useNavigate();
  const locationdata=useLocation()
  const data=locationdata.state.data
  console.log('singleBlogdata',locationdata.state.data)
  // Static data (replace with dynamic data later)
  const blogData = {
    title: "Exploring the Beauty of Nature",
    image: "https://img.freepik.com/free-vector/realistic-autumn-leaves-background_23-2148624140.jpg?t=st=1731412506~exp=1731416106~hmac=2b60b5a01c8f5baab9de610136c7925f171393c7cc7349f71ca58073bbb3b377&w=826",
    description: `Nature is the most beautiful and attractive surrounding around us which makes us happy and provides us with the natural environment to live healthily. Our nature provides us with a variety of beautiful flowers, attractive birds, animals, green plants, blue sky, land, running rivers, sea, forests, air, mountains, valleys, hills, and many more things. Our God has created a beautiful nature for the healthy living of us. All the things we use for our living are the assets of nature which we should not spoil and damage.`
  };

  return (
    <div className="max-w-3xl mx-auto p-4 mt-2">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 hover:text-gray-800 transition duration-200 mb-4"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>

      {/* Blog Content */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Main Image */}
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-64 object-cover"
        />

        {/* Blog Details */}
        <div className="p-6">
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.title}</h2>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">{data.desc}</p>
        </div>
      </div>
    </div>
  );
}
