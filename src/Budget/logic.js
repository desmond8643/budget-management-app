
export const calculateAllSum = (budget) => {
    let allSum = 0
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ]
    days.forEach((day) => {
      if (budget[day] && budget[day].length > 0) {
        budget[day].forEach((obj) => (allSum += parseFloat(obj.cost)))
      }
    })
    return allSum.toFixed(2)
  }