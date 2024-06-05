function formatTimestamp(timestamp: string): string {
  let date: Date

  // Check if the input is in ISO format with time or just a date
  if (timestamp.includes("T")) {
    // Input is in full ISO format
    date = new Date(timestamp)
  } else {
    // Input is in YYYY-MM-DD format
    date = new Date(`${timestamp}T00:00:00.000Z`) // Add time component
  }

  // Get the day suffix
  const suffixes = ["th", "st", "nd", "rd"]
  const dayNum = date.getDate()
  const daySuffix =
    suffixes[
      dayNum % 10 <= 3 && Math.floor(dayNum / 10) !== 1 ? dayNum % 10 : 0
    ]

  // Format the date parts
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" }) // "Mon", "Tue", etc.
  const month = date.toLocaleDateString("en-US", { month: "short" }) // "Jan", "Feb", etc.
  const year = date.toLocaleDateString("en-US", { year: "numeric" })

  return `${weekday} ${dayNum}${daySuffix} ${month} ${year}`
}

export default formatTimestamp
