import mongoose from 'mongoose'

const DbCon=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/ebay')
        console.log("Mongodb is Connectedm")
    } catch (error) {
     console.log('mongodb connection error',error)   
    }
}

export default DbCon