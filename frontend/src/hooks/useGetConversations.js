import { useState,useEffect, useContext } from "react";
import axios from 'axios'
import toast from "react-hot-toast";
import { authContext } from "../context/AuthContext";

const useGetConversations = () => {
    const {search,setSearch} = useContext(authContext)
    const [loading, setLoading] = useState(false);
    const [conversations,setConversations] = useState([])
    const lsearch = search.toLowerCase()

    useEffect(() => {
        const getUsers = async () => {
            try{
                const conversations = await axios.get("/users")
                setConversations(conversations.data.filter((con) => {return con.fullName.toLowerCase().includes(lsearch)}))

            }catch(error){
                toast.error(error.message)
            }
        }
        getUsers()
    },[search])

    return {loading,conversations}

}

export default useGetConversations