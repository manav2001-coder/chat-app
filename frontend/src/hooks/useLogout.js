import { useState,useContext } from "react";
import { authContext } from "../context/AuthContext";
import axios from 'axios'
import toast from "react-hot-toast";

const useLogout = () => {
    const {authUser,setAuthUser} = useContext(authContext)

    const logout = async () => {
           try{
            await axios.get("/auth/logout")
            localStorage.removeItem("chat-user")
            setAuthUser(null)
           }catch(error){
            if(error.response.data.hasOwnProperty('error')){
                toast.error(error.response.data.error)
            }else{
               toast.error(error.message)
            }
           }
           

    }

    return {logout}

}

export default useLogout