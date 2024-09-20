
import axios from "axios"

const Productimport=async(req,res)=>{
    try {
        const {url}= req.query;
        console.log('url',url)
        const response= await  axios.get(`https://real-time-ebay-data.p.rapidapi.com/product_get.php?url=${url}`,{
            headers:{
                'x-rapidapi-key': '1a68576dccmshfeed32a778143a7p138464jsn0e673a61ef8d',
		'x-rapidapi-host': 'real-time-ebay-data.p.rapidapi.com'
           }
        });
        const product= response.data;
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