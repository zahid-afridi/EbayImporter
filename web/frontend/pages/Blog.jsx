import React from 'react';

export default function Blog() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center my-4">Browse by Category</h1>
        {/* <p className="text-center text-gray-600 mb-5">Select a category to see more related content</p> */}

        {/* Categories */}
        <div className="flex justify-center space-x-4 mb-10">
          <button className="px-4 py-2 bg-black text-white rounded-full">All (20)</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-full">Technology (03)</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-full">Lifestyle (02)</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-full">Travel (05)</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-full">Health (09)</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-full">Culture (01)</button>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Blog Item */}
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src="https://via.placeholder.com/300x200"
                alt="Blog post"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">
                  Stylish Kitchen And Dining Room With Functional Ideas
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Lorem Ipsum is simply dummy text of the print and typesetting industry...
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://via.placeholder.com/32"
                      alt="Author"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>Adrio Devid</span>
                  </div>
                  <span>Sep 10, 2025</span>
                </div>
                <span className="mt-2 inline-block bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-xs">
                  Technology
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Browse all posts button */}
        <div className="flex justify-center mt-10">
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
            Browse all Posts
          </button>
        </div>
      </div>
    </>
  );
}
