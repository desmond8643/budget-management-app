import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  BsFillPlusCircleFill,
  BsPersonCircle,
  BsThreeDotsVertical,
} from "react-icons/bs"
import EditModal from "./EditModal"
import RenameModal from "./RenameModal"
import DeleteModal from "./DeleteModal"
import AddModal from "./AddModal"
import UserModal from "./UserModal"
import { getUserBudgetByUsername } from "../services/firebase"
import { onSnapshot, orderBy, query, where } from "firebase/firestore"
import { weeklyCollectionRef } from "../lib/firestoreCollections"
import { calculateAllSum } from "../Budget/logic"

export default function Dashboard({ user, theme, setTheme }) {
  const navigate = useNavigate()

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [currentEditModal, setCurrentEditModal] = useState("")
  const [renameModalOpen, setRenameModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [userModalOpen, setUserModalOpen] = useState(false)
  const [budgets, setBudgets] = useState([])

  useEffect(() => {
    async function getBudgets() {
      const getUserInfo = await getUserBudgetByUsername(user.displayName)
      const q = query(
        weeklyCollectionRef,
        where("userId", "==", getUserInfo.userId),
        orderBy("dateCreated", "desc")
      )
      const getWeeklySnapshot = onSnapshot(q, (snapshot) => {
        const arr = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setBudgets(arr)
      })
    }
    getBudgets()
  }, [user.displayName])

  const MapBudgets = () => {
    return budgets.map((budget) => {
      const { title, dateCreated, id } = budget

      if (!dateCreated) {
        return null
      }

      const date = new Date(
        dateCreated.seconds * 1000 + dateCreated.nanoseconds / 1e6
      )
      const formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`

      const sum = calculateAllSum(budget)

      const handleEditModalOpen = (id) => {
        setCurrentEditModal(id)
        setEditModalOpen(true)
      }

      return (
        <div>
          <BsThreeDotsVertical
            className="text-2xl cursor-pointer"
            style={{ position: "absolute", right: "30px" }}
            onClick={() => {
              handleEditModalOpen(id)
            }}
          />
          <div
            className="m-3 cursor-pointer"
            onClick={() => navigate(`/budget/${id}`)}
          >
            <div className="flex" style={{ justifyContent: "space-between" }}>
              <h2 className="text-2xl">
                {title} - ${sum}
              </h2>
            </div>
            <p>{formattedDate}</p>
          </div>
          <hr></hr>
        </div>
      )
    })
  }

  return (
    <div
      className={`pt-5 px-5 ${
        theme === "dark" && "bg-backgroundDark text-white"
      }`}
    >
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="items-center mb-8"
      >
        <h1 className="text-5xl font-semibold">Weekly</h1>
        <BsPersonCircle
          style={{ fontSize: "40px", marginRight: "8px" }}
          className="cursor-pointer"
          onClick={() => setUserModalOpen(true)}
        />
      </div>
      <div
        className={`rounded-3xl border-2 w-auto h-screen ${
          theme === "dark" && "bg-foregroundDark"
        }`}
      >
        {budgets.length === 0 ? (
          <div className="flex justify-center items-center h-screen">
            <h1 className="text-4xl font-semibold">No budget list yet</h1>
          </div>
        ) : (
          <MapBudgets />
        )}
      </div>
      <EditModal
        setRenameModalOpen={setRenameModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        open={editModalOpen}
        currentEditModal={currentEditModal}
        budgets={budgets}
        onClose={() => setEditModalOpen(false)}
        theme={theme}
      />
      <RenameModal
        open={renameModalOpen}
        onClose={() => setRenameModalOpen(false)}
        currentEditModal={currentEditModal}
        budgets={budgets}
        theme={theme}
      />
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        currentEditModal={currentEditModal}
        budgets={budgets}
        theme={theme}
      />
      <AddModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        userId={user.uid}
        theme={theme}
      />
      <UserModal
        open={userModalOpen}
        displayName={user.displayName}
        onClose={() => setUserModalOpen(false)}
        theme={theme}
        setTheme={setTheme}
      />
      <BsFillPlusCircleFill
        style={{
          fontSize: "40px",
          bottom: "30px",
          right: "30px",
        }}
        className="fixed cursor-pointer"
        onClick={() => setAddModalOpen(true)}
      />
    </div>
  )
}
