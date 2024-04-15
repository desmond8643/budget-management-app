import React, { useState } from "react"
import {
  BsPencilSquare,
  BsFillPlusCircleFill,
  BsDashCircleFill,
} from "react-icons/bs"
import RenameModal from "./RenameModal"
import DeleteModal from "./DeleteModal"
import AddModal from "./AddModal"

export default function Budget() {
  const [renameModalOpen, setRenameModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [addModal, setAddModalOpen] = useState(false)

  const DayComponent = ({ day, color }) => {
    const Object = ({ title, cost }) => {
      return (
        <div className="flex" style={{ justifyContent: "space-between" }}>
          <div className="flex">
            <BsDashCircleFill
              style={{ marginTop: "6px", color: "red" }}
              className="mr-1 cursor-pointer"
              onClick={() => setDeleteModalOpen(true)}
            />
            <p style={{ fontSize: "18px" }}>{title}</p>
          </div>

          <p style={{ fontSize: "18px" }}>${cost}</p>
        </div>
      )
    }

    return (
      <div style={{ backgroundColor: color }} className="mt-5 p-4 rounded-2xl">
        <div className="flex" style={{ justifyContent: "space-between" }}>
          <h2 className="text-2xl font-semibold">{day}</h2>
          <h2 className="text-2xl font-semibold">$100</h2>
        </div>
        <div className="flex mt-4" style={{ justifyContent: "flex-end" }}>
          <BsPencilSquare
            className="cursor-pointer"
            style={{ marginRight: "15px", fontSize: "30px" }}
          />
          <BsFillPlusCircleFill
            className="cursor-pointer"
            style={{ fontSize: "30px" }}
            onClick={() => setAddModalOpen(true)}
          />
        </div>
        <div className="mt-5 mb-5">
          <Object title={"Bus"} cost={4.3} />
          <Object title={"Train"} cost={9} />
          <Object title={"Arcade"} cost={60} />
          <Object title={"Bus"} cost={4.3} />
        </div>
      </div>
    )
  }

  return (
    <div className="mx-5 mt-5 mb-5">
      <h1 className="text-5xl font-semibold">Budget</h1>
      <div style={{ justifyContent: "space-between" }} className="flex mt-3">
        <div className="flex mt-2">
          <p style={{ marginLeft: "11px" }}>13/4/2024</p>
          <BsPencilSquare
            style={{ marginLeft: "8px" }}
            className="text-2xl cursor-pointer"
            onClick={() => setRenameModalOpen(true)}
          />
        </div>
        <h2 className="text-2xl font-semibold" style={{ marginRight: "11px" }}>
          $900
        </h2>
      </div>
      <DayComponent day={"Monday"} color={"#0CC0DF"} />
      <DayComponent day={"Tueday"} color={"#38B6FF"} />
      <DayComponent day={"Wednesday"} color={"#5271FF"} />
      <DayComponent day={"Thursday"} color={"#9D44C0"} />
      <DayComponent day={"Friday"} color={"#87C4FF"} />
      <DayComponent day={"Saturday"} color={"#7B66FF"} />
      <DayComponent day={"Sunday"} color={"#3876BF"} />
      <RenameModal
        open={renameModalOpen}
        onClose={() => setRenameModalOpen(false)}
      />
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      />
      <AddModal open={addModal} onClose={() => setAddModalOpen(false)} />
    </div>
  )
}
