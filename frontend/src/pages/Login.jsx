import React from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../hooks/useLogin'
import { useState } from 'react'

function Login() {
  const [inputs,setInput] = useState({
    username:"",
    password:""
  })
  const {login} = useLogin()
  const signin = async (e) => {
      e.preventDefault()
      await login(inputs)
  }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
           Login
           <span className='text-blue-500'> ChatApp</span>
        </h1>
        <form onSubmit={signin}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input type="text" value={inputs.username} onChange={(e) => setInput({...inputs, username:e.target.value})} placeholder="Enter username" className="input input-bordered w-full bg-gray-800 text-white focus:outline-none"></input>
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input type="password" value={inputs.password} onChange={(e) => setInput({...inputs,password:e.target.value})} placeholder="Enter password" className="input input-bordered w-full bg-gray-800 text-white focus:outline-none"></input>
          </div>
          <Link to="/signup" className="text-gray-300 text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
            Don't have an account?
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2 bg-gray-800 border-none text-white hover:text-gray-800">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
