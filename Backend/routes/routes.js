import express from "express"
const router=express.Router();
import { signin } from "../controllers/Auth.js";
import { signup } from "../controllers/Auth.js";

router.post("/signin",signin);  
router.post("/signup", signup);
export default router;