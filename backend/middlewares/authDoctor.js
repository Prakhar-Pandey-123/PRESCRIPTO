import jwt from "jsonwebtoken"

const authDoctor=async(req,res,next)=>{
    const dToken=req.headers.dtoken;
    console.log("dToken in auth",dToken)
    if(!dToken){
        return res.json({
            success:false,
            message:"un authorized doctors"
        })
    }
    try{
        const token_decode=jwt.verify(dToken,process.env.JWT_SECRET)
        req.body.docId=token_decode.id;
        next()
    }
    catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

export default authDoctor