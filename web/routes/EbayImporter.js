import express from "express";
import Productimport from "../controllers/EbayImporter.js";

const EabyImporterRoutes=express.Router()

EabyImporterRoutes.get('/importProduct',Productimport)

export default EabyImporterRoutes