import express from 'express'
import { BlogSold, GetBlog, GetSoldBolg } from '../controllers/Blogs.js'
const BlogRoutes=express.Router()

BlogRoutes.get('/getblog',GetBlog)
BlogRoutes.post('/blog-sold',BlogSold)
BlogRoutes.get('/get-sold-bolg',GetSoldBolg)
export default BlogRoutes