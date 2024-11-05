import Blog_Sold from "../models/Blog_Sold.js"
import BlogModel from "../models/Blogs.js"
import shopify from "../shopify.js"


const GetBlog=async(req,res)=>{
    try {
        const Blogs= await BlogModel.find()
        if (!Blogs) {
            return res.status(400).json({success:false,message:"blogs not found"})
        }
        return res.status(200).json({success:true,Blogs})


    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"internal server error"})

    }
}

// const BlogSold = async (req, res) => {
//     try {
//       const { shop_id, BlogId } = req.query;
  
//       if (!shop_id) {
//         return res.status(400).json({ success: false, message: "Store ID is required" });
//       }
//       if (!BlogId) {
//         return res.status(400).json({ success: false, message: "Blog ID is required" });
//       }
//      const existBlog=await BlogModel.findById(BlogId)
//      console.log('ExistBlog',existBlog)
//       // Create a new BlogSold document
//       const sold = new Blog_Sold({
//         BlogId,
//         StoreId: shop_id,
//         isSold: true,
//       });
//       await sold.save();
      
//     //   const blog = await new shopify.api.rest.Article({
//     //     session: res.locals.shopify.session,})
    
        
//       return res.status(200).json({ success: true, message: "Blog purchased successfully" });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ success: false, message: "Internal server error" });
//     }
//   };

const BlogSold = async (req, res) => {
    try {
      const { shop_id, BlogId } = req.query;
  
      if (!shop_id) {
        return res.status(400).json({ success: false, message: "Store ID is required" });
      }
      if (!BlogId) {
        return res.status(400).json({ success: false, message: "Blog ID is required" });
      }
  
      // Fetch the existing blog details from your database
      const existBlog = await BlogModel.findById(BlogId);
      if (!existBlog) {
        return res.status(404).json({ success: false, message: "Blog not found" });
      }
  
      // Create a new BlogSold document in your database
      const sold = new Blog_Sold({
        BlogId,
        StoreId: shop_id,
        isSold: true,
      });
      await sold.save();
  
      // Create a new blog on Shopify
      const blog = await new shopify.api.rest.Blog({
        session: res.locals.shopify.session,
      });
      blog.title = "Apple main blog"; // Set your desired blog title
      await blog.save({
        update: true,
      });
  
      // Get the created blog ID from the response
      const blogId = blog.id;
    //   console.log("Created Blog ID:", blogId);
  
      // Create a new article in the newly created blog
      const article = new shopify.api.rest.Article({
        session: res.locals.shopify.session,
      });
      
    //   Set the necessary IDs and other properties
      article.blog_id = blogId; // Use the newly created blog ID
      article.title = existBlog.title;
      article.body_html = existBlog.desc;
      article.image = { src: existBlog.image }; // Make sure the image URL is publicly accessible
  
      // Save the article
      await article.save({
        update: true,
      });
  
      console.log("Article created:", article);
  
      return res.status(200).json({
        success: true,
        message: "Blog created and article uploaded to your store successfully",
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
  

  const GetSoldBolg=async(req,res)=>{
    try {
      const { shop_id } = req.query;
       const soldBlog= await Blog_Sold.find({StoreId:shop_id})
       if (!soldBlog) {
        return res.status(400).json({ success: false, message: "No Blog Found " });
        
       }

       return res.status(200).json({ success: true, soldBlog });
       
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "intenal server error" });

    }
  }

export {GetBlog,BlogSold,GetSoldBolg}