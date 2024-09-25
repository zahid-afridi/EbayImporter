
import express from 'express'
import { GetProduct, UploadeProduct } from '../controllers/Product.js'

const ProductRoutes=express.Router()

ProductRoutes.get('/getProduct',GetProduct)
ProductRoutes.post('/upload',UploadeProduct)
export default ProductRoutes