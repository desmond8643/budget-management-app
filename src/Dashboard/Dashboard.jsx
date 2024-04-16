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
import * as ROUTES from "../routes"
import { getUserBudgetByUsername } from "../services/firebase"

export default function Dashboard({ user }) {
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [renameModalOpen, setRenameModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [userModalOpen, setUserModalOpen] = useState(false)

  const navigate = useNavigate()

  const [budgets, setBudgets] = useState([])

  useEffect(() => {
    async function getBudgets() {
      const getBudgetList = await getUserBudgetByUsername(user.displayName)
      setBudgets(getBudgetList)
    }
    getBudgets()
  }, [user.displayName])

  console.log(budgets)

  const MapBudgets = () => {
    return budgets.map((budget) => {
      const { title, dateCreated } = budget
      const date = new Date(dateCreated)

      const formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`

      return (
        <div>
          <BsThreeDotsVertical
            className="text-2xl cursor-pointer"
            style={{ position: "absolute", right: "30px" }}
            onClick={() => setEditModalOpen(true)}
          />
          <div
            className="m-3 cursor-pointer"
            onClick={() => navigate(ROUTES.BUDGET)}
          >
            <div className="flex" style={{ justifyContent: "space-between" }}>
              <h2 className="text-2xl">
                {title} - ${}
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
    <div className="mt-5 mx-5">
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
      <div className="rounded-3xl border-2 w-auto h-screen">
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
        onClose={() => setEditModalOpen(false)}
      />
      <RenameModal
        open={renameModalOpen}
        onClose={() => setRenameModalOpen(false)}
      />
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      />
      <AddModal open={addModalOpen} onClose={() => setAddModalOpen(false)} />
      <UserModal open={userModalOpen} displayName={user.displayName} onClose={() => setUserModalOpen(false)} />
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
