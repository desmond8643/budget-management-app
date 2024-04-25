import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { onSnapshot } from "firebase/firestore"
import { emojisCollectionRef } from "../lib/firestoreCollections"
import * as ROUTES from "../routes"
import { BsChevronLeft, BsPlusCircle } from "react-icons/bs"
import AddModal from "./AddModal"
import EditModal from "./EditModal"
import DeleteModal from "./DeleteModal"

export default function ExpenseEmoji({ theme, user }) {
  const navigate = useNavigate()

  const [emojisObj, setEmojisObj] = useState({})
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [currentEditEmoji, setCurrentEditEmoji] = useState("")

  console.log(emojisObj)
  const { emojis, id } = emojisObj

  const emojiContainerStyle = {
    backgroundColor: theme === "dark" ? "#6b7280" : "#D9D9D9",
  }

  useEffect(() => {
    const getEmoji = onSnapshot(emojisCollectionRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setEmojisObj(docs.find((doc) => doc.userId === user.uid))
    })
  }, [])

  const MapEmoji = () => {
    return (
      emojis &&
      emojis.map((emojiObj) => {
        const { description, emoji } = emojiObj
        return (
          <div
            className="flex justify-center bg-gray-500 rounded-2xl pt-4 pb-4 select-none cursor-pointer mt-5"
            style={emojiContainerStyle}
            onClick={() => {
              setEditModal(true)
              setCurrentEditEmoji(description)
            }}
          >
            <h3 className="text-2xl mr-3" style={{ lineHeight: "1.1" }}>
              {emoji}
            </h3>
            <h3 className="text-lg">{description}</h3>
          </div>
        )
      })
    )
  }

  return (
    <div
      className={`px-5 pt-3 pb-5 ${
        theme === "dark" && "bg-backgroundDark text-white"
      } min-h-screen`}
    >
      <div
        className="cursor-pointer"
        style={{ display: "inline-grid" }}
        onClick={() => navigate(ROUTES.DASHBOARD)}
      >
        <div className="flex">
          <BsChevronLeft className="mt-1" />
          <p>Weekly</p>
        </div>
      </div>
      <h1 className="text-4xl font-semibold mt-2">Expense Emoji</h1>
      <div className="mt-10">
        <div
          className="flex justify-center rounded-2xl pt-4 pb-4 select-none cursor-pointer"
          style={emojiContainerStyle}
          onClick={() => setAddModal(true)}
        >
          <BsPlusCircle
            className="text-2xl mr-3"
            style={{ marginTop: "3px" }}
          />
          <h3 className="text-lg">Add Custom Emoji</h3>
        </div>
      </div>
      <MapEmoji />
      <AddModal
        open={addModal}
        theme={theme}
        onClose={() => setAddModal(false)}
        emojis={emojis}
        id={id}
      />
      <EditModal
        theme={theme}
        onClose={() => setEditModal(false)}
        currentEditEmoji={currentEditEmoji}
        open={editModal}
        setDeleteModal={setDeleteModal}
      />
      <DeleteModal
        theme={theme}
        onClose={() => setDeleteModal(false)}
        open={deleteModal}
        currentEditEmoji={currentEditEmoji}
        id={id}
      />
    </div>
  )
}
