import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as ROUTES from "./routes"
import FirebaseContext from "./context/firebase"

export default function Login({theme}) {
  const navigate = useNavigate()
  const { firebase } = React.useContext(FirebaseContext)

  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")
  const isInvalid = password === "" || emailAddress === ""

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password)
      navigate(ROUTES.DASHBOARD)
    } catch (error) {
      setEmailAddress("")
      setPassword("")
      setError(error.message)
    }
  }

  return (
    <div className={`flex justify-center items-center h-screen ${theme === 'dark' && 'bg-backgroundDark text-white'}`}>
      <div className={`rounded-3xl border-2 w-72 ${theme === 'dark' && 'bg-foregroundDark'}`}>
        <h1 className="mt-10 text-center text-5xl font-semibold">Budget</h1>
        <form onSubmit={handleLogin} method="POST">
          <div className="mt-10">
            <p className="text-center mb-2">Email</p>
            <input
              className="w-52 border border-gray-300 p-0 block mx-auto text-black"
              type="text"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
          </div>
          <div className="mt-5 mb-5">
            <p className="text-center mb-2">Password</p>
            <input
              className="w-52 border border-gray-300 p-0 block mx-auto text-black"
              type="password"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
          </div>
          {error && <p className="text-center text-red-500 mb-5">{error}</p>}
          <div className="flex justify-center">
            <button
              className={`rounded-2xl py-2 px-4 ${theme === 'dark' ? 'bg-buttonBlueDark' : "bg-buttonBlue"}`}
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="mb-14 flex justify-center mt-4">
            <button
              className={`rounded-2xl py-2 px-4 ${theme === 'dark' ? 'bg-buttonBlueDark' : "bg-buttonBlue"}`}
              onClick={() => navigate(ROUTES.REGISTER)}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
