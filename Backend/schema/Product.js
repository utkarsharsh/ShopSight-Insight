import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  email:{
        type:String,
        required:true,},
        
  title: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: [String],
  currentPrice: {
    type: String,
    required: true
  },
  source: {
    type: String, // amazon, flipkart etc
    required: true
  },
  productUrl: String,
  discription: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const Product = mongoose.model("Product", productSchema);

export default Product;