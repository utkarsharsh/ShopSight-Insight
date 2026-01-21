import express from "express"
import {protect} from "../middleware/protected.js";
const protectedRouter=express.Router();
import { scrapData } from "../controllers/Scrap.js";
protectedRouter.use("/",protect);
protectedRouter.post("/scrap",scrapData);
export default protectedRouter;