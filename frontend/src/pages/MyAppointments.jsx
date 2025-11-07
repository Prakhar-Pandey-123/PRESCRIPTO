import React, { useContext,useEffect,useState } from 'react'
import {toast} from "react-toastify"
import axios from 'axios'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {

  const {backendUrl,token,getDoctorsData}=useContext(AppContext);

  const cancelAppointment=async(appointmentId)=>{
    try{
      const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{
      appointmentId
    },{
      headers:{token}
    })

    if(data.success){
      toast.success(data.message)
      getUseAppointments()
      getDoctorsData()
    }else{
      toast.error(data.message);
    }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(token){
      getUseAppointments()
    }
  },[token])

  const [appointments,setAppointments]=useState([]);

  const getUseAppointments=async()=>{
    try{
      const {data}=await axios.post(backendUrl+'/api/user/appointments',{},
        {headers:{
        token
      }})

      if(data.success){
        setAppointments(data.appointments);
        console.log("these are all the appointments",data.appointments);
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message);
    }
  }
  useEffect(()=>{
    getUseAppointments()
  },[])
   
  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>

      <div>
        {appointments.map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
            </div>

            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {item.slotDate} | {item.slotTime} </p>
            </div>

            <div></div>

            <div className='flex flex-col gap-2 justify-end'>
               {!item.cancelled && <button className='text-sm text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
               {
                !item.cancelled && 
                <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300 px-1'>Cancel Appointment</button>
               }
               {
                item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 text-red-500 bg-red-200 rounded-md px-1'>Appointment Cancelled</button>
               }
            
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
