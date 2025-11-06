import React, { useEffect,useContext } from "react"
import { useState } from "react"
import {useNavigate, useParams} from "react-router-dom"
import {AppContext} from "../context/AppContext"
import { assets } from "../assets/assets"

const Appointment=()=>{
    const {docId}=useParams()
    const {doctors,currencySymbol} =useContext(AppContext)
    const daysOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT']
    const navigate=useNavigate()
    const [docInfo,setDocInfo]=useState(null)
    const [docSlots,setDocSlots]=useState([])
    const [slotIndex,setSlotIndex]=useState(0)
    const [slotTime,setSlotTime]=useState('')

    const fetchDocInfo=async()=>{
        const docInfo=doctors.find(doc=>doc._id===docId)
        setDocInfo(docInfo)
    }
    useEffect(()=>{
        fetchDocInfo(docInfo)
    },[doctors,docId]);

    const getAvailableSlots=async()=>{
        setDocSlots([])
        let today=new Date();
// Mon Oct 27 2025 22:13:29 GMT+0530 (India Standard Time)
        for(let i=0;i<7;i++){
            // creating 7 days from today
            let currentDate=new Date(today)
            //makes copy of todays date object
        currentDate.setDate(today.getDate()+i);
// sets the day of the month for currentdate to current date +i.Example: if today = 27 Oct,
// then for i = 0 → 27, i = 1 → 28, … up to 2 Nov.
        
// setting end time of every date
            let endTime=new Date();
            endTime.setDate(today.getDate()+i)
            endTime.setHours(21,0,0,0)
// same day but sets the time to 9:00 PM (21:00).
// So, slots will stop generating after 9 PM for each day.
            // setting hours,minutes
    if(today.getDate()===currentDate.getDate())
    {
        currentDate.setHours(currentDate.getHours()>10?currentDate.getHours()+1:10)
        // For today, start from the next available 30-minute mark or next hour,
// but never before 10 AM.
        currentDate.setMinutes(currentDate.getMinutes()>30?30:0)
    }
    else {
        // For future days, start exactly at 10:00 AM.
        currentDate.setHours(10)
        currentDate.setMinutes(0)
    }
    let timeSlots=[]
    while(currentDate<endTime){
        // Keeps looping until the current time reaches 9 PM.
        let formattedTime=currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
        // Converts the time to a readable format like "10:00 AM"
        timeSlots.push({
            // the actual Date object (dateTime)
            dateTime:new Date(currentDate),
            time:formattedTime
        })
        // increment current time by 30 min
        currentDate.setMinutes(currentDate.getMinutes()+30)
        // Moves ahead by 30 minutes to make the next slot.
    }
    setDocSlots(prev=>([...prev,timeSlots]))
    // After finishing one day, adds all that day’s slots to the state array
        }
    }
    useEffect(()=>{
        getAvailableSlots()
    },[docInfo])

    useEffect(()=>{
        console.log(docSlots)
    },[docSlots])
    return docInfo && (
        <div>
            {/* doctor details */}
        <div className="flex flex-col sm:flex-row gap-4">
            <div>
                <img className="bg-primary w-full sm:max-w-72 rounded-lg " src={docInfo.image} alt=""></img>
            </div>
            <div className="flex-1 border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
                {/* name,degree,experience */}
                <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">{docInfo.name}<img className="w-5" src={assets.verified_icon} alt=""></img></p>
                <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                <p>
                    {docInfo.degree}-{docInfo.speciality}
                </p>
                <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
                </button>
                </div>
                {/* doctor about */}
                <div>
                    <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">About
                        <img src={assets.info_icon} alt=""></img></p>
                    <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                        {docInfo.about}
                        </p>
                </div>
            <p className="text-gray-500 font-medium mt-4">Appointment fee:<span className="text-gray-600 font-bold">{currencySymbol}{docInfo.fees}</span></p>

            </div>

        </div>
        {/* booking slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700"> 
            <p>Booking slots</p>

            <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
                {
                    docSlots.length&&docSlots.map((item,index)=>(
                        <div onClick={()=>setSlotIndex(index)}
                        className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index?'bg-primary text-white':'border border-gray-200'}`} key={index}
                        >
                        <p className="min-w-[60px]">{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                        
                        <p>{item[0] && item[0].dateTime.getDate()}</p>

                        </div>
                        
                    ))
                }

            </div>
             <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots[slotIndex].map((item, index) => (
              <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
                {item.time.toLowerCase()}
              </p>
            ))
          }
        </div>
         <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">Book an appointment</button>
        </div>
        </div>
    )
}
export default Appointment