
import express from 'express'
import { Delete, GetProduct, UploadeProduct } from '../controllers/Product.js'

const ProductRoutes=express.Router()

ProductRoutes.get('/getProduct',GetProduct)
ProductRoutes.post('/upload',UploadeProduct)
ProductRoutes.delete('/delete',Delete)

export default ProductRoutes