import express from "express"

import {doctorList,loginDoctor,appointmentCancel,appointmentComplete, appointmentDoctor,doctorDashboard} from "../controllers/doctorController.js"

import authDoctor from "../middlewares/authDoctor.js"; 

const doctorRouter=express.Router()

doctorRouter.get("/list",doctorList);
doctorRouter.post('/login',loginDoctor);
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel);
doctorRouter.post('/appointments',authDoctor,appointmentDoctor)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete);
doctorRouter.post('/dashboard',authDoctor,doctorDashboard)


export default doctorRouter