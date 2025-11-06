import express from "express"
import jwt from "jsonwebtoken"

const authUser=async(req,res,next)=>{
    try{
        const {token}=req.headers;
        console.log("token in authuser",token);
        if(!token){
            return res.json({
                success:false,
                message:"Not authorized Login again"
            })
        }
        // we have inserted user id while creating token and inserted it in token , now we are verifing and getting back the id from the token 

        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decode.id;
        next();
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export default authUser
