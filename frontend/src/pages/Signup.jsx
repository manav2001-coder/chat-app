import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import useSignup from '../hooks/useSignup.js'

function Signup() {
  const [inputs,setInputs] = useState({
    fullName:"",
    username:"",
    password:"",
    confirmPassword:"",
    gender:"male"
  })

  const { loading,signup } = useSignup();

  const register = async (e) => {
    e.preventDefault();
    await signup(inputs)
    
  }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <h1 className="text-3xl font-semibold text-center text-gray-300">
           Signup
           <span className='text-blue-500'> ChatApp</span>
        </h1>
        <form onSubmit={register}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Full Name</span>
            </label>
            <input type="text" value={inputs.fullName} onChange={(e) => setInputs({...inputs , fullName:e.target.value}) }  className="w-full input input-bordered h-10 bg-gray-800 focus:outline-none text-white" />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input type="text" value={inputs.username} onChange={(e) => setInputs({...inputs,username:e.target.value})} className="w-full input input-bordered h-10 bg-gray-800 focus:outline-none text-white" />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input type="password" value={inputs.password} onChange={(e) => setInputs({...inputs,password:e.target.value})} placeholder="Enter password" className="w-full input input-bordered h-10 bg-gray-800 focus:outline-none text-white" />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Confirm Password</span>
            </label>
            <input type="password" value={inputs.confirmPassword} onChange={(e) => setInputs({...inputs,confirmPassword:e.target.value})} placeholder="Confirm password" className="w-full input input-bordered h-10 bg-gray-800 focus:outline-none text-white" />
          </div>
          <Link to="/login" className="text-gray-300 text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
            Already have an account?
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2 bg-gray-800 border-none text-white hover:text-gray-800" type="submit">Signup</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
