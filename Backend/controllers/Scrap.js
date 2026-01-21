
import { scrapeMyntra } from "../Scrapingfunctions/myntra/myntra.js";
import { scrapeAmazon } from "../Scrapingfunctions/amazon/amazon.js";
import { sendEmail } from "../utils/nodemailer.js";
import Product from "../schema/Product.js";
const source= (url)=>{
    if(url.includes("myntra.com")){
        return "myntra";
    }       
    else if(url.includes("amazon.in") || url.includes("amazon.com")){
        return "amazon";
    }   
    else{
        return "unknown";
    }
}



export const scrapData = async (req, res) => {
     let data;
    
     try{
        if(!req.body.url){  
            res.status(400).json({message:"URL is required"});
        }
        const src= source(req.body.url);   
        switch (src) {
            case "myntra":
                data = await scrapeMyntra(req.body.url);
                data.source="myntra";
                break;
            case "amazon":
                data = await scrapeAmazon(req.body.url);
                data.source="amazon";
                break;
            default:
                return res.status(400).json({message:"Unsupported source"});
        }
        if(data){
            //send email with data
                const newProduct = new Product({
                title: data.title,
                currentPrice: data.price,  
                source: data.source,
                productUrl: req.body.url,
                imageUrl: data.images,
                email: req.user.email,
                discription: data?.discription
            });
            await newProduct.save();
            console.log("Product saved:", newProduct);
            const emailSent = await sendEmail(req.user.email, "Scraped Product Data", `Product Title: ${data.title}\nPrice: ${data.price}\nURL: ${req.body.url}`);
            console.log("Email sent status:", emailSent);
            return res.status(200).json({message:"Data scraped and email sent",data:data,emailSent:emailSent});
        }  
        
        else{
            return res.status(500).json({message:"Error scraping data"});
        }  
        
        


    }
    catch(err){
        console.error(err);
    }
    res.status(200).json({message:"Protected route accessed",user:req.user,data:data});
}