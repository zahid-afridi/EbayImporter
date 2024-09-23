
import express from 'express'
import { GetProduct } from '../controllers/Product.js'

const ProductRoutes=express.Router()

ProductRoutes.get('/getProduct',GetProduct)
export default ProductRoutes