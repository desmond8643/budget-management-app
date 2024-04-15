import React from "react"

export default function Register() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-3xl border-2 w-72">
        <h1 className="mt-10 text-center text-5xl font-semibold">Budget</h1>
        <h2 className="mt-2 text-center font-semibold" style={{fontSize: '22px'}}>Register</h2>
        <div className="mt-5">
          <p className="text-center mb-2">Email</p>
          <input
            className="w-52 border border-gray-300 p-0 block mx-auto"
            type="text"
          />
        </div>
        <div className="mt-5">
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
        <div className="mb-3 flex justify-center mt-4">
          <button
            className="rounded-2xl py-2 px-4"
            style={{ backgroundColor: "#0CC0DF" }}
          >
            Register
          </button>
        </div>
        <p className="mb-14 text-center underline">Have an account? Sign In</p>
      </div>
    </div>
  )
}
