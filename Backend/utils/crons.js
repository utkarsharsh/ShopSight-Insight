import Product from "../schema/Product.js"
import { scrapeMyntra } from "../Scrapingfunctions/myntra/myntra.js";
import { scrapeAmazon } from "../Scrapingfunctions/amazon/amazon.js";
import { sendEmail } from "../utils/nodemailer.js"; 

export const myCronJob = async() => {
    
    try {
        const products = await Product.find({});  
        for (const product of products) {
            // Here you can add logic to update product data if needed
        let data;
        if(product.source==="myntra"){
            data = await scrapeMyntra(product.productUrl);  
        }
        else if(product.source==="amazon"){
            data = await scrapeAmazon(product.productUrl);  
        }
        const newprice= data.price.replace(/[^0-9.-]+/g,"");
        const oldprice= product.currentPrice.replace(/[^0-9.-]+/g,"");
        data.price= parseFloat(newprice);
        product.currentPrice= parseFloat(oldprice);
        console.log("Comparing prices:", data.price, product.currentPrice);
        if(data.price && data.price < product.currentPrice){
            //send email with data
        const emailSent = await sendEmail(product.email, "Price Drop Alert", `The price for the product "${product.title}" has dropped from ${product.currentPrice} to ${data.price}. Check it out here: ${product.productUrl}`);


        }  
        console.log(`Checked product: ${product.title}`);
    }         
    
    }
    catch (error) {
        console.error("Cron job error:", error);
    }
}