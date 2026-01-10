import express from "express"
const router=express.Router();
import { signin } from "../controllers/Auth.js";
import { signup } from "../controllers/Auth.js";

router.post("/signin",signin);  
router.post("/signup", signup);   
router.get("/logout",(req,res)=>{
    res.clearCookie("token");
    res.status(200).json({message:"Logged out successfully"});
});          
export default router;