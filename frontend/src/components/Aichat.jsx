import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Aichat() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const seeDoc = async () => {
    const docName = "Dr Rahul Sharama";
    try {
      const res = await axios.post("http://localhost:4000/api/user/getDoc", {
        docName: docName,
      });

      console.log("res=", res);
      let id = res.data.id;
      console.log("id=", id);

      navigate(`/appointment/${id}`);
    } catch (err) {
      toast.error("can't get docId");
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    setInput("");
    try {
      const res = await fetch("http://localhost:4000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || `HTTP ${res.status}`);
      }

      const cleanReply = (data.reply || "")
        .replace(/<think>[\s\S]*?<\/think>/g, "")
        .trim();

      setMessages((prev) => [...prev, { user: text, bot: cleanReply }]);

      const startIndex = cleanReply.lastIndexOf("*");
      const endIndex = cleanReply.lastIndexOf(",");
      // const docName=cleanReply.substr(startIndex+1,endIndex);
    } catch (err) {
      console.log(err);
      setMessages((prev) => [
        ...prev,
        { user: text, bot: `Error : ${err.message}` },
      ]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Chat container */}
      <div className="h-[70vh] overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 shadow-sm space-y-4">
        {messages.map((m, i) => (
          <div key={i} className="space-y-2">
            {/* User bubble */}
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl bg-blue-600 text-white px-4 py-2">
                <div className="text-xs opacity-90 mb-1">You</div>
                <div className="whitespace-pre-wrap break-words">{m.user}</div>
              </div>
            </div>

            {/* AI bubble */}
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl bg-gray-100 text-gray-900 px-4 py-2">
                <div className="text-xs text-gray-500 mb-1">AI</div>
                <div className="whitespace-pre-wrap break-words">{m.bot}</div>

                {/* Keep your existing navigation behavior */}
                <div className="mt-3">
                  <button
                    onClick={seeDoc}
                    className="rounded-md bg-black px-3 py-2 text-sm text-white"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 rounded-md border border-gray-300 bg-blue-100 px-3 py-2 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Enter
        </button>
      </div>
    </div>
  );
}

export default Aichat;
// import axios from "axios";
// import {useState} from "react";
// import { toast } from "react-toastify";

// import { useNavigate } from "react-router-dom";
// function Aichat(){
//   const navigate=useNavigate()
//   const [input,setInput]=useState("");
//   const [messages,setMessages]=useState([])
//   // const [docId,setDocId]=useState("");


//   const seeDoc=async()=>{
//     const docName="Dr Rahul Sharama";
//       try{
//         const res=await axios.post("http://localhost:4000/api/user/getDoc",{
//           docName:docName          
//         })
//         console.log("res=",res);
//         let id=res.data.id;
      
//         console.log("id=",id);
        
//         navigate(`/appointment/${id}`)
//       }
//       catch(err){
//         toast.error("can't get docId");
//       }
//   }

//   const sendMessage=async()=>{
//     const text=input.trim()
//     if(!text) return;

//     setInput("");
//     try{
//       const res=await fetch("http://localhost:4000/chat",{
//         method:"POST",
//         headers:{"Content-Type":"application/json"},
//         body:JSON.stringify({message:text}),
//       })

//       const data=await res.json()
//       if(!res.ok){
//         throw new Error(data?.error || `HTTP ${res.status}`);
//       }
//       const cleanReply=(data.reply ||"").replace(/<think>[\s\S]*?<\/think>/g,"").trim()
//       setMessages((prev)=>[...prev,{user:text,bot:cleanReply}]);

//       const startIndex=cleanReply.lastIndexOf("*");
//       const endIndex=cleanReply.lastIndexOf(",");
//       // const docName=cleanReply.substr(startIndex+1,endIndex);
      

//     }
//     catch(err){
//       console.log(err);
//       setMessages((prev)=>[
//         ...prev,{
//           user:text,bot:`Error : ${err.message}`
//         }
//       ])
//     }
//   }
//   return(
//     <div>
//       <div>
//         {
//           messages.map((m,i)=>(
//             <div key={i}>
//               <b>You : </b> {m.user} <br/>
//               <b>AI : </b> {m.bot} <br/>
//               <button 
//               onClick={seeDoc}>See doc</button>
             
//               </div>
//           ))
//         }
//         </div>
//         <div className="flex flex-col">
           
//         <input 
//         className="bg-blue-200"
//           value={input}
//           onChange={(e)=>setInput(e.target.value)}
//           onKeyDown={(e)=>e.key==="Enter" && sendMessage()}
//         >
//         </input>
//         <button onClick={sendMessage}
//           className="bg-black text-white"
//         >CLick me</button>
//         </div>
      
//     </div>
//   )
// }
// export default Aichat