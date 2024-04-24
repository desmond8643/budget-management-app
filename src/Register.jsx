import React, {useEffect} from "react"
import { Link, useNavigate } from "react-router-dom"
import FirebaseContext from "./context/firebase"
import * as ROUTES from "./routes"
import { doesUsernameExist } from "./services/firebase"
import { onAuthStateChanged } from "firebase/auth"

export default function Register({theme}) {
  const { firebase } = React.useContext(FirebaseContext)
  const navigate = useNavigate()

  const [username, setUsername] = React.useState("")
  const [emailAddress, setEmailAddress] = React.useState("")
  const [password, setPassword] = React.useState("")

  const [error, setError] = React.useState("")
  const isInvalid = password === "" || emailAddress === ""

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth(), (user) => {
      if (user) {
        navigate(ROUTES.DASHBOARD)
      }
    })

    return () => unsubscribe()
  }, [firebase, navigate])

  const handleRegister = async (event) => {
    event.preventDefault()

    const usernameDoesNotExists = await doesUsernameExist(username)
    if (!usernameDoesNotExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password)

        await createdUserResult.user.updateProfile({
          displayName: username,
        })

        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          emailAddress: emailAddress.toLowerCase(),
          dateCreated: Date.now(),
        })

        await firebase.firestore().collection("emojis").add({
          userId: createdUserResult.user.uid,
          emojis: [
            {emoji: '🚌', description: 'Transport'},
            {emoji: '🍗', description: 'Food'},
            {emoji: '🎮', description: 'Entertainment'},
            {emoji: '🛒', description: 'Shopping'}
          ]
        })

      } catch (error) {
        setEmailAddress("")
        setPassword("")
        setUsername("")
        setError(error.message)
      }

    } else {
      setError("Username already exists")
    }
  }

  return (
    <div className={`flex justify-center items-center h-screen ${theme === 'dark' && 'bg-backgroundDark text-white'}`}>
      <div className={`rounded-3xl border-2 w-72 ${theme === 'dark' && 'bg-foregroundDark'}`}>
        <h1 className="mt-10 text-center text-5xl font-semibold">Budget</h1>
        <h2
          className="mt-2 text-center font-semibold"
          style={{ fontSize: "22px" }}
        >
          Register
        </h2>
        <form onSubmit={handleRegister} method="POST">
          <div className="mt-5">
            <p className="text-center mb-2">Email</p>
            <input
              className="w-52 border border-gray-300 p-0 block mx-auto text-black"
              type="text"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
          </div>
          <div className="mt-5">
            <p className="text-center mb-2">Username</p>
            <input
              className="w-52 border border-gray-300 p-0 block mx-auto text-black"
              type="text"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
          </div>
          <div className="mt-5 mb-2">
            <p className="text-center mb-2">Password</p>
            <input
              className="w-52 border border-gray-300 p-0 block mx-auto text-black"
              type="password"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
          </div>
          {error && <p className="text-center text-red-500">{error}</p>}
          <div className="mb-3 flex justify-center mt-8">
            <button
              className={`rounded-2xl py-2 px-4 ${theme === 'dark' ? 'bg-buttonBlueDark' : "bg-buttonBlue"}`}
              disabled={isInvalid}
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        <Link to="/login">
          <p className="mb-14 text-center hover:underline">
            Have an account? Sign In
          </p>
        </Link>
      </div>
    </div>
  )
}
