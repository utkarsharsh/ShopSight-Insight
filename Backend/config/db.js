import mongoose from 'mongoose';
const  dbconnect=async ()=>{
    // Database connection logic here
      try{
       await mongoose.connect(process.env.MONGO_URL);
      }
      catch(err){   
        console.error("Database connection error:", err);
      }

    console.log("Database connected");
}

export default dbconnect;