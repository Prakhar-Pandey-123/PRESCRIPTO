// context is similar to redux ,both allow components to share a global state without passing props down manually(which may cause prop drilling) but difference is that context is light weight and redux is external and advance, global state can contain variables, objects(user info)...another difference is that when global variable changes then context re-renders all the components that consume it while redux/recoil re render only necessary
// Prop drilling means passing data (props) from a parent component down to deeply nested child components — even if some middle components don’t actually need that data.

// import React, { createContext, useContext } from "react";
// const MyContext = createContext();=======creating context object=====
// function App() {
//   const user = { name: "Prakhar", role: "Student" }; 
//   return (
//     <MyContext.Provider value={user}>
// ===== this provides value to all the component inside it ====
//       <Child />
//     </MyContext.Provider>
//   );
// }

// function Child() {
//   const data = useContext(MyContext);
// =====useContext is hook to read the values from the provider=======
//   return (
//     <h1>
//       {data.name} - {data.role}
//     </h1>
//   );
// }
// Flow of Data
// We create a Context → createContext().
// In App, we wrap everything inside MyContext.Provider and pass user.
// Child doesn’t get user as a prop. Instead, it directly uses useContext(MyContext) to grab it.
// Finally, Child shows "Prakhar - Student" on screen
import { createContext } from "react"
import { toast } from "react-toastify"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);

    const [userData, setUserData] = useState(false);

    const getDoctorsData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/list');
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message);
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }
    useEffect(() => {
        getDoctorsData()
    }, [])

    const loadUserProfileData = async () => {
        try {
            
            // for axios the first arg is body and headers is second arg
            const { data } = await axios.post(backendUrl + '/api/user/get-profile', {},{
                headers: {
                    token: token
                }
            }
            )
            console.log("data of user from context",data);
            console.log(data.userData)
            if (data.success) {
                setUserData(data.userData)
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        if(token)
            loadUserProfileData()
        else setUserData(false)
    },[token]);


    const value = { 
        doctors, getDoctorsData, token, setToken, backendUrl, userData, setUserData ,loadUserProfileData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider
