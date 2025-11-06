import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {

  const {doctors}=useContext(AppContext);
    const doctor=doctors.slice(0,4);
  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>

      <div>
        {doctor.map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.image} alt="" />
            </div>

            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.name}</p>
              <p>{item.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.address.line1}</p>
              <p className='text-xs'>{item.address.line2}</p>
              <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>  23 July, 2024 | 8 pm  </p>
            </div>

            <div></div>

            <div className='flex flex-col gap-2 justify-end'>
               <button className='text-sm text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>
               <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>
             {/* <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
// import React from "react"
// import { useContext } from "react"
// import {AppContext} from "../context/AppContext"
// const MyAppointments=()=>{
// const {doctors}=useContext(AppContext);
// const threedoc=doctors.slice(0,3);
// console.log("nwo three",threedoc);
//     return(
//         <div>
//             <div>My Appointments</div>
//         {
//             threedoc.map((item,index)=>(
//                 <div id={index} className="flex flex-row justify-between border-b border-black mb-5 pb-4">
//                     {/* photo + desc*/}
//                     <div className="flex flex-row justify-center">
//                         {/* photo */}
//                         <img className="w-[170px] h-[170px] bg-blue-200" src={item.image}></img>
//                         {/* desc */}
//                         <div className="flex flex-col ">
//                             <p>{item.name}</p>
//                             <p>{item.speciality}</p>
//                             <p>Address</p>
//                             <p>{item.address.line1}</p>
//                             <p>{item.address.line2}</p>
//                             <p><span>Date & Time:</span>23 July, 2024 | 8pm</p>

//                         </div>
//                     </div>
//                     {/* now buttons */}
//                     <div className="flex flex-col ">
//                         <button className="border px-10 py-2 hover:bg-primary transition-all duration-300">Pay Here</button>
//                         <button className="border px-6 py-2 hover:bg-red-500 transition-all duration-300">Cancel Appointment</button>
//                     </div>
//                 </div>
//             ))
//         }
//         </div>
//     )
// }
// export default MyAppointments