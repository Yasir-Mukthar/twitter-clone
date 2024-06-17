import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"




const signup = async (req, res) => {
 try {
     const { fullName, username, email, password } = req.body;
   
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)) {
       return res.status(400).json({ error: "invalid email format" });
     }
   
     const existingUser= await User.findOne({username});
     if(existingUser){
       return res.status(400).json({error:"Username is already taken."})
     }
     const existingEmail= await User.findOne({email});
     if(existingEmail){
       return res.status(400).json({error:"email is already taken."})
     }
   
     const salt=await bcrypt.genSalt(10);
     const hashedPassword=await bcrypt.hash(password,salt);
   
     const newUser= new User({
       fullName,
       username,
       email,
       password:hashedPassword
   
     })
   
     if(newUser){
       generateTokenAndSetCookie(newUser._id,res)
       await newUser.save();
       res.status(201).json({
           _id:newUser._id,
           fullName:newUser.fullName,
           username:newUser.username,
           email:newUser.email,
           followers:newUser.followers,
           following:newUser.following,
           profileImg:newUser.profileImg,
           coverImg:newUser.coverImg
       })
     }else{
       res.status(400).json({error:"invalid user data"})
     }
 } catch (error) {
    res.status(500).json({error:"internal server error."})
    
 }

};

const login = async (req, res) => {};

const logout = async (req, res) => {
  res.json({
    message: "logout route",
  });
};

export { signup, login, logout };
