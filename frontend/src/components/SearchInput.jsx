import React, { useContext, useRef } from 'react'
import { CiSearch } from "react-icons/ci";
import { useState } from 'react';
import { authContext } from '../context/AuthContext';
import useGetConversations from "../hooks/useGetConversations.js";
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation'

export default function SearchInput() {
  
  const {search,setSearch} = useContext(authContext)
  const {selectedConversation, setSelectedConversation} = useConversation()
  const {loading,conversations} = useGetConversations()
  const handleSubmit = (e) => {
     e.preventDefault();
     if(search.length<3){
      toast.error("Search term must be at least 3 characters long")
      return
     }

     const conversation = conversations[0];
     if(!conversation){
      return toast.error("User not found")

     }else{
      setSelectedConversation(conversation)
     }
     
     
     
  }
  return (
    <div>
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <input type="text" className="input input-bordered rounded-full bg-gray-800 text-white focus:outline-none" placeholder='Search...'  onChange={(e) => setSearch(e.target.value)} />
        <button type="submit" className="btn btn-circle bg-sky-500 text-white border-none shadow-sm">
          <CiSearch className="w-6 h-6 outline-none" />
        </button>
      </form>
    </div>
  )
}
