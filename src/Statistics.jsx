import React, { useEffect, useState } from "react"
import { BsChevronLeft } from "react-icons/bs"
import {
  emojisCollectionRef,
  weeklyCollectionRef,
} from "./lib/firestoreCollections"
import { onSnapshot } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import * as ROUTES from "./routes"

export default function Statistics({ user, theme }) {
  const [expenseEmojis, setExpenseEmojis] = useState({})
  const [weekly, setWeekly] = useState({})
  const [totalCost, setTotalCost] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    const getWeekly = onSnapshot(weeklyCollectionRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setWeekly(docs.filter((doc) => doc.userId === user.uid))
    })

    const getExpenseEmojis = onSnapshot(emojisCollectionRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setExpenseEmojis(docs.find((doc) => doc.userId === user.uid).emojis)
    })
  }, [])

  const emojiContainerStyle = {
    backgroundColor: theme === "dark" ? "#6b7280" : "#D9D9D9",
  }

  const MapEmoji = () => {
    // get value for emoji
    let emojisObjectArr =
      expenseEmojis.length > 1
        ? expenseEmojis.map((obj) => {
            return { ...obj, cost: 0 }
          })
        : []
    let otherCost = 0

    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ]
    if (expenseEmojis.length > 0) {
      weekly.forEach((week) => {
        days.forEach((day) => {
          week[day].forEach((expense) => {
            const { emoji, cost } = expense
            if (!emoji) {
              otherCost += parseFloat(cost)
            } else {
              emojisObjectArr.forEach((emojiObj) => {
                if (emojiObj.emoji === emoji) {
                  emojiObj.cost += parseFloat(cost)
                }
              })
            }
          })
        })
      })
      emojisObjectArr.push({ emoji: "", cost: otherCost, description: "Other" })
    }

    const component = {
      sortedData: emojisObjectArr.sort((a, b) => b.cost - a.cost),
      totalCost: emojisObjectArr.reduce((sum, obj) => sum + obj.cost, 0),
    }
    const { sortedData, totalCost } = component
    setTotalCost(totalCost)

    return (
      sortedData.length > 1 &&
      sortedData.map((obj) => {
        const { emoji, cost, description } = obj
        const percentage = ((cost / totalCost) * 100).toFixed(2)

        return (
          <div
            className="flex justify-center bg-gray-500 rounded-2xl pt-4 pb-4 select-none mt-5"
            style={emojiContainerStyle}
          >
            <h3 className="text-2xl mr-3" style={{ lineHeight: "1.1" }}>
              {emoji}
            </h3>
            <h3 className="text-lg">
              {description} - ${cost.toFixed(2)} ({percentage}%)
            </h3>
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
      <h1 className="text-4xl font-semibold mt-2">Statistics</h1>
      <h2 className="mt-2">Total Cost: ${totalCost}</h2>
      <MapEmoji />
    </div>
  )
}
