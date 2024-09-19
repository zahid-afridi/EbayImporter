import express from "express";

const EabyImporterRoutes=express.Router()

EabyImporterRoutes.get('/test',async(req,res)=>{
    try {
        res.send('api working')
    } catch (error) {
        console.log('error',error)
    }
})

export default EabyImporterRoutes