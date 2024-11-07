import Ebay_Packages_Modal from "../models/EbayPackage.js";


const GetPackage=async(req,res)=>{
    try {
        const MyPakages= await Ebay_Packages_Modal.find()
        if (!MyPakages) {
            return res.status(404).json({success:false,message:"Package Not found"})
        }
        const Pakages = MyPakages.sort((a, b) => a.packagePrice - b.packagePrice);
        return res.status(200).json({success:true,Pakages})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Intnernal server errror"})
        
    }
}

export {GetPackage}