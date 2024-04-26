import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { db } from "../lib/firebase"
import { BiChevronDown } from "react-icons/bi"
import { AiOutlineSearch } from "react-icons/ai"

export default function AddModal({ open, onClose, day, id, theme, emojisObj }) {
  const [titleInput, setTitleInput] = useState("")
  const [costInput, setCostInput] = useState("")
  const [titleError, setTitleError] = useState(false)
  const [costError, setCostError] = useState(false)

  const [openSelect, setOpenSelect] = useState(false)
  const [selectedEmoji, setSelectedEmoji] = useState("")
  const [inputValue, setInputValue] = useState("")

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

      const obj = {
        id: addId,
        title: titleInput,
        cost: costInput,
      }

      if (selectedEmoji !== "None") {
        obj.emoji = selectedEmoji
      }

      existingData[day.toLowerCase()].push(obj)

      await setDoc(documentRef, existingData)

      setTitleInput("")
      setCostInput("")
      setTitleError(false)
      setCostError(false)
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  console.log(selectedEmoji)

  const Selector = () => {
    const { emojis } = emojisObj

    const ShowSelectedEmoji = () => {
      const description =
        selectedEmoji &&
        emojis.find((emoji) => emoji.emoji === selectedEmoji).description

      return (
        <h2>
          {selectedEmoji && selectedEmoji !== "None" && selectedEmoji}{" "}
          {description
            ? description?.length > 25
              ? description?.substring(0, 25) + "..."
              : description
            : "Select Expense Emoji"}
        </h2>
      )
    }
    return (
      <div className="mt-3 mb-5">
        <div className="flex justify-center">
          <div
            onClick={() => setOpenSelect(!openSelect)}
            className={`bg-white w-60 p-2 flex items-center justify-between rounded-2xl text-black`}
          >
            <ShowSelectedEmoji />
            <BiChevronDown
              size={20}
              className={`${openSelect && "rotate-180"}`}
            />
          </div>
        </div>
        <div>
          <div
            className={`fixed ${openSelect && "inset-0"}`}
            onClick={() => setOpenSelect(!openSelect)}
          ></div>
          <ul
            className={`bg-white mt-2 overflow-y-auto ${
              openSelect ? "max-h-60" : "max-h-0"
            } text-black absolute left-11`}
          >
            <div className="flex items-center px-2 sticky top-0 bg-white">
              <AiOutlineSearch size={18} className="text-gray-700" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                placeholder="Enter emoji description"
                className="placeholder:text-gray-700 p-2 outline-none"
              />
            </div>
            <li
              className="p-2 text-sm hover:bg-sky-600 hover:text-white"
              onClick={() => {
                setSelectedEmoji("None")
                setOpenSelect(false)
                setInputValue("")
              }}
            >
              None
            </li>
            {emojis &&
              emojis.map((obj) => (
                <li
                  key={obj?.description}
                  className={`p-2 text-sm hover:bg-sky-600 hover:text-white
          ${
            obj?.description?.toLowerCase() === selectedEmoji?.toLowerCase() &&
            "bg-sky-600 text-white"
          }
          ${
            obj?.description?.toLowerCase().startsWith(inputValue)
              ? "block"
              : "hidden"
          }`}
                  onClick={() => {
                    if (
                      obj?.description?.toLowerCase() !==
                      selectedEmoji.toLowerCase()
                    ) {
                      setSelectedEmoji(obj?.emoji)
                      setOpenSelect(false)
                      setInputValue("")
                      setTitleInput(obj?.description)
                    }
                  }}
                >
                  {obj?.emoji} {obj?.description}
                </li>
              ))}
          </ul>
        </div>
      </div>
    )
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
          <h2 className="font-semibold text-2xl text-center">Add Event</h2>
          <Selector />
          <div className="mb-5 mt-2">
            <div className="flex justify-center mb-4">
              <h2 className={`absolute`} style={{ left: "50px" }}>
                $
              </h2>
              <input
                type="text"
                className={`w-60 border ${
                  theme === "dark" ? "bg-backgroundDark" : "border-black"
                } text-center`}
                onChange={({ target }) => setCostInput(target.value)}
                value={costInput}
                maxLength="20"
              />
            </div>
            <div className="flex justify-center mb-2">
              <input
                type="text"
                className={`w-60 border ${
                  theme === "dark" ? "bg-backgroundDark" : "border-black"
                } text-center`}
                onChange={({ target }) => setTitleInput(target.value)}
                value={titleInput}
                placeholder="Description"
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
