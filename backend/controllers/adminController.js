import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from "jsonwebtoken"


// api for adding doctor
const addDoctor=async(req,res)=>{
    try{
        const {name,email,password,speciality,degree,experience,about,fees,address}=req.body;
        console.log(name)
        const imageFile=req.file;
        // validating all the inputs
        if(!name ||!email || !password|| !speciality || !about || !fees ||!address)
            return res.status(400).json({
        success:false,
        message:"missing details"
        })
        
        // using validator use check email
        if(!validator.isEmail(email))
            return res.json({
        success:false,
        message:"Please enter a valid email"
    })
    // strong password needed
    if(password.length<8)
        return res.status(400).json({
    success:false,
    message:"Please enter a strong password"
    })
    // hasing password on a salt[5 to 15]
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
    // upload image to cloudinary
    const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'});
    const imageUrl=imageUpload.secure_url;

    const doctorData={
        name,
        email,
        image:imageUrl,
        password:hashedPassword,
        speciality,
        degree,
        experience,
        about,
        fees,
        address:JSON.parse(address),
        date:Date.now()
    }
    const newDoctor=new doctorModel(doctorData)
    await newDoctor.save();
    res.status(200).json({
        success:true,
        message:"Doctor added"
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

export {addDoctor}

const loginAdmin=(req,res)=>{
    try{
        const {email,password}=req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.status(200).json({
                success:true,
                token
            })
        }
        else{
            req.status(400).json({
                success:false,
                message:error.message
            });
        }
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
} 

export {loginAdmin}

const allDoctors=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({}).select('-password');
        res.status(200).json({success:true,doctors});
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message:error.message});
    }
}
export {allDoctors};







// 1. User Login
// User enters email + password on the frontend.
// These are sent (via HTTPS) to the backend /login route.
// 2. Server Checks Credentials
// Server finds the user in the database by email
// The stored password is hashed (using bcrypt).
// Server uses bcrypt.compare() to check:
// const isMatch = await bcrypt.compare(enteredPassword, user.password);
// If isMatch is false, login fails.
// If true, it means the password is correct.
// 3. Create JWT
// Now the user is verified, so server creates a JWT:
// const payload = { id: user._id, email: user.email, role: user.role };
// const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
// This token proves the user’s identity for future requests.
// 4. Send Token to Client
// Server sends the token to the frontend.
// The frontend stores it in:
// localStorage (simple but less secure), or
// HTTP-only cookie (more secure).
// 5. Subsequent Requests
// Every time the user calls a protected route,
// the browser sends the token in the header:
// Authorization: Bearer <token>
// 6. Verify Token on Server
// The server verifies the token:
// const decoded = jwt.verify(token, process.env.JWT_SECRET);
// If valid → server knows this is an authenticated user.
// If invalid or expired → access denied.