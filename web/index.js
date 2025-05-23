// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import PrivacyWebhookHandlers from "./privacy.js";
import EabyImporterRoutes from "./routes/EbayImporter.js";

import StoreModel from "./models/Store.js";
import ProductRoutes from "./routes/Product.js";
import Csvroutes from "./routes/CsvUpload.js";
import DbCon from "./db/db.js";
import BlogRoutes from "./routes/Blogs.js";
import Ebay_Packages_Routes from "./routes/EbayPackage.js";
import BillingModel from "./models/Billing.js";
import BillingRoute from "./routes/Billing.js";
import ProductModel from "./models/Products.js";


const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// mongo db connection 
DbCon()

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);


// customapi authenction

// customapi authenction end 
// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());
app.use("/customapi/*", authenticateUser);
async function authenticateUser(req,res,next){
  let shop=req.query.shop
  let storeName= await shopify.config.sessionStorage.findSessionsByShop(shop)
  console.log('storename for view',storeName)
  if (shop === storeName[0].shop) {
    next()
  }else{
    res.send('user not authersiozed')
  }
}

app.use(express.json());
app.use('/api/upload',Csvroutes)
app.use('/api',EabyImporterRoutes)
app.use('/api/products',ProductRoutes)
app.use('/api/blog',BlogRoutes)
app.use('/api/packages',Ebay_Packages_Routes)
app.use('/api/billing',BillingRoute)
app.get("/api/products/count", async (_req, res) => {
  const client = new shopify.api.clients.Graphql({
    session: res.locals.shopify.session,
  });

  const countData = await client.request(`
    query shopifyProductCount {
      productsCount {
        count
      }
    }
  `);

  res.status(200).send({ count: countData.data.productsCount.count });
});


// view on ebay api
app.get('/customapi/viewonebay/:id', async (req, res) => {
  try {
    const shopifyId = req.params.id; // Capture shopifyId from URL
    const product = await ProductModel.findOne({ shopifyId: shopifyId });

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // If product is found, send it as a response
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error('viewoneebay error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});





app.post("/api/products", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

// store info api 
app.get('/api/store/info', async (req, res) => {
  try {
    const Store = await shopify.api.rest.Shop.all({
      session: res.locals.shopify.session,
    });
    // console.log("Storename",Store.data[0].domain)
      // console.log('Store Information',Store)
    if (Store && Store.data && Store.data.length > 0) {
      const storeName = Store.data[0].name;
      const domain = Store.data[0].domain;
      const country=Store.data[0].country;
      const Store_Id=Store.data[0].id
     

      // Check if storeName exists in the database
      const existingStore = await StoreModel.findOne({ storeName });

      if (!existingStore) {
        // If it doesn't exist, save it
        const newStore = new StoreModel({ storeName,domain,country,Store_Id });
        await newStore.save();
       await BillingModel.create({
          store_id:Store_Id,
          ebayProductNumber:10,
          csvProductNumber:10
        })
      
      }

      // Send response with existingStore only
      res.status(200).json(existingStore); // Send existingStore directly in the response
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});
// store info api end







app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(
      readFileSync(join(STATIC_PATH, "index.html"))
        .toString()
        .replace("%VITE_SHOPIFY_API_KEY%", process.env.SHOPIFY_API_KEY || "")
    );
});

app.listen(PORT);
