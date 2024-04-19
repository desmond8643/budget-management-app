import React, { useEffect, useState } from "react"
import {
  BsPencilSquare,
  BsFillPlusCircleFill,
  BsDashCircleFill,
  BsChevronLeft,
  BsDashCircle,
} from "react-icons/bs"
import RenameModal from "./RenameModal"
import DeleteModal from "./DeleteModal"
import AddModal from "./AddModal"
import { useParams, useNavigate } from "react-router-dom"
import { onSnapshot } from "firebase/firestore"
import { weeklyCollectionRef } from "../lib/firestoreCollections"
import * as ROUTES from "../routes"
import { calculateAllSum } from "./logic"

export default function Budget() {
  const [renameModalOpen, setRenameModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [removeButtons, setRemoveButtons] = useState(false)
  const [addModal, setAddModalOpen] = useState(false)
  const [currentDay, setCurrentDay] = useState("")

  const { id } = useParams()
  const [budget, setBudget] = useState({})
  const [eventId, setEventId] = useState("")

  let formattedDate = ""

  const navigate = useNavigate()

  useEffect(() => {
    const getBudget = onSnapshot(weeklyCollectionRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setBudget(docs.find((doc) => doc.id === id))
    })
  }, [])

  const {
    title,
    dateCreated,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  } = budget

  if (dateCreated) {
    const date = new Date(
      dateCreated.seconds * 1000 + dateCreated.nanoseconds / 1e6
    )
    formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`
  }

  const DayComponent = ({ day, color, arr }) => {
    const calculateSum = (arr) => {
      if (!arr) return 0
      if (arr.length === 0) return 0

      let sum = 0
      arr.forEach((obj) => (sum += parseFloat(obj.cost)))
      return sum
    }
    
    const sum = calculateSum(arr)

    const Object = ({ title, cost, id }) => {
      return (
        <div className="flex" style={{ justifyContent: "space-between" }}>
          <div className="flex">
            {removeButtons && (
              <BsDashCircleFill
                style={{ marginTop: "6px", color: "red" }}
                className="mr-1 cursor-pointer"
                onClick={() => {
                  setDeleteModalOpen(true)
                  setCurrentDay(day)
                  setEventId(id)
                }}
              />
            )}
            <p style={{ fontSize: "18px" }}>{title}</p>
          </div>

          <p style={{ fontSize: "18px" }}>${cost}</p>
        </div>
      )
    }

    return (
      <div style={{ backgroundColor: color }} className="mt-5 p-4 rounded-2xl">
        <div className="flex" style={{ justifyContent: "space-between" }}>
          <div className="flex">
            <h2 className="text-2xl font-semibold mr-2">{day}</h2>
            <BsFillPlusCircleFill
              className="cursor-pointer mt-1"
              style={{ fontSize: "30px" }}
              onClick={() => {
                setAddModalOpen(true)
                setCurrentDay(day)
              }}
            />
          </div>
          <h2 className="text-2xl font-semibold">${sum}</h2>
        </div>
        <div className="mt-5 mb-5">
          {arr && arr.length > 0 ? (
            arr.map((event) => {
              const { title, cost, id } = event
              return <Object title={title} cost={cost} id={id} />
            })
          ) : (
            <h2>No Events</h2>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-5 mt-3 mb-5">
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
      <h1 className="text-4xl font-semibold mt-2">{title}</h1>
      <div style={{ justifyContent: "space-between" }} className="flex mt-3">
        <div className="flex mt-2">
          <p>{formattedDate}</p>
          <BsPencilSquare
            style={{ marginLeft: "8px" }}
            className="text-2xl cursor-pointer"
            onClick={() => setRenameModalOpen(true)}
          />
          <BsDashCircle
            style={{
              marginLeft: "8px",
              color: `${removeButtons ? "red" : "black"}`,
            }}
            className="text-2xl cursor-pointer"
            onClick={() => setRemoveButtons((prevState) => !prevState)}
          />
        </div>
        <h2 className="text-2xl font-semibold" style={{ marginRight: "11px" }}>
          ${calculateAllSum(budget)}
        </h2>
      </div>
      <DayComponent arr={monday} day={"monday"} color={"#0CC0DF"} />
      <DayComponent arr={tuesday} day={"tuesday"} color={"#38B6FF"} />
      <DayComponent arr={wednesday} day={"wednesday"} color={"#5271FF"} />
      <DayComponent arr={thursday} day={"thursday"} color={"#9D44C0"} />
      <DayComponent arr={friday} day={"friday"} color={"#87C4FF"} />
      <DayComponent arr={saturday} day={"saturday"} color={"#7B66FF"} />
      <DayComponent arr={sunday} day={"sunday"} color={"#3876BF"} />
      <RenameModal
        open={renameModalOpen}
        onClose={() => setRenameModalOpen(false)}
        title={title}
        id={id}
      />
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        budget={budget}
        currentDay={currentDay}
        eventId={eventId}
        id={id}
      />
      <AddModal
        open={addModal}
        onClose={() => setAddModalOpen(false)}
        day={currentDay}
        id={id}
      />
    </div>
  )
}
