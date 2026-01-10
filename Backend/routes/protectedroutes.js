import express from "express"
import {protect} from "../middleware/protected.js";
const protectedRouter=express.Router();

protectedRouter.use("/",protect);
protectedRouter.get("/",(req,res)=>{
    res.status(200).json({message:"Protected route accessed",user:req.user});
});
export default protectedRouter;