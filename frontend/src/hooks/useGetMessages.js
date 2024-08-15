import {useState,useEffect} from 'react'
import useConversation from '../zustand/useConversation.js'
import axios from 'axios'
import toast from 'react-hot-toast'

const useGetMessages = () => {
    const {messages,setMessages,selectedConversation} = useConversation()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getMessages = async () => {
            try{
                const chats = await axios.get(`/messages/${selectedConversation._id}`)
                if(chats.data.length==0){
                    return
                }
                setMessages(chats.data.messages)

            }catch(error){
                toast.error(error.message)
            }
        }
        getMessages()
    },[selectedConversation])

    return {loading,messages}

}

export default useGetMessages