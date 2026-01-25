import express from "express"
import {protect} from "../middleware/protected.js";
import { userData } from "../controllers/userdata.js";
const protectedRouter=express.Router();
import { scrapData } from "../controllers/Scrap.js";
protectedRouter.use("/",protect);
protectedRouter.post("/scrap",scrapData);
protectedRouter.post("/user",userData);
export default protectedRouter;