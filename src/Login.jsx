import React from "react"
import {useNavigate} from 'react-router-dom'
import * as ROUTES from './routes'

export default function Login() {
  const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-3xl border-2 w-72">
        <h1 className="mt-10 text-center text-5xl font-semibold">Budget</h1>
        <div className="mt-10">
          <p className="text-center mb-2">Username</p>
          <input
            className="w-52 border border-gray-300 p-0 block mx-auto"
            type="text"
          />
        </div>
        <div className="mt-5 mb-8">
          <p className="text-center mb-2">Password</p>
          <input
            className="w-52 border border-gray-300 p-0 block mx-auto"
            type="password"
          />
        </div>
        <div className="flex justify-center">
          <button
            className="rounded-2xl py-2 px-4 bg-buttonBlue"
          >
            Login
          </button>
        </div>
        <div className="mb-14 flex justify-center mt-4">
          <button
            className="rounded-2xl py-2 px-4 bg-buttonBlue"
            onClick={() => navigate(ROUTES.REGISTER)}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}
