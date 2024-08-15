import { useState, useContext } from "react";
import toast from "react-hot-toast"
import axios from 'axios'
import { authContext } from "../context/AuthContext";

const useSignup =  () => {
    const [loading,setLoading] = useState(false)
    const {authUser,setAuthUser} = useContext(authContext)
    
    const signup = async ({fullName,username,password,confirmPassword,gender}) => {
        const success = handleInputErrors({fullName,username,password,confirmPassword,gender})

        if(!success){
            return
        }
        setLoading(true)

        try{
            const response = await axios.post("/auth/signup",{fullName,username,password,confirmPassword,gender})
            if(response.data.error){
                toast.error(response.data.error)
            }
            
            localStorage.setItem("chat-user",JSON.stringify(response.data))
            setAuthUser(response.data)


        }catch(error){
            if(error.response.data.hasOwnProperty('error')){
                toast.error(error.response.data.error)
            }else{
                toast.error(error.message)
            }
        }finally{
            setLoading(false)
        }

        

    }

    return { loading,signup }
}

export default useSignup;


const handleInputErrors = ({fullName,username,password,confirmPassword,gender}) => {
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error("Please fill in all the fields");
        return false
    }

    if(password !== confirmPassword){
        toast.error("Passwords do not match");
        return false
    }

    if(password.length<6){
        toast.error("The password should be of atleast 6 characters")
        return false
    }

    return true
}