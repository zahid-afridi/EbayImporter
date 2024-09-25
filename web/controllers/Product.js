import ProductModel from "../models/Products.js";
import shopify from "../shopify.js";


const GetProduct = async (req, res) => {
  try {
    const { shop_id } = req.query;

    // Check if shop_id exists
    if (!shop_id) {
      return res.status(400).json({
        success: false,
        message: "shop_id is required",
      });
    }

    // Log shop_id for debugging
    // console.log("shop_id:", shop_id);

    // Query the product model
    const products = await ProductModel.find({ shop_id });
// console.log('products',products)
    // Check if any products were found
    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: "No products found for this shop_id",
      });
    }
    

    // Return the product data
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const UploadeProduct=async(req,res)=>{
  const { title, description, image_url,ProductId,price } = req.body;
  try {
      // Create a new Shopify product object
      const newProduct = await new shopify.api.rest.Product({
          session: res.locals.shopify.session,
          // title: 'hello',
          // body_html: 'hello',
          // images: [{ src: "https://m.media-amazon.com/images/I/41gBvQOnKDL._AC_SL1500_.jpg" }]
      });
       newProduct.title=title,
       newProduct.body_html=description,
       newProduct.images=image_url.map(url =>({src:url}))
       newProduct.variants = [
          {
              "option1": "First",
              "price": price,
              "sku": "123"
        

          }
       ]
         
      
       
            
      newProduct.metafields = [{
     "key": "amazonurl3",
      "value": "Random 2 products",
      "type": "single_line_text_field",
      "namespace": "custom"
      }];

  
    
      
      
      await newProduct.save({
          update: true,
      });
      const DatabesProduct=await ProductModel.findById({_id:ProductId})
      if (!DatabesProduct) {
        res.status(404).json({ success:false,message: "Prodcut not Found"});
        
      }
      DatabesProduct.shopifyId=newProduct.id
      DatabesProduct.inShopify=true
      await DatabesProduct.save()
      console.log("this is new Product Id",newProduct.id)
      // console.log('databaseProduc',DatabesProduct)
      console.log("Database product Id",ProductId)
      console.log('product price is comming',price)

          // Send a success response
          res.status(200).json({ message: "Product added successfully", product: newProduct });
     
  } catch (error) {
      // If there's an error, send an error response
      console.error('upload error',error);
      res.status(500).json({ message: "Internal Server error" });
  }

}
export { GetProduct,UploadeProduct };
