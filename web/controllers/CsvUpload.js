
import axios from "axios"
import ProductModel from "../models/Products.js";







    //now making function for csv upload



    const CsvProductimport=async(req,res)=>{
        

        const { asin } = req.body;
    const { Shop_id } = req.query;

    try {
        console.log('Store Info:', Shop_id);
        console.log('ASIN:', asin);

        // Validate ASIN format
        

        // Check for available CSV products for the store
        // let billing = await BillingModel.findOne({ store_id: Shop_id });
        // if (!billing || billing.CsvProductNumber <= 0) {
        //     return res.status(200).json({ success: false, message: "No CSV products available for this store." });
        // }

        // Prepare API request parameter
        const ExistsProduct= await ProductModel.findOne({shop_id:Shop_id,productAsin:asin})
        if (ExistsProduct) {
            return res.status(200).json({ success: false, message: `This ${asin} is duplicated asin ` });
            
        }
        

        // Make the API request
        const response= await  axios.get(`https://real-time-ebay-data.p.rapidapi.com/product_get.php?url=https://www.ebay.com/itm/${asin}`,{
            headers:{
                'x-rapidapi-key': '9e6f0292edmsh18de09964866e71p170c7bjsn0e9f68d91a81',
		'x-rapidapi-host': 'real-time-ebay-data.p.rapidapi.com'
           }
        });
       const data= response.data
console.log("mm here is data ");
console.log(data);
        

       const product = response.data;

       // Save product data to the database
       const newProduct = new ProductModel({
        title: product.body?.title ,
        price: product.body?.price.value , // Combine price and currency
        image_url: product.body?.images , // Array of image URLs
        shop_id: Shop_id,
        product_url: product.body?.url ,
        description: product.body?.description , // Fallback if description is empty
        inShopify: false, // Default value
        shopifyId: null, // Default value
        store: null, // Adjust if needed
        mainImage:product.body?.mainImage
    });

         const savedProduct = await ProductModel.create(product);

        // Update the CSV product count
        

        return res.status(200).json({ success: true,  message: `Product with ASIN ${asin} fetched and saved successfully` });

    } catch (error) {
        console.error('Error:', error);


        return res.status(500).json({ success: false, message: 'Internal server error' });
    }


        }

export default CsvProductimport 
