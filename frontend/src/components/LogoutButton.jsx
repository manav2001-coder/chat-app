import React from 'react'
import { BiLogOut } from 'react-icons/bi'
import axios from 'axios'
import { authContext } from '../context/AuthContext'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import useLogout from '../hooks/useLogout'

function LogoutButton() {
  const {logout} = useLogout()
  const {authUser,setAuthUser} = useContext(authContext)
  const signOut = async () => {
    await logout()
     
  }
  return (
    <div className="mt-auto">
      <BiLogOut className="w-6 h-6 text-white cursor-pointer" onClick={signOut} />
    </div>
  )
}

export default LogoutButton
