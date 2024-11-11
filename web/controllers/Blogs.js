import mongoose from "mongoose"
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



const UploadBlog = async (req, res) => {
  try {
    const { shop_id, BlogId } = req.query;

    if (!shop_id) {
      return res.status(400).json({ success: false, message: "Store ID is required" });
    }
    if (!BlogId) {
      return res.status(400).json({ success: false, message: "Blog ID is required" });
    }

    // Ensure BlogId is casted to ObjectId if needed
    // const blogIdObject = mongoose.Types.ObjectId(BlogId);

    // Fetch the existing blog details and populate the blog data
    const existBlog = await Blog_Sold.findOne({ BlogId }).populate('BlogId');
    if (!existBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // Log the populated blog data (you will have full access to the related blog data here)
    console.log('Populated Blog Data:', existBlog);

    // Check if the title is available and not empty
    const blogTitle = existBlog.BlogId.title;
    if (!blogTitle) {
      return res.status(400).json({ success: false, message: "Blog title is required" });
    }

    // Create a new blog on Shopify
    const blog = await new shopify.api.rest.Blog({
      session: res.locals.shopify.session,
    });
    blog.title = "Apple main blog";
    await blog.save({
      update: true,
    });

    const shopifyBlogId = blog.id;

    // Create a new article in the newly created blog
    const article = new shopify.api.rest.Article({
      session: res.locals.shopify.session,
    });

    article.blog_id = shopifyBlogId;
    article.title = blogTitle;  // Use the validated title
    article.body_html = existBlog.BlogId.desc;  // Accessing the description from populated BlogId
    article.image = { src: existBlog.BlogId.image };  // Accessing the image from populated BlogId

    // Save the article
    await article.save({
      update: true,
    });

    // Update the 'isPublic' field of the existing blog document
    existBlog.isPublic = true;
    await existBlog.save();

    return res.status(200).json({
      success: true,
      message: "Blog published successfully",
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

  const SellBlog=async(req,res)=>{
    try {  
        
      //  const BlogId=req.query
      
      const {name,price,retrun_url,BlogId,StoreId}=req.body
       console.log('BlgogId',BlogId)

       const ExistBlog=await Blog_Sold.findOne({BlogId:BlogId})

       if (!ExistBlog) {
         await Blog_Sold.create({
          BlogId,StoreId,
         })
       }
      
      const appliction_charge = await new shopify.api.rest.ApplicationCharge({
          session: res.locals.shopify.session,
      })
      // const appliction_charge = await new shopify.api.rest.RecurringApplicationCharge({
      //     session: res.locals.shopify.session,
      // })
    
      appliction_charge.name =name,
      appliction_charge.price= price,
      appliction_charge.return_url =retrun_url
      appliction_charge.test =true;
     
      await appliction_charge.save({
          update:true
      })
      console.log('appp',appliction_charge)
   const UpdateBlogd= await Blog_Sold.findOne({BlogId})
   if (UpdateBlogd) {
   UpdateBlogd.billingId=appliction_charge.id
    await UpdateBlogd.save()
   }
     console.log('AplicationCharge',UpdateBlogd)
     
   
      res.status(200).json(appliction_charge)
  } catch (error) {
      res.status(500).json({message:'intnernal server errror'})
      console.log('getPyament error',error)
      
  }
  }

  const Verfy_sell_blog=async(req,res)=>{
    try {
      const {ChargeId}=req.query;
      console.log('verifypaymentChargid',ChargeId)
      const appliction_charge = await shopify.api.rest.ApplicationCharge.find({
        session: res.locals.shopify.session,
        id:ChargeId
    })
    if (appliction_charge.status=='active') {
      console.log('pyament done by user first')
      const updateSoldBlog=await Blog_Sold.findOne({billingId:ChargeId})
      if (updateSoldBlog) {
        updateSoldBlog.isSold=true
        await updateSoldBlog.save()
      }
    }
    return res.status(200).json({success:true,message:"Payment  successed",appliction_charge})
    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: "intenal server error" });
    }
  }
export {GetBlog,UploadBlog,GetSoldBolg,SellBlog,Verfy_sell_blog}