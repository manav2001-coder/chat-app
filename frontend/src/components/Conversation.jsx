import React from 'react'
import { getRandomEmoji } from '../utils/emojis'
import useConversation from '../zustand/useConversation'
import { SocketContext } from '../context/SocketContext'
import { useContext } from 'react'

function Conversation({emoji,conversation,lastIdx}) {
  const { socket,onlineUsers } = useContext(SocketContext)
  const {selectedConversation,setSelectedConversation} = useConversation()
  const isSelected = conversation._id === selectedConversation?._id
  console.log(onlineUsers)
  const isOnline = onlineUsers ? onlineUsers.find((id) => id === conversation._id) : false
  
  return (
    <>
      <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? 'bg-sky-500' : ''}`} onClick={() => setSelectedConversation(conversation)}>
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
            <div className="w-12 rounded-12">
                <img src={conversation.profilePic} alt="user avatar"/>
            </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
              <p className="font-bold text-gray-200">{conversation.fullName}</p>
              <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
     {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  )
}

export default Conversation
