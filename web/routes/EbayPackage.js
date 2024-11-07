import express from 'express'
import { GetPackage } from '../controllers/EbayPackage.js'

const Ebay_Packages_Routes=express.Router()


Ebay_Packages_Routes.get('/EbayPackage',GetPackage)

export default Ebay_Packages_Routes