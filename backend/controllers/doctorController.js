import doctorModel from "../models/doctorModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const loginDoctor=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await doctorModel.findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid Credentials"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(isMatch){
            const token=jwt.sign({
                id:user._id
            },process.env.JWT_SECRET)
            return res.json({
                success:true,
                token
            })
        }
        else{
            return res.json({
                success:false,
                message:"Invalid Credentials"
            })
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }   
}

const changeAvailability=async(req,res)=>{
    try{
        const {docId}=req.body;
        const docData=await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId,{
            available: !docData.available
        })
        res.status(200).json({
            success:true,
            message:"Availability Changed"
        })
    }
    catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

const doctorList=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({}).select(['-password','-email']);
        // give every doctor hence {}, dont give password and email hence "-"

        return res.status(200).json({
            success:true,
            doctors
        })
    }
    catch(error){
        console.log(error)
        return res.status(200).json({
            success:false,
            message:error.message
        })
    }
}

export {changeAvailability,doctorList}