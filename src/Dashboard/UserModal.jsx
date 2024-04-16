import React from "react"
import { BsPersonCircle, BsBoxArrowRight } from "react-icons/bs"

export default function UserModal({ open, displayName, onClose }) {
  return (
    <div
      className={`transition-opacity ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="fixed inset-0" onClick={onClose}></div>
      <div
        style={{
          position: "fixed",
          top: "80px",
          right: "30px",
          backgroundColor: "white",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        }}
        className="w-52 rounded-xl"
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
          className="flex mt-3 mb-2 cursor-pointer"
          style={{ justifyContent: "space-around" }}
        >
          <BsBoxArrowRight className="text-3xl" />
          <h2 className="mr-5">Logout</h2>
        </div>
      </div>
    </div>
  )
}
