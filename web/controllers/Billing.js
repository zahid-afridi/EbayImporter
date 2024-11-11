import BillingModel from "../models/Billing.js"
import shopify from "../shopify.js"


export const GetStorePyment=async(req,res)=>{
    try {
        const {  StoreId} = req.query
        const StorePayment= await BillingModel.findOne({store_id:StoreId})
        if (!StorePayment) {
            return res.status(404).json({success:false,message:"Not data Found"})
        }
        return res.status(200).json({success:true,StorePayment})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal Server Error"})
        
    }
}

export const UserPay=async(req,res)=>{
    try {  
        
       
       
        const {name,price,retrun_url}=req.body
        
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
      
       console.log('AplicationCharge',appliction_charge)
       
     
        res.status(200).json(appliction_charge)
    } catch (error) {
        res.status(500).json({message:'intnernal server errror'})
        console.log('getPyament error',error)
        
    }
}

export const GetPyament=async(req,res)=>{
    try {
        const {ChargeId,StoreId,ebayproduct,CsvProduct}=req.query;
        console.log('ChageId ',ChargeId)

        console.log("EbayProductNumber",ebayproduct,CsvProduct)
        const appliction_charge = await shopify.api.rest.ApplicationCharge.find({
            session: res.locals.shopify.session,
            id:ChargeId
        })
        const FindStoreBilling=await BillingModel.findOne({store_id:StoreId})
        const updateFields = {
            $set: {
                packagename: appliction_charge.name,
                status: appliction_charge.status,
                billingId: appliction_charge.id,
                price: appliction_charge.price
            }
        };
        if (ebayproduct !== 'null') {
            updateFields.$inc = updateFields.$inc || {};
            updateFields.$inc.ebayProductNumber = ebayproduct;
        }

        if (CsvProduct !== 'null') {
            updateFields.$inc = updateFields.$inc || {};
            updateFields.$inc.csvProductNumber = CsvProduct;
        }
        if (FindStoreBilling) {
            await BillingModel.updateOne(
                { store_id: StoreId },
                updateFields
              
            );
        } else{
            await BillingModel.create({
                store_id: StoreId,
                packagename:appliction_charge.name,
                status: appliction_charge.status,
                billingId: appliction_charge.id,
                price: appliction_charge.price,
                ebayProductNumber: ebayproduct,
                csvProductNumber: CsvProduct
            });
        }
      
        res.status(200).json(appliction_charge)
    } catch (error) {
        res.status(500).json({message:'intnernal server errror'})
        console.log(error)
    }
}