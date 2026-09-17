import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn : "30d"})
}
//Register user
export const register = async(req,  res) =>{
    try{
        const {name, email, password} =req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message : "All fields are required"
            })
        }

        //check existing
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message : "User Already Exists"
            })
        }

        //encrypt/hash password
        const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

        //create user
        const user = await User.create({name, email, password: hashedPassword});

        const token = generateToken(user._id) // auto generated
        res.status(201).json({success: true, token, user});
    }
    catch(error){
        console.log("Register error", error.message);
        res.status(500).json({
            success : false,
            message : "Server error"
        })
    }

}



//Login
export const login = async(req,  res) =>{
    try{
        const {email, password} =req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message : "All fields are required"
            })
        }
        

        //check existing user
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success : false,
                message : "user not exist"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success : false,
                message : "Invalid password"
            })
        }

        const token = generateToken(user._id) // auto generated
        res.status(201).json({success: true, token, user});
    }
    catch(error){
        console.log("Login error", error.message);
        res.status(500).json({
            success : false,
            message : "Server error"
        })
    }

}

//get user
export const getUser = async(req,  res) =>{
    try{
        //middle ware for userid
        const user = await User.findById(req.userId).select("-password")
        if(!user){
            return res.status(400).json({
                success : false,
                message : "user not found"
            })
        }

        res.json({success:true, user})

    }
    catch(error){
        console.log("Get user erro", error.message);
        res.status(500).json({
            success : false,
            message : "Server error"
        })
    }

}