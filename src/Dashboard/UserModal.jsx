import React from "react"
import {
  BsPersonCircle,
  BsBoxArrowRight,
  BsToggleOff,
  BsToggleOn,
  BsEmojiSmile
} from "react-icons/bs"
import * as ROUTES from "../routes"
import { useNavigate } from "react-router-dom"
import FirebaseContext from "../context/firebase"

export default function UserModal({
  open,
  displayName,
  onClose,
  theme,
  setTheme,
}) {
  const { firebase } = React.useContext(FirebaseContext)
  const navigate = useNavigate()

  return (
    <div
      className={`transition-opacity ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      } ${theme === "dark" && "text-white"}`}
    >
      <div className="fixed inset-0" onClick={onClose}></div>
      <div
        style={{
          top: "80px",
          right: "30px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        }}
        className={`absolute w-52 rounded-xl ${
          theme === "dark" ? "bg-black" : "bg-white"
        }`}
      >
        <div
          className="flex mt-3 mb-3"
          style={{ justifyContent: "space-evenly" }}
        >
          <BsPersonCircle className="text-4xl" />
          <h2 className="text-xl mt-1">{displayName}</h2>
        </div>
        <hr></hr>
        <div
          className="flex mt-3 mb-5 cursor-pointer"
          style={{ justifyContent: "space-around" }}
        >
          <BsEmojiSmile className="text-3xl ml-3" />
          <h2
            className="mr-5"
            onClick={() => {
              navigate(ROUTES.EMOJI)
            }}
          >
            Emoji Expenses
          </h2>
        </div>
        {theme === "light" && (
          <div
            className="flex mt-3 mb-2 cursor-pointer"
            style={{ justifyContent: "space-around" }}
          >
            <h2 className="ml-5">Light Mode</h2>
            <BsToggleOff
              className="text-3xl cursor-pointer"
              onClick={() => {
                setTheme("dark")
                localStorage.setItem("theme", "dark")
              }}
            />
          </div>
        )}
        {theme === "dark" && (
          <div
            className="flex mt-3 mb-2 cursor-pointer"
            style={{ justifyContent: "space-around" }}
          >
            <h2 className="ml-5">Dark Mode</h2>
            <BsToggleOn
              className="text-3xl cursor-pointer"
              onClick={() => {
                setTheme("light")
                localStorage.setItem("theme", "light")
              }}
            />
          </div>
        )}
        <div
          className="flex mt-3 mb-2 cursor-pointer"
          style={{ justifyContent: "space-around" }}
        >
          <BsBoxArrowRight className="text-3xl" />
          <h2
            className="mr-5"
            onClick={() => {
              firebase.auth().signOut()
              navigate(ROUTES.LOGIN)
            }}
          >
            Logout
          </h2>
        </div>
      </div>
    </div>
  )
}
