import ProductModel from "../models/Products.js";

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
    console.log("shop_id:", shop_id);

    // Query the product model
    const products = await ProductModel.find({ shop_id });
console.log('products',products)
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

export { GetProduct };
