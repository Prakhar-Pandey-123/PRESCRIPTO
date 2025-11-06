import React, {  useState } from 'react'
import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext)
    

    const logout=()=>{
      setToken(false);
localStorage.removeItem(token);
    }

  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 relative z-50'>
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />
      <ul className='hidden md:flex items-start gap-5 font-medium'>
  <li className='py-1'>
    <NavLink to='/'>HOME</NavLink>
  </li>
  <li className='py-1'>
    <NavLink to='/doctors'>ALL DOCTORS</NavLink>
  </li>
  <li className='py-1'>
    <NavLink to='/about'>ABOUT</NavLink>
  </li>
  <li className='py-1'>
    <NavLink to='/contact'>CONTACT</NavLink>
  </li>
  <li  className='py-1 text-red-900 border border-red-900 border-3 rounded-md bg-red-200 cursor-pointer px-2'>
    EMERGENCY
  </li>
</ul>

      <div className='flex items-center gap-4'>
        {
          token 
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute min-w-60 top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className=' bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={()=>logout()
                  } className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
        }

        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
        {/* mobile menu */}
      </div>
    </div>
  )
}

export default Navbar