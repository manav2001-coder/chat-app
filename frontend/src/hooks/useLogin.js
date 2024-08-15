import { useState,useContext } from "react";
import { authContext } from "../context/AuthContext";
import axios from 'axios'
import toast from "react-hot-toast";

const useLogin = () => {
    const {authUser,setAuthUser} = useContext(authContext)

    const login = async ({username,password}) => {
           const success = handleLoginInputs(username,password)
           if(!success){
            return
           }
           try{
            const response = await axios.post("/auth/login",{username,password})
            if(response.data.error){
                throw new Error(response.data.error)
            }
            localStorage.setItem("chat-user",JSON.stringify(response.data))
            setAuthUser(response.data)
           }catch(error){
            if(error.response.data.hasOwnProperty('error')){
                toast.error(error.response.data.error)
            }else{
               toast.error(error.message)
            }
           }
           

    }

    return {login}

}

const handleLoginInputs = (username,password) => {
   if(!username || !password){
    toast.error("Please fill all the fields")
    return false
   }
   return true
}

export default useLogin