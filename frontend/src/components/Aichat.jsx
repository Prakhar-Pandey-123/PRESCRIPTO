import axios from "axios";
import {useState} from "react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
function Aichat(){
  const navigate=useNavigate()
  const [input,setInput]=useState("");
  const [messages,setMessages]=useState([])
  // const [docId,setDocId]=useState("");


  const seeDoc=async()=>{
    const docName="Dr Rahul Sharama";
      try{
        const res=await axios.post("http://localhost:4000/api/user/getDoc",{
          docName:docName          
        })
        console.log("res=",res);
        let id=res.data.id;
      
        console.log("id=",id);
        
        navigate(`/appointment/${id}`)
      }
      catch(err){
        toast.error("can't get docId");
      }
  }

  const sendMessage=async()=>{
    const text=input.trim()
    if(!text) return;

    setInput("");
    try{
      const res=await fetch("http://localhost:4000/chat",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({message:text}),
      })

      const data=await res.json()
      if(!res.ok){
        throw new Error(data?.error || `HTTP ${res.status}`);
      }
      const cleanReply=(data.reply ||"").replace(/<think>[\s\S]*?<\/think>/g,"").trim()
      setMessages((prev)=>[...prev,{user:text,bot:cleanReply}]);

      const startIndex=cleanReply.lastIndexOf("*");
      const endIndex=cleanReply.lastIndexOf(",");
      // const docName=cleanReply.substr(startIndex+1,endIndex);
      

    }
    catch(err){
      console.log(err);
      setMessages((prev)=>[
        ...prev,{
          user:text,bot:`Error : ${err.message}`
        }
      ])
    }
  }
  return(
    <div>
      <div>
        {
          messages.map((m,i)=>(
            <div key={i}>
              <b>You : </b> {m.user} <br/>
              <b>AI : </b> {m.bot} <br/>
             
              </div>
          ))
        }
        </div>
        <div className="flex flex-col">
           <button 
              onClick={seeDoc}>See doc</button>
        <input 
        className="bg-blue-200"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          onKeyDown={(e)=>e.key==="Enter" && sendMessage()}
        >
        </input>
        <button onClick={sendMessage}
          className="bg-black text-white"
        >CLick me</button>
        </div>
      
    </div>
  )
}
export default Aichat