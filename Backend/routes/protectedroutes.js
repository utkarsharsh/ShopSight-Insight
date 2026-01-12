import express from "express"
import {protect} from "../middleware/protected.js";
const protectedRouter=express.Router();
import { scrapeMyntra } from "../Scrapingfunctions/myntra/myntra.js";
// protectedRouter.use("/",protect);
protectedRouter.post("/",async (req,res)=>{
    let data;
    try{
        if(!req.body.url){  
            res.status(400).json({message:"URL is required"});
        }
        data = await scrapeMyntra(req.body.url);
    }
    catch(err){
        console.error(err);
    }
    res.status(200).json({message:"Protected route accessed",user:req.user,data:data});
});
export default protectedRouter;