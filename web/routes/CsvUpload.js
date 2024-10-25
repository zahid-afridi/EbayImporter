
import express from 'express'
import CsvProductimport from '../controllers/CsvUpload.js'
//import upload from '../multer/CsvFile.js'
const Csvroutes= express.Router()

// Csvroutes.post('/file',upload.single('file'),Uplaod)
Csvroutes.post('/file',CsvProductimport)

export default Csvroutes