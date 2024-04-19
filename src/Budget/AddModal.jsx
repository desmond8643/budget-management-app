import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { db } from "../lib/firebase"

export default function AddModal({ open, onClose, day, id }) {
  const [titleInput, setTitleInput] = useState("")
  const [costInput, setCostInput] = useState("")
  const [titleError, setTitleError] = useState(false)
  const [costError, setCostError] = useState(false)

  function isNumberWithTwoDecimalPlaces(value) {
    const regex = /^\d+(\.\d{1,2})?$/
    return !isNaN(value) && regex.test(value)
  }

  const handleAddClick = async () => {
    if (titleInput.length === 0) {
      setTitleError(true)
      return
    }
    if (!isNumberWithTwoDecimalPlaces(costInput)) {
      setCostError(true)
      return
    }

    try {
      const addId = uuidv4()
      onClose()
      const documentRef = doc(db, "weekly", id)
      const documentSnapshot = await getDoc(documentRef)

      const existingData = documentSnapshot.data()
      existingData[day].push({
        id: addId,
        title: titleInput,
        cost: costInput,
      })

      await setDoc(documentRef, existingData)

      setTitleInput("")
      setCostInput("")
      setTitleError(false)
      setCostError(false)

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
        className="absolute bg-white p-4 rounded-2xl shadow-lg w-80"
      >
        <div className="mt-3">
          <h2 className="font-semibold text-2xl text-center">Add Event</h2>
          <div className="mb-5 mt-2">
            <h3 className="text-center mb-2">Title</h3>
            <div className="flex justify-center mb-2">
              <input
                type="text"
                className="w-52 border border-black"
                onChange={({ target }) => setTitleInput(target.value)}
                value={titleInput}
                
              />
            </div>
            <h3 className="text-center mb-2">Cost</h3>
            <div className="flex justify-center mb-2">
              <input
                type="text"
                className="w-52 border border-black"
                onChange={({ target }) => setCostInput(target.value)}
                value={costInput}
              
              />
            </div>
            {titleError && (
              <h3 className="text-center text-red-500 font-semibold">
                Please type Something
              </h3>
            )}
            {costError && (
              <h3 className="text-center text-red-500 font-semibold">
                Please type a number with 2 decimal places
              </h3>
            )}
            <div className="flex justify-center mt-3 gap-7">
              <button
                className="rounded-2xl py-1 px-6 bg-buttonBlue"
                onClick={() => handleAddClick()}
              >
                Add
              </button>
              <button
                className="rounded-2xl py-1 px-5 bg-buttonRed"
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
