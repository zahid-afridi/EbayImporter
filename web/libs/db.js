import mongoose from 'mongoose'

const DbCon=async()=>{
    try {
        await mongoose.connect('mongodb+srv://zahid:zahid313@cluster0.7kqkz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log("Mongodb is Connected")
    } catch (error) {
     console.log('mongodb connection error',error)   
    }
}

export default DbCon