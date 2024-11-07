import mongoose from "mongoose";

const BillingShecma= new mongoose.Schema({
    store_id:{
        type:String,
    },
    status:{
        type:String,
    },
    price:{
        type:String,
    },
    billingId:{
        type:String
    },
    packagename:{
        type:String
    },
    ebayProductNumber:{
        type:Number,
        default:0
    },
    csvProductNumber:{
        type:Number,
        default: 0
    }
},{timestamps:String})

const BillingModel= mongoose.model('app_billing',BillingShecma)


export default BillingModel