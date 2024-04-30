import React, { useEffect, useReducer, useState, useMemo } from "react"
import SelectEmojiModal from "./SelectEmojiModal"
import { emojisCollectionRef } from "../lib/firestoreCollections"
import { db } from "../lib/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { emojiList } from "./emojiList"

export default function AddModal({ open, onClose, theme, emojis, id }) {
  const [error, setError] = useState(false)
  const [input, setInput] = useState("")
  const [selectedEmoji, setSelectedEmoji] = useState("")
  const [selectEmojiModal, setSelectEmojiModal] = useState(false)

  const filteredEmojis = useMemo(
    () =>
      emojiList.filter((emoji) => {
        return emojis && !emojis.some((obj) => obj.emoji === emoji)
      }),
    [emojis]
  )

  useEffect(() => {
    setSelectedEmoji(filteredEmojis[0])
  }, [filteredEmojis])

  const handleAddClick = async () => {
    if (input.length === 0) {
      setError(true)
    } else {
      try {
        onClose()
        const documentRef = doc(db, "emojis", id)
        const documentSnapshot = await getDoc(documentRef)

        const existingData = documentSnapshot.data()
        console.log(existingData)
        existingData.emojis.push({
          emoji: selectedEmoji,
          description: input,
        })

        await setDoc(documentRef, existingData)
      } catch (error) {
        console.error("Error: ", error)
      }
    }
  }

  const Background = () => {
    return (
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
    )
  }

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-opacity ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <Background />
      <div
        style={{ padding: "0px" }}
        className={`absolute ${
          theme === "dark" ? "bg-foregroundDark" : "bg-white"
        } p-4 rounded-2xl shadow-lg w-80`}
      >
        <div className="mt-7">
          <div className="flex justify-center">
            <h2
              className={`text-3xl border border-dashed p-2 select-none cursor-pointer ${
                theme === "dark" ? "border-white" : "border-black"
              }`}
              onClick={() => setSelectEmojiModal(true)}
            >
              {selectedEmoji}
            </h2>
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
              <button
                className="rounded-2xl py-1 px-6 bg-buttonBlue"
                onClick={() => handleAddClick()}
              >
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
      <SelectEmojiModal
        open={selectEmojiModal}
        onClose={() => setSelectEmojiModal(false)}
        theme={theme}
        filteredEmojis={filteredEmojis}
        setSelectedEmoji={setSelectedEmoji}
      />
    </div>
  )
}
