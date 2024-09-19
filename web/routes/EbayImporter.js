import express from "express";
import Productimport from "../controllers/EbayImporter.js";

const EabyImporterRoutes=express.Router()

EabyImporterRoutes.get('/test',Productimport)

export default EabyImporterRoutes