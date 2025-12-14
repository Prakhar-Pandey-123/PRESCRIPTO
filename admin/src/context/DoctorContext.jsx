import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const DoctorContext=createContext()

const DoctorContextProvider=(props)=>{
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [dToken,setDToken]=useState(localStorage.getItem('dToken')
    ?
    localStorage.getItem('dToken')
    :
    '');
    const [dashData,setDashData]=useState(false)
    const [profileData,setProfileData]=useState(false);
    const [appointments,setAppointments]=useState([]);
// show all appointmetns to the doc
    const getAppointments=async()=>{
        try{
            console.log("at get apptn",dToken)
            const {data}=await axios.post(backendUrl+'/api/doctor/appointments',{},{headers:{dToken}})

            if(data.success){
                setAppointments(data.appointments.reverse());
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }
// doc can cancel appointment
    const cancelAppointment=async(appointmentId)=>{
        try{
            console.log("at get cancelappt",dToken)
            const {data}=await axios.post('/api/doctor/cancel-appointment',{
                appointmentId
            },{
                headers:{dToken}
            })
            if(data.success){
                toast.success(data.message)
                getAppointments()
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            toast.error(error.message)
            console.log(error);
        }
    }

    // doc can complete any appointment
    const completeAppointment=async(appointmentId)=>{
        try{
            console.log("at get completeapptn",dToken)
            const {data}=await axios.post(backendUrl+'/api/doctor/complete-appointment',{
                appointmentId
            },{
                headers:{dToken}
            })
            if(data.success){
                toast.success(data.message)
                getAppointments()
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            console.log(error)
            toast.error(error.message);
        }
    }
    // to show docs dashboard

    const getDashData=async()=>{
        try{
            console.log("inside dashdata fe")
            const {data}=await axios.post(backendUrl+'/api/doctor/dashboard' ,{},{headers:{dToken}})
            if(data.success){
                setDashData(data.dashData)
                console.log(data)
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }


    const value={
        dToken,setDToken,backendUrl,appointments,getAppointments,
        cancelAppointment,completeAppointment,dashData,getDashData
    }
    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider
