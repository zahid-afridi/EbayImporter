
import axios from "axios"
import ProductModel from "../models/Products.js";
import BillingModel from '../models/Billing.js'
const Productimport=async(req,res)=>{
    try {
        const {url,Shop_id}= req.query;
        console.log("checkingm")
        console.log('url',url)
        const response= await  axios.get(`https://real-time-ebay-data.p.rapidapi.com/product_get.php?url=${url}`,{
            headers:{
                'x-rapidapi-key': '9e6f0292edmsh18de09964866e71p170c7bjsn0e9f68d91a81',
		'x-rapidapi-host': 'real-time-ebay-data.p.rapidapi.com'
           }
        });
        const product= response.data;
        // console.log('prdouct titlem',product )
        // console.log('prdouct title',product.body?.title )
        // console.log('prdouct title',product.body?.price.value )
        // console.log('prdouct title',product.body?.images )
        // console.log('prdouct title',product.body?.description )
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

        // Save the new product in the database
        await newProduct.save();
        // res.status(200).json({
        //     success: true,
        //     message: "Product fetched successfully",
        //     product: newProduct,
        //     mainImage: product.body?.mainImage // Send the main image in the response
        //   });
             await BillingModel.findOneAndUpdate(
                {store_id:Shop_id},
                {$inc:{ebayProductNumber:-1}}
             )
            res.status(200).json({
                success: true,
                message: "Product fetched successfully",
                product: {
                    title: product.body?.title ,
                    price: product.body?.price.value , // Combine price and currency
                    image_url: product.body?.images , // Array of image URLs
                    shop_id: Shop_id,
                    product_url: product.body?.url ,
                    description: product.body?.description , // Fallback if description is empty
                    inShopify: false, // Default value
                    shopifyId: null, // Default value
            mainImage: product.body?.mainImage ,// Send the main image in the response

                    store: null, // Adjust if needed
                }
              }
              );
        

    } catch (error) {
        console.log('ebayimport',error)
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
    }






    //now making function for csv upload



    const CsvProductimport=async(req,res)=>{
        

        const { asin } = req.body;
    const { StoreId, key, domain } = req.query;

    try {
        console.log('Store Info:', StoreId, key, domain);
        console.log('ASIN:', asin);

        // Validate ASIN format
        if (!/^[A-Z0-9]{10}$/.test(asin)) {
            return res.status(200).json({ success: false, message: `Invalid ASIN: ${asin}` });
        }

        // Check for available CSV products for the store
        // let billing = await BillingModel.findOne({ store_id: StoreId });
        // if (!billing || billing.CsvProductNumber <= 0) {
        //     return res.status(200).json({ success: false, message: "No CSV products available for this store." });
        // }

        // Prepare API request parameter
        const ExistsProduct= await ProductModel.findOne({shop_id:StoreId,productAsin:asin})
        if (ExistsProduct) {
            return res.status(200).json({ success: false, message: `This ${asin} is duplicated asin ` });
            
        }
        const params = {
            api_key: key,
            amazon_domain: domain,
            type: "product",
            asin: asin
        };

        // Make the API request
        const response = await axios.get('https://real-time-ebay-data.p.rapidapi.com/product_get.php?url=https://www.ebay.com/itm', { params }).catch((err) => {
            console.log('API request failed:', err.message);
            return res.status(200).json({ success: false, message: 'Failed to fetch product data.' });
        });

        

        const productData = response.data.product;

        // Save product data to the database
        const product = {
            title: productData.title,
            price: productData.price,
            image_url: productData.main_image.link,
            product_url: productData.link,
            description: productData.description,
            store: StoreId,
            productAsin: productData.asin,
            shop_id: StoreId
        };

        const savedProduct = await ProductModel.create(product);

        // Update the CSV product count
        // await BillingModel.findOneAndUpdate(
        //     { store_id: StoreId, CsvProductNumber: { $gt: 0 } },
        //     { $inc: { CsvProductNumber: -1 } },
        //     { new: true }
        // );

        return res.status(200).json({ success: true, message: `Product with ASIN ${asin} fetched and saved successfully`, product: savedProduct });

    } catch (error) {
        console.error('Error:', error);

        if (error.response) {
            console.error('API Error:', error.response.status, error.response.data);
            return res.status(200).json({ success: false, message: `The ASIN ${asin} is invalid` });
        }

        return res.status(500).json({ success: false, message: 'Internal server error' });
    }


        }


export default Productimport 