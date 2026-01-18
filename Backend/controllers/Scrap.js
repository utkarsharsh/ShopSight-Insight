
import { scrapeMyntra } from "../Scrapingfunctions/myntra/myntra.js";
import { scrapeAmazon } from "../Scrapingfunctions/amazon/amazon.js";
import { sendEmail } from "../utils/nodemailer.js";

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
     const user = req.user;
     try{
        if(!req.body.url){  
            res.status(400).json({message:"URL is required"});
        }
        const src= source(req.body.url);   
        switch (src) {
            case "myntra":
                data = await scrapeMyntra(req.body.url);
                break;
            case "amazon":
                data = await scrapeAmazon(req.body.url);
                break;
            default:
                return res.status(400).json({message:"Unsupported source"});
        }
        if(data){
            //send email with data
            const emailSent = await sendEmail({
                to: req.user.email,
                subject: "Tracked Data",
                data: data
            });
        }   else{
            return res.status(500).json({message:"Error scraping data"});
        }   
    }
    catch(err){
        console.error(err);
    }
    res.status(200).json({message:"Protected route accessed",user:req.user,data:data});
}