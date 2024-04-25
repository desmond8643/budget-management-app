import React, { useState } from "react"
import { db } from "../lib/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

export default function DeleteModal({
  onClose,
  open,
  theme,
  currentEditEmoji,
  id,
}) {
  const [loading, setLoading] = useState(false)

  const handleDeleteClick = async () => {
    setLoading(true)
    onClose()

    try {
      const docRef = doc(db, "emojis", id)
      const documentSnapshot = await getDoc(docRef)

      const existingData = documentSnapshot.data()
      const filteredEmojiData = existingData.emojis.filter(
        (obj) => obj.description !== currentEditEmoji
      )

      const updatedObj = {
        ...existingData,
        emojis: filteredEmojiData,
      }

      console.log(updatedObj)

      await setDoc(docRef, updatedObj)
    } catch (error) {
      console.log("Error deleting emoji:", error)
    } finally {
      setLoading(false)
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
          <h2 className="font-semibold text-2xl text-center">
            {loading
              ? "Deleting..."
              : currentEditEmoji
              ? `Delete ${currentEditEmoji}?`
              : ""}
          </h2>
          <div className="mb-7 mt-7">
            <div className="flex justify-center">
              <button
                disabled={loading}
                className="text-white rounded-2xl py-1 px-4 bg-buttonRed"
                onClick={() => handleDeleteClick()}
              >
                Delete
              </button>
            </div>
            <div className="flex justify-center mt-3">
              <button
                className={`rounded-2xl py-1 px-4 border ${
                  theme === "dark" ? "border-white" : "border-black"
                }`}
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
