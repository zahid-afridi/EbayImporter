import express from 'express'
import {  GetBlog, GetSoldBolg, SellBlog, UploadBlog, Verfy_sell_blog } from '../controllers/Blogs.js'
const BlogRoutes=express.Router()

BlogRoutes.get('/getblog',GetBlog)
BlogRoutes.post('/blog-public',UploadBlog)
BlogRoutes.get('/get-sold-bolg',GetSoldBolg)
BlogRoutes.post('/sell_blog',SellBlog)
BlogRoutes.post('/verfy_sell_blog',Verfy_sell_blog)
export default BlogRoutes