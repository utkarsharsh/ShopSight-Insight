import User from "../schema/user.js";
import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt";  
import { generateToken} from "../utils/jwt.js";

export const signup=async(req,res)=>{
   
        try {
            console.log(req.body);
            const{email,password}=req.body;
            console.log(email,password);
//validate input
         if(!email || !password){
            return res.status(400).json({message:"Email and password are required"});}

//check if user already exists
        const existingUser=await User.findOne({email});
       if(existingUser){
       return res.status(400).json({message:"User already exists"});
     }
    bcrypt.hash(password, 10).then(async function(hash) {
    // Store hash in your password DB.
    const newUser=await User.create({
        email,
        password:hash,
    }); 
    if(newUser){
        res.status(201).json({message:"User created successfully"});
    }       
    else{
        res.status(500).json({message:"Error creating user"});
    }
}).catch(function(err) {
    console.error("Hashing error:", err);
});
  }
   catch (error) {
       console.error("Signup error:", error);
            res.status(500).json({message:" error"});
 }
    
       
}



export const signin = async (req, res) => {
  const { email, password } = req.body;

  // 1. Check email & password
  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required" });
  }

  // 2. Find user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 3. Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 4. Create JWT
  const token = generateToken(user);

  // 5. Send cookie
  res.cookie("token", token, {
    httpOnly: true,     // 🔥 cannot be accessed by JS
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  res.status(200).json({
    success: true,
    message: "Signed in successfully"
  });
};




