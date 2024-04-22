import { doc, setDoc } from "firebase/firestore"
import React from "react"
import { db } from "../lib/firebase"

export default function DeleteModal({
  open,
  onClose,
  currentDay,
  budget,
  eventId,
  id,
  theme
}) {
  const arr = budget[currentDay.toLowerCase()]
  const findObj = arr && arr.find((obj) => obj.id === eventId)
  const title = findObj && findObj.title

  const handleDeleteClick = async () => {
    try {
      onClose()
      const documentRef = doc(db, "weekly", id)
      const existingData = arr.filter((obj) => obj.id !== eventId)
      const newBudget = { ...budget, [currentDay]: existingData }

      await setDoc(documentRef, newBudget)
    } catch (error) {
      console.error("Error: ", error)
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
        className={`absolute ${theme === 'dark'? 'bg-foregroundDark':'bg-white'} p-4 rounded-2xl shadow-lg w-80`}
      >
        <div className="mt-3">
          <h2 className="font-semibold text-2xl text-center">
            Delete {title}?
          </h2>
          <div className="mb-7 mt-7">
            <div className="flex justify-center">
              <button
                className="text-white rounded-2xl py-1 px-4 bg-buttonRed"
                onClick={() => handleDeleteClick()}
              >
                Delete
              </button>
            </div>
            <div className="flex justify-center mt-3">
              <button
                className={`rounded-2xl py-1 px-4 border ${theme === 'dark' ? 'border-white' : 'border-black'}`}
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
