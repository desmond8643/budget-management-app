import { addDoc, serverTimestamp } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { emojisCollectionRef } from "../lib/firestoreCollections"

export default function AddModal({ open, onClose, theme, emojis }) {
  const [error, setError] = useState(false)
  const [input, setInput] = useState("")
  const [selectedEmoji, setSelectedEmoji] = useState("")

  const emojiList = [
    "⚽️",
    "🎧",
    "🚌",
    "✈️",
    "🍗",
    "🎮",
    "🛒",
    "🐶",
    "💊",
    "🥤",
    "👕",
    "👟",
    "💪🏻",
  ]
  /*
    emoji
    sports, music, transport, flight, 
    food, entertainment, shopping, pet
    medical, drink, clothing, shoes, 
    gym
  */

  const filteredEmojis = emojiList.filter((emoji) => {
    return emojis && !emojis.some((obj) => obj.emoji === emoji)
  })

  useEffect(() => {
    setSelectedEmoji(filteredEmojis[0])
  }, [filteredEmojis])

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
        <div className="mt-7">
          <div className="flex justify-center">
            <h2 className="text-3xl border border-dashed p-2 select-none cursor-pointer">{selectedEmoji}</h2>
          </div>
          <div className="mb-5 mt-7">
            <div className="flex justify-center mb-2">
              <input
                type="text"
                className={`w-52 border ${
                  theme === "dark" ? "bg-backgroundDark" : "border-black"
                } text-center`}
                onChange={({ target }) => setInput(target.value)}
              />
            </div>
            {error && (
              <h3 className="text-center text-red-500 font-semibold">
                Please Type Something
              </h3>
            )}
            <div className="flex justify-center mt-5 gap-7">
              <button className="rounded-2xl py-1 px-6 bg-buttonBlue">
                Add
              </button>
              <button
                className="rounded-2xl py-1 px-5 bg-buttonRed"
                onClick={() => {
                  onClose()
                  setError(false)
                }}
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
