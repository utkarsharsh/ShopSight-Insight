import express from "express"
import {protect} from "../middleware/protected.js";
const protectedRouter=express.Router();
import { scrapeMyntra } from "../Scrapingfunctions/myntra/myntra.js";
import { scrapeAmazon } from "../Scrapingfunctions/amazon/amazon.js";
// protectedRouter.use("/",protect);
protectedRouter.post("/",async (req,res)=>{
   
});
export default protectedRouter;