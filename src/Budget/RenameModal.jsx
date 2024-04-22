import { doc, updateDoc } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { db } from "../lib/firebase"

export default function RenameModal({ open, onClose, title, id, theme }) {
  const [input, setInput] = useState("")
  const [error, setError] = useState(false)

  useEffect(() => {
    setInput(title)
  }, [title])

  const handleRenameClick = async () => {
    if (input.length === 0) {
      setError(true)
    } else {
      try {
        onClose()
        const documentRef = doc(db, "weekly", id)
        await updateDoc(documentRef, { title: input })
      } catch (error) {
        console.error("Error: ", error)
      }
    }
  }

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-opacity ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        style={{ padding: "0px" }}
        className={`absolute ${
          theme === "dark" ? "bg-foregroundDark" : "bg-white"
        } p-4 rounded-2xl shadow-lg w-80`}
      >
        <div className="mt-3">
          <h2 className="font-semibold text-2xl text-center">Rename Title</h2>
          <div className="mb-5 mt-7">
            <div className="flex justify-center mb-2">
              <input
                type="text"
                className={`w-52 border ${
                  theme === "dark" ? "bg-backgroundDark" : "border-black"
                }`}
                value={input}
                onChange={({ target }) => setInput(target.value)}
              />
            </div>
            {error && (
              <h3 className="text-center text-red-500 font-semibold">
                Please Type Something
              </h3>
            )}
            <div className="flex justify-center mt-3 gap-7">
              <button
                className="rounded-2xl py-1 px-4 bg-buttonBlue"
                onClick={() => handleRenameClick()}
              >
                Rename
              </button>
              <button
                className="rounded-2xl py-1 px-4 bg-buttonRed"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
