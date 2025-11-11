import React, { useContext } from "react"
import Login from "./pages/Login"
 import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from "./context/AdminContext";
import Sidebar from "./components/Sidebar"
import {Route,Routes} from "react-router-dom"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import DoctorsList from "./pages/Admin/DoctorsList";
import AddDoctor from './pages/Admin/AddDoctor';
import { DoctorContext } from "./context/DoctorContext";
import DoctorDahboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

const App=()=>{

  const {aToken}=useContext(AdminContext);
  const {dToken}=useContext(DoctorContext)
  return aToken || dToken?(
    <div className="bg-[#F8F9FD]">
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <div className="flex items-start">
        <Sidebar></Sidebar>

        <Routes>

          <Route path='/' element={<></>}></Route>
          <Route path='/admin-dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route path="/all-appointments" element={<AllAppointments></AllAppointments>}></Route>
          <Route path="/add-doctor" element={<AddDoctor></AddDoctor>}></Route>
          <Route path="/doctor-list" element={<DoctorsList></DoctorsList>}></Route>

{/* doctor routes */}
          <Route path="/doctor-dashboard" element={<DoctorDahboard></DoctorDahboard>}></Route>

          <Route path="/doctor-appointments" element={<DoctorAppointments></DoctorAppointments>}></Route>

          <Route path="/doctor-profile" element={<DoctorProfile />}></Route>


        </Routes>
      </div>
    </div>
  ):(
    <>
      <Login></Login>
      <ToastContainer></ToastContainer>
    </>
  )
}
export default App


// Flat routes (no nesting) =/login, /about, /contact= no outlet use
// Nested routes (shared layout)=/admin/dashboard, /admin/appointments=use outlet