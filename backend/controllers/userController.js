import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {v2 as cloudinary} from "cloudinary"
import userModel from "../models/userModel.js"
import appointmentModel from "../models/appointmentModel.js"
import doctorModel from "../models/doctorModel.js"

const registerUser=async(req,res)=>{

    console.log("inside registerUser");
    try{
        console.log("inside try block be");
        const {name,email,password}=req.body;
        if(!name || !password || !email){
            return res.json({
                success:false,
                message:"Missing Details"
            })
        }
        // validating strong password
        if(password.length<6){
            return res.json({success:false,
                message:"enter a password"
            })
        }
        console.log("creating salt")
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        

        const userData={
            name,email,password:hashedPassword
        }
        console.log("saving data in db")
        const newUser=new userModel(userData);
        const user=await newUser.save()

        const token =jwt.sign({id:user._id},process.env.JWT_SECRET);

        return res.status(200).json({
            success:true,
            token
        })
    }
    catch(error){
        console.log("error response",error.message)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const loginUser=async(req,res)=>{
    try{

        const {email,password}=req.body
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user does not exist"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"invalid password"
            })
        }
        else{
            const token=jwt.sign({
                id:user._id
            },process.env.JWT_SECRET)
            return res.status(200).json({
                success:true,
                token:token
            })
        }
    }
    catch(error){
    console.log(error)
    res.json({ success: false,
        failed:"at loginuser backend",
        message: error.message })
  }
}

const getProfile=async(req,res)=>{
    try{
        const {userId}=req.body;
        const userData=await userModel.findById(userId).select("-password");

        res.status(200).json({
            success:true,
            userData
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export {getProfile}

export {registerUser,loginUser}

const updateProfile=async(req,res)=>{
    try{
        const {userId,name,phone,address,gender}=req.body;
        const imageFile=req.file;

        if(!name || !phone || !dob || !gender){
            return res.status(400).json({
                success:false,
                message:"Data missing"
            })
        }
        await userModel.findByIdAndUpdate(userId,{name,phone,
            address:JSON.parse(address),
            dob,gender
        })
        if(imageFile){
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,
                {resource_type:'image'});
            
            const imageURL=imageUpload.secure_url;
            
            await userModel.findByIdAndUpdate(userId,{image:imageURL});
        }
        res.status(200).json({
            message:true,
            message:"Profile Updated"
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export {updateProfile}

const bookAppointment=async(req,res)=>{
    try {
        const {userId,docId,slotDate,slotTime}=req.body;
        const docData=await doctorModel.findById(docId).select("-password");
        if(!docData || !docData.available){
            return res.status(400).json({
                success:false,
                message:"doctor not available or not found"
            })
        }

        let slots_booked=docData.slots_booked;
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.status(400).json({
                    success:false,
                    message:"Slot not available"
                })
            }
            else{
                slots_booked[slotDate].push(slotTime);
            }
        }else{
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime);
        }

        const userData=await userModel.findById(userId).select('-password');
        
        const appointmentData={
            userId,docId,
            userData,docData,
            amount:docData.fees,
            slotTime,slotDate,
            date:Date.now()
        }
        const newAppointment=new appointmentModel(appointmentData);
        await newAppointment.save()

        await doctorModel.findByIdAndUpdate(docId,{slots_booked});
        return res.status(200).json({
            success:true,
            message:"Appointment Booked Successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export {bookAppointment}