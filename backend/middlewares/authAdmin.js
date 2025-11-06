import jwt from "jsonwebtoken"

// admin authentication middleware
const authAdmin=async(req,res,next)=>{
    try{
        const {atoken}=req.headers;
        if(!atoken){
            return res.status(400).json({
                success:false,
                message:"not authorized ,login again"
            })
        }
        const token_decode=jwt.verify(atoken,process.env.JWT_SECRET);
        if(token_decode !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.status(400).json({
                success:false,
                message:"not authorized, login again"
            })
        }
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

export default authAdmin

// export default authAdmin 
// .you must import it like this:
// import authAdmin from "./path";


// export { authAdmin }
// then you must import it with curly braces:
// import { authAdmin } from "./path";