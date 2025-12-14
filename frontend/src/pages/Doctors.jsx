import React from "react"
import { useContext,useEffect,useState } from "react"
import {useNavigate,useParams} from "react-router-dom"
import {AppContext} from "../context/AppContext"

const Doctors=()=>{
    const {speciality}=useParams()
    // to show docs related to one field
    const [filterDoc,setFilterDoc]=useState([])
    // const [showFilter,setShowFilter]=useState(false)
    const navigate=useNavigate()
    const {doctors}=useContext(AppContext)

    const applyFilter=()=>{
        if(speciality)
            setFilterDoc(doctors.filter(doc=>doc.speciality===speciality))
        else
            setFilterDoc(doctors)
    }
    // when speciality or doctors changes then call this fn
    useEffect(()=>{
        applyFilter()
    },[doctors,speciality])

    return(
        <div>
            <p className="text-gray-600">Browse through the doctors specialist</p>
            <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
            <div className={`flex flex-col gap-4 text-sm text-gray-600`}>
{/* if u already at general phy then clicking on this moves u to the all doc, if u at all doc then clicking on this moves u to that speciality(general phy)*/}
                <p onClick={()=>speciality==='General physician'?navigate('/doctors'):navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='General physician'?'bg-indigo-100 text-black':" "}`}>
                    General physician
                </p>
                <p onClick={()=>speciality==='Gynecologist'?navigate('/doctors'):navigate('/doctors/Gynecologist')} className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Gynecologist'?'bg-indigo-100 text-black':""}`}>
                    Gynecologist
                </p>
                 <p onClick={()=>speciality==='Dermatologist'?navigate('/doctors'):navigate('/doctors/Dermatologist')} className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Dermatologist'?'bg-indigo-100 text-black':""}`}>
                    Dermatologist
                </p>
                 <p onClick={()=>speciality==='Pediatricians'?navigate('/doctors'):navigate('/doctors/Pediatricians')} className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Pediatricians'?'bg-indigo-100 text-black':""}`}>
                    Pediatricians
                </p>
                 <p onClick={()=>speciality==='Neurologist'?navigate('/doctors'):navigate('/doctors/Neurologist')} className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Neurologist'?'bg-indigo-100 text-black':""}`}>
                    Neurologist
                </p>
                 <p onClick={()=>speciality==='Gastroenterologist'?navigate('/doctors'):navigate('/doctors/Gastroenterologist')} className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Gastroenterologist'?'bg-indigo-100 text-black':""}`}>
                    Gastroenterologist
                </p>
            </div>
            {/* right section =grid */}
            <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
            {
                filterDoc.map((item,index)=>(
                    <div onClick={()=>navigate(`/appointment/${item._id}`)} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500" key={index}>
                    <img className="bg-blue" src={item.image}></img>
                    <div className="p-4">
                        <div className="flex items-center gap-2 text-sm text-center text-green-500">
                        <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                        <p className="">Available</p>
                        </div>
                    <p className="text-gray-900">{item.name}</p>
                    <p className="text-gray-600 text-sm">{item.speciality}</p>
                    </div>

                    </div>
                ))
            }
            </div>

            <div>

            </div>
            </div>
        </div>
    )
}
export default Doctors