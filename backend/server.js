import express from "express"
// express =nodejs framework
import cors from "cors"
// cors=cross origin resource sharing,accept req from diff port of frontend
import 'dotenv/config'
import adminRouter from "./routes/adminRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import userRouter from "./routes/userRoute.js"

import connectCloudinary from "./config/cloudinary.js"
connectCloudinary()

import connectDB from "./config/mongodb.js"
connectDB()

const app=express()//express instance,name=app
const port=process.env.PORT || 4000

app.use(express.json())
//parse incoming JSON data in requests
app.use(cors())

// api end points
app.use('/api/admin',adminRouter);
app.use("/api/user",userRouter);
app.use("/api/doctor",doctorRouter)

app.get('/',(req,res)=>{
    res.send("api working")
})


app.listen(port,()=>console.log("server started at port ",port)) 

