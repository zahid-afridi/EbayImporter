import mongoose, { Schema, model } from "mongoose";


const packageSchema = new Schema(
  {
    packageName: { type: String },
    packageDesc: { type: String },
    packagePrice: { type: String },
    packageEbayImportNumber: { type: Number },
    packageCSVImportBoolean: { type: String },
    packageCsvImportNumber: { type: Number },
  },
  { timestamps: true, versionKey: false }
);

const Ebay_Packages_Modal= mongoose.model("Ebay_Packages", packageSchema)

export default Ebay_Packages_Modal