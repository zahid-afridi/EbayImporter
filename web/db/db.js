import mongoose from "mongoose";

const DbCon=async()=>{
    try {
        
await mongoose.connect('mongodb+srv://zahid:zahid313@cluster0.7kqkz.mongodb.net/')
        // await mongoose.connect('mongodb+srv://shafsamazonaffiliateimporter:shafiali2024@cluster0.zseougt.mongodb.net/Shafsamazonaffiliateimporter')
        console.log("Mongo db is conncted")
    } catch (error) {
        console.log(error)
    }
}
export default DbCon