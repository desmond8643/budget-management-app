import React, { useState } from "react"
import { BsFillPlusCircleFill, BsPersonCircle } from "react-icons/bs"
import EditModal from "./EditModal"
import RenameModal from "./RenameModal"
import DeleteModal from "./DeleteModal"
import AddModal from "./AddModal"
import UserModal from "./UserModal"

export default function Dashboard() {
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [renameModalOpen, setRenameModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [userModalOpen, setUserModalOpen] = useState(false)

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
        {/* <div className="flex justify-center items-center h-screen">
          <h1 className="text-4xl font-semibold">No budget list yet</h1>
        </div> */}
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
      <UserModal open={userModalOpen} onClose={() => setUserModalOpen(false)} />
      <BsFillPlusCircleFill
        style={{
          fontSize: "40px",
          cursor: "pointer",
          position: "fixed",
          bottom: "30px",
          right: "30px",
        }}
        onClick={() => setAddModalOpen(true)}
      />
    </div>
  )
}
