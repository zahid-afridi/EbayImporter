import mongoose from "mongoose";

const DbCon=async()=>{
    try {
        
// await mongoose.connect('mongodb+srv://zahid:zahid313@cluster0.7kqkz.mongodb.net/EbayImport')
await mongoose.connect('mongodb://localhost:27017/EbayImport')
// await mongoose.connect('mongodb+srv://zahid:zahid123@cluster0.eg9ftuk.mongodb.net/EbayImporter')


        // await mongoose.connect('mongodb+srv://shafsamazonaffiliateimporter:shafiali2024@cluster0.zseougt.mongodb.net/Shafsamazonaffiliateimporter')
        console.log("Mongo db is conncted")
    } catch (error) {
        console.log(error)
    }
}
export default DbCon