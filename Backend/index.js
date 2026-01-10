import express from "express";
import cors from 'cors'
import dotenv from 'dotenv';
import { Router } from "express";
import dbconnect from "./config/db.js"
import routes from "./routes/routes.js"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import protectedRouter from "./routes/protectedroutes.js";
const app=express();
dotenv.config();
dbconnect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api",routes);
app.use("/api/product",protectedRouter);
const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(port);
})