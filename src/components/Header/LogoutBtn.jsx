import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {

    const dispatch = useDispatch()

    const handleLogout = () => {
      authService.logout().then(()=>{
        dispatch(logout())
      }).catch((err)=> {throw err})
    }

  return (
    <button className='block px-6 py-2 duration-200 w-full rounded mb-2 sm:bg-white hover:bg-blue-100 bg-gray-300'
    onClick={handleLogout}
    >Logout</button>
  )
}

export default LogoutBtn