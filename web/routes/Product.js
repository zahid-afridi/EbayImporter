
import express from 'express'
import { Delete, GetProduct, UpdateUrl, UploadeProduct } from '../controllers/Product.js'

const ProductRoutes=express.Router()

ProductRoutes.get('/getProduct',GetProduct)
ProductRoutes.post('/upload',UploadeProduct)
ProductRoutes.delete('/delete',Delete)
ProductRoutes.put('/update_url',UpdateUrl)

export default ProductRoutes