import express from 'express'
import { GetPyament, GetStorePyment, UserPay } from '../controllers/Billing.js'

const BillingRoute=express.Router()

BillingRoute.get('/getBilling',GetStorePyment)
BillingRoute.post('/userpay',UserPay)
BillingRoute.get('/GetPayment',GetPyament)
export default BillingRoute