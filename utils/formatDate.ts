/**
 * Formats a date into a UK-friendly format.
 * @param dateInput A Date object, a date string in ISO format, or undefined.
 * @returns Formatted date string in the format "Day of week | Day | Month | Year", or an empty string if input is undefined.
 */
export function formatDateToUK(dateInput: Date | string | undefined): string {
  if (!dateInput) {
    return "" // Return empty string or a default value if dateInput is undefined
  }

  // If dateInput is a string, convert it to a Date object
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput

  const dayOfWeek = date.toLocaleDateString("en-GB", { weekday: "short" })
  const day = date.getDate()
  const month = date.toLocaleDateString("en-GB", { month: "short" })
  const year = date.getFullYear()

  // Function to get the ordinal suffix for a given day number.
  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return "th"
    switch (day % 10) {
      case 1:
        return "st"
      case 2:
        return "nd"
      case 3:
        return "rd"
      default:
        return "th"
    }
  }

  return `${dayOfWeek} ${day}${getOrdinalSuffix(day)} ${month} ${year}`
}
