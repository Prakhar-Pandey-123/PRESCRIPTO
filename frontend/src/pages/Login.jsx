import React from "react"
import {useState,useEffect} from "react"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { useContext } from "react"
console.log()
const Login=()=>{

    const {token,setToken}=useContext(AppContext);
    const backendUrl="http://localhost:4000";
    const navigate=useNavigate()

    const [state,setState]=useState('Sign Up')
    const [name,setName] =useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const onSubmitHandler=async(e)=>{
        console.log("inside submit fn 1")
        e.preventDefault()
        try{
            console.log("inside submit fn2")
            console.log(state);
            if(state==="Sign Up"){
            const {data}=await axios.post(backendUrl+'/api/user/register',{name,password,email});
            console.log("after response from backend");
        if(data.success){
            localStorage.setItem("token",data.token);
            setToken(data.token);
        }
        else{
            toast.error(data.message);
        }
        }
        else{
            const {data}=await axios.post(backendUrl+'/api/user/login',{email,password})
            if(data.success){
                localStorage.setItem('token',data.token);
                setToken(data.token);
            }
            else{
                toast.error(data.message);
            }
        }

        }
        catch(error){
            console.log("error in cathch of frontend")
            console.log(error.message)
            toast.error(error.message);
        }   
    }
    useEffect(()=>{
        if(token) navigate('/')
    },[token])

return(
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
            <p className="text-2xl font-bold">
            {state==="Sign Up"?"Create Account":"Login"}
            </p>
            <p>Please {state==='Sign Up'?'Sign Up':'Log In'} to book appointment</p>
            {
                state==='Sign Up' &&(
                    <div className="w-full">
                        <p>Full Name</p>
                    <input className="border border-zinc-300 rounded w-full p-2 mt-1" type="text" onChange={(e)=>setName(e.target.value)} value={name} required></input>
                    </div>
                )
            }
            <div className="w-full">
            <p>Email</p>
            <input className="border border-zinc-300 rounded w-full p-2 mt-1" type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required></input>
            </div>

            <div className="w-full">
                <p>Password</p>
                <input className="border border-zinc-300 rounded w-full p-2 mt-1" type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required></input>
            </div>

            <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">{state==='Sign Up'?"Create Account":"Login"}</button>

            {
                state==="Sign Up"
                ?
                <p>Already have an account ? <span onClick={()=>setState('Login')} className="text-primary underline cursor-pointer">Login here</span></p>
                :
                <p>Create a new account ? <span onClick={()=>setState('Sign Up')} className="text-primary underline cursor-pointer">Click here</span></p>
            }
        </div>
    </form>
)
}
export default Login