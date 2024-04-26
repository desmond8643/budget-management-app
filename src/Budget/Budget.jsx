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
import {
  weeklyCollectionRef,
  emojisCollectionRef,
} from "../lib/firestoreCollections"
import * as ROUTES from "../routes"
import { calculateAllSum } from "./logic"

export default function Budget({ theme, user }) {
  const [renameModalOpen, setRenameModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [removeButtons, setRemoveButtons] = useState(false)
  const [addModal, setAddModalOpen] = useState(false)
  const [currentDay, setCurrentDay] = useState("")

  const { id } = useParams()
  const [budget, setBudget] = useState({})
  const [eventId, setEventId] = useState("")

  const [emojisObj, setEmojisObj] = useState({})

  let formattedDate = ""

  const navigate = useNavigate()

  useEffect(() => {
    const getBudget = onSnapshot(weeklyCollectionRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setBudget(docs.find((doc) => doc.id === id))
    })

    const getEmoji = onSnapshot(emojisCollectionRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setEmojisObj(docs.find((doc) => doc.userId === user.uid))
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

    const sum = calculateSum(arr).toFixed(2)

    const Object = ({ title, cost, id, emoji }) => {
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
            {emoji && !removeButtons && (
              <p style={{ fontSize: "18px" }}>{emoji}</p>
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
              return (
                <Object title={title} cost={cost} id={id} emoji={event.emoji} />
              )
            })
          ) : (
            <h2>No Events</h2>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`px-5 pt-3 pb-5 ${
        theme === "dark" && "bg-backgroundDark text-white"
      }`}
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
              color: `${
                removeButtons ? "red" : theme === "dark" ? "white" : "black"
              }`,
            }}
            className="text-2xl cursor-pointer"
            onClick={() => setRemoveButtons((prevState) => !prevState)}
          />
        </div>
        <h2 className="text-2xl font-semibold" style={{ marginRight: "11px" }}>
          ${calculateAllSum(budget)}
        </h2>
      </div>
      <DayComponent
        arr={monday}
        day={"Monday"}
        color={theme === "dark" ? "#19376D" : "#0CC0DF"}
      />
      <DayComponent
        arr={tuesday}
        day={"Tuesday"}
        color={theme === "dark" ? "#0F4C75" : "#38B6FF"}
      />
      <DayComponent arr={wednesday} day={"Wednesday"} color={"#5271FF"} />
      <DayComponent arr={thursday} day={"Thursday"} color={"#9D44C0"} />
      <DayComponent
        arr={friday}
        day={"Friday"}
        color={theme === "dark" ? "#2B3595" : "#87C4FF"}
      />
      <DayComponent arr={saturday} day={"Saturday"} color={"#7B66FF"} />
      <DayComponent arr={sunday} day={"Sunday"} color={"#3876BF"} />
      <RenameModal
        open={renameModalOpen}
        onClose={() => setRenameModalOpen(false)}
        title={title}
        id={id}
        theme={theme}
      />
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        budget={budget}
        currentDay={currentDay}
        eventId={eventId}
        id={id}
        theme={theme}
      />
      <AddModal
        open={addModal}
        onClose={() => setAddModalOpen(false)}
        day={currentDay}
        id={id}
        theme={theme}
        emojisObj={emojisObj}
      />
    </div>
  )
}
