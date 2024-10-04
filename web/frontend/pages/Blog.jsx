import React, { useState } from 'react';

export default function Blog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const blogs = [
    {
      title: 'Stylish Kitchen And Dining Room With Functional Ideas',
      content: 'Lorem Ipsum is simply dummy text of the print and typesetting industry...Lorem Ipsum is simply dummy text of the print and typesetting industry...Lorem Ipsum is simply dummy teLorem Ipsum is simply dummy text of the print and typesetting industry...xt of the print and typesetting industry...Lorem Ipsum is simply dummy text of the print and typesetting industry...Lorem Ipsum is simply dummy text of the print and typesetting industry...Lorem Ipsum is simply dummy text of the print and typesetting industry...Lorem Ipsum is simply dummy text of the print and typesetting industry...Lorem Ipsum is simply dummy text of the print and typesetting industry...',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Modern Living Room Trends',
      content: 'Discover the latest trends in modern living room designwefweoriweir werbwerw rwerbweorwer wer weorbiweirwe rweorbwerhwe rwerbwerwerb jrwerwe rwerweirwe0r w...',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Best Travel Destinations for 2024',
      content: 'Explore the best places to visit in 2024 for adventure and relaxation...',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Healthy Eating Habits',
      content: 'Learn about healthy eating habits that will improve your lifestyle...',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Workspace Decor Ideas',
      content: 'Tips and tricks for setting up a functional and stylish workspace...',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Outdoor Gardening Essentials',
      content: 'A guide to starting your own outdoor garden, even in small spaces...',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Top 5 Fitness Routines',
      content: 'Stay fit with these top 5 fitness routines for all levels...',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Mindfulness Practices',
      content: 'Learn how to incorporate mindfulness into your daily routine...',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Decorating Small Apartments',
      content: 'Maximize space and style in your small apartment with these tips...',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Tips for Starting a Blog',
      content: 'Step-by-step guide on how to start a successful blog...',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'DIY Crafts for Beginners',
      content: 'Simple and fun DIY crafts to try at home for beginners...',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Sustainable Living Guide',
      content: 'Practical ways to lead a more sustainable and eco-friendly life...',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Best Books of 2024',
      content: 'Check out our recommendations for the best books to read in 2024...',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Photography Tips for Beginners',
      content: 'Improve your photography skills with these easy tips...',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Top Tech Gadgets of 2024',
      content: 'Discover the coolest tech gadgets to get your hands on in 2024...',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Yoga for Stress Relief',
      content: 'Learn yoga poses that help relieve stress and improve relaxation...',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
  ];

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center my-4">Browse by Category</h1>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={blog.imageUrl}
                alt="Blog post"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-500 text-sm mb-4 truncate">{blog.content}</p>

              
                  {/* <button
                    className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    onClick={() => openModal(blog)}
                  >
                    View Details
                  </button> */}
                  <span className="mt-2 inline-block bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-xs cursor-pointer"  onClick={() => openModal(blog)}>
                  Read Article
                </span>
                  {/* <div className="p-6">
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
                  Read Article
                </span>
              </div> */}
                
              </div>
            </div>
          ))}
        </div>

      
        <div className="flex justify-center mt-10">
          <button
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
            onClick={() => openModal(blogs[0])}
          >
            Browse all Posts
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedBlog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-10 rounded-lg max-w-5xl w-full h-[90%] overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              onClick={closeModal}
            >
              Close
            </button>
            <img
              src={selectedBlog.imageUrl}
              alt="Blog post"
              className="w-full h-64 object-cover mb-4"
            />
            <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
            <p className="text-gray-700">{selectedBlog.content}</p>
          </div>
        </div>
      )}
    </>
  );
}