import bcryptjs from "bcryptjs"
import { user } from "../Models/newModel.js";
import jwt from "jsonwebtoken";
import 'dotenv/config'

const securePassword =  async (password)=>{
    try{
      const hashPassword  = await bcryptjs.hash(password, 10);
      return hashPassword;
    }catch(e){
      console.log(e);
    }
}

export const postCreateUser = async (req, res) => {
   try{
      const spassword = await securePassword(req.body.password);

      const findEmail = await user.findOne({email: req.body.email});
      if(findEmail){
         res.status(200).json({success:false,  msg:"This email is already exists"});
      }else{
         const newUser = new user({
            email: req.body.email,
            username: req.body.username,
            password: spassword,
         })

         const generateToken = jwt.sign(
          {
          id: newUser._id, email: req.body.email,
          }, 
          process.env.JWT_SECRET, 
          { expiresIn: "1hr"})

         await newUser.save();

         res.status(200).json( {success:true, msg:"User register successfully", token: generateToken});
      }
   }catch(e){
       console.log(e);
       res.status(500).json({ success:false, msg:"Something went wrong"})
   }


}

export const postLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const matchUser = await user.findOne({ email: email});
        if(matchUser){
          const matchPassword = await bcryptjs.compare(password, matchUser.password);
          if(matchPassword){
            const generateToken = jwt.sign(
               {
               id: matchUser._id, email: matchUser.email
               }, 
               process.env.JWT_SECRET, 
               { expiresIn: "1hr"})
               
            const userResult = {
               _id: matchUser.id,
               username: matchUser.username,
               email: matchUser.email,
               token: generateToken,
             }

             const response = {
               success:true,
               msg:"login successfully",
               data: userResult,
             }

             res.status(200).json(response);
          }else{
            res.status(200).json({ success:false, msg:"wrong information"})
          }
        }else{
         res.status(200).json({ success:false, msg:"can't find user with this data"})
        }

    }catch(e){
      res.status(500).json({ success:false, msg:"Something went wrong"})
    }
}



