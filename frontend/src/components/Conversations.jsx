import React from 'react'
import Conversation from './Conversation'
import { useState,useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { getRandomEmoji } from '../utils/emojis'
import useGetConversations from '../hooks/useGetConversations'

function Conversations() {
  const { loading,conversations } = useGetConversations()
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {
        conversations.map((conversation,index) => <Conversation key={index} emoji={getRandomEmoji()} conversation={conversation} lastIdx={index===conversations.length-1} />)
      }
    </div>
  )
}

export default Conversations
