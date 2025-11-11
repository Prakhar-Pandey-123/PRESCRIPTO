import doctorModel from "../models/doctorModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js";

const loginDoctor=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const doctor=await doctorModel.findOne({email});

        if(!doctor){
            return res.status(400).json({
                success:false,
                message:"Invalid Credentials"
            })
        }
        const isMatch=await bcrypt.compare(password,doctor.password);
        if(isMatch){
            const token=jwt.sign({
                id:doctor._id
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
export {loginDoctor}

// show all appointments of a doc on his dashboard

const appointmentDoctor=async(req,res)=>{
    try{
        const {docId}=req.body;
        const appointments=await appointmentModel.find({docId});

        res.status(200).json({
            success:true,
            appointments
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
export {appointmentDoctor}

// doctor can cancel his appointment

const appointmentCancel=async(req,res)=>{
    try{
        const {docId,appointmentId}=req.body;
        const appointmentData=await appointmentModel.findById(appointmentId);

        if(appointmentData && appointmentData.docId===docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
            return res.status(200).json({
                success:true,
                message:"Appointment cancelled"
            })
        }
        return res.json({
            success:false,
            message:"cannot cancel appointment"
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
export {appointmentCancel}

// doctor can mark any appointment as completed
const appointmentComplete=async(req,res)=>{
    try{
        const {docId,appointmentId}=req.body;

        const appointmentData=await appointmentModel.findById(appointmentId);

        if(appointmentData && appointmentCancel.docId===docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})

            return res.json({
                success:true,
                message:"appointment completed"
            })
        }
        return res.json({
            success:false,
            message:"appointment cant be completed"
        })
    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}
export {appointmentComplete}

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
// show all docs on frontend
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

// show dashboard of a doc
const doctorDashboard=async(req,res)=>{
    try{
        const {docId}=req.body
        const appointments=await appointmentModel.find({docId})

        let earnings=0;
        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings+=item.amount;
            }
        })
        let patients=[]

        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData={
            earnings,
            appointments:appointments.length,
            patients:patients.length,
            latestAppointments:appointments.reverse()
        }
        return res.json({
            success:true,
            dashData
        })
    }
    catch(error){
        console.log(error)
        return res.json({
            success:false,
            message:error.message
        })
    }
}
export {doctorDashboard}