
import axios from "axios"
import ProductModel from "../models/Products.js";

const Productimport=async(req,res)=>{
    try {
        const {url,Shop_id}= req.query;
        console.log('url',url)
        const response= await  axios.get(`https://real-time-ebay-data.p.rapidapi.com/product_get.php?url=${url}`,{
            headers:{
                'x-rapidapi-key': '9e6f0292edmsh18de09964866e71p170c7bjsn0e9f68d91a81',
		'x-rapidapi-host': 'real-time-ebay-data.p.rapidapi.com'
           }
        });
        const product= response.data;
        const newProduct = new ProductModel({
            title: product.title || '', // Fallback to an empty string if title is not available
            price: product.price?.value?.toString() || '', // Ensure price is stored as a string
            image_url: product.images || [], // Array of image URLs
            shop_id: Shop_id || '', // Use Shop_id from the query
            product_url: product.url || '', // Product URL
            description: product.description || 'No description available', // Default if no description is provided
            inShopify: false, // Default value for now
            shopifyId: null, // Default as null
            store: null // Set this if you have a store ID or link to it
        });

        // Save the product to the database
        await newProduct.save();
        // console.log(product)
        res.status(200).json({sucess:true ,message:"Product Fetch Successfully ",product})

    } catch (error) {
        console.log('error',error)
        res.status(500).json({
            status: 'error',
            message: 'Sorry! It\'s taking longer time to get data please try again!'
        });
    }
    }


export default Productimport