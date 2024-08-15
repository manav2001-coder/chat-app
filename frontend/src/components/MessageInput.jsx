import React from 'react'
import { BsSend } from 'react-icons/bs'
import { useState,useContext } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
import axios from 'axios'
import { authContext } from '../context/AuthContext'

function MessageInput() {
  const {authUser,setAuthUser} = useContext(authContext)
  const {selectedConversation,setSelectedConversation} = useConversation()
  const {messages,setMessages} = useConversation()
  const [message,setMessage] = useState("")

  const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const res = await axios.post(`/messages/send/${selectedConversation._id}`,{message:message})
        setMessages([...messages,res.data.new_message])
        setMessage("")

      }catch(error){
        toast.error(error.message)
      }
  }
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
          <input type="text" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white focus:outline-none" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Send a message"/>
          <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-300">
              <BsSend />
          </button>
      </div>
    </form>
  )
}

export default MessageInput
