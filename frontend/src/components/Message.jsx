import React from 'react'
import { authContext } from '../context/AuthContext'
import { useContext } from 'react'
import useConversation from '../zustand/useConversation'
import { extractTime } from '../utils/extractTime'

function Message({message}) {
  const {selectedConversation} = useConversation()
  const {authUser} = useContext(authContext)
  const fromMe = authUser._id === message.senderId
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const formattedTime = extractTime(message.createdAt);
  const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : ''

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
       <div className="w-10 rounded-full">
         <img src={profilePic} alt="user avatar"/>
       </div>
      </div>
      <div className="chat-header text-gray-300">
       {fromMe ? authUser.fullName : selectedConversation.fullName}
    <time className="text-xs opacity-50 ml-2">{formattedTime}</time>
  </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
       {message.message}
      </div>
    </div>
  )
}

export default Message
