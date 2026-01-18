import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import Resume from "../models/Resume.js";
import { response } from "express";

const generateToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:'7d'})
    return token;
}

//Post : /api/users/register
export const registerUser = async(req, res) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:"Missing required fields"})
        }
        // check if user exists
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exits"})
        }

        //create new user
        const hashedPassword = bcrypt.hash(password,10);
        const newUser = await User.create({
            name, email, password:hashedPassword
        })

        //return success message
        const token = generateToken(newUser._id)
        newUser.password = undefined;
        return res.status(201).json({message:"User created successfully", token, user:newUser})
    }catch(error){
        return res.status(400).json({message: error.message})
    }
}

// Controller for user login 
// path : /api/login
export const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:"Missing required fields"})
        }
        // check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid Email or Password"})
        }

        //check if password is correct
        if(!user.comparePassword(password)){
            return res.status(400).json({message:"Invalid Email or Password"})
        }

        
        const token = generateToken(user._id)
        user.password = undefined;
        return res.status(201).json({message:"Login successful", token, user:user})
    }catch(error){
        return res.status(400).json({message: error.message})
    }
}

// Controller for getting user by id
// get: /api/user/data
export const getUserById = async(req, res) => {
    try{
        const userId = req.userId;

        //check if user exits
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        user.password = undefined;

        return res.status(201).json({user})
    }catch(error){
        return res.status(400).json({message: error.message})
    }
}


// Controller for getting user resume
// get: api/users/resume
export const getUserResume = async(req, res)=>{
    try {
        const userId = req.userId;
        // return user resume
        const resumes = await Resume.find({userId})
        return response.status(200).json({resumes});
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}