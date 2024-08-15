import React, { useEffect,useState,useRef } from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import useListenMessages from '../hooks/useListenMessages'

function Messages() {
  const {loading,messages} = useGetMessages()
  useListenMessages()
  const lastMessageRef = useRef()
  useEffect(() => {
    setTimeout(() => {lastMessageRef.current?.scrollIntoView({behaviour: "smooth"})},200)
  },[messages])
  return (
    <div className="px-4 flex-1 overflow-auto">
      {
        messages.length ? messages.map((message,index) => <div ref={lastMessageRef}> <Message key={index} message={message}  /></div>): <p className='text-center text-white mt-2'>Send a message to start the conversation</p>

      }
    </div>
  )
}

export default Messages
