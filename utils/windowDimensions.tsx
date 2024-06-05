import { useState, useEffect } from "react"

// Define a type for the dimensions
type WindowDimensions = {
  width: number
  height: number
}

const useWindowDimensions = (): WindowDimensions => {
  // Function to get the current window dimensions
  // Returns default dimensions if 'window' is undefined (e.g., during server-side rendering)
  const getWindowDimensions = (): WindowDimensions => {
    if (typeof window === "undefined") {
      return { width: 0, height: 0 }
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  // State to store the current window dimensions
  // Initialized with the current window dimensions
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(
    getWindowDimensions()
  )

  // Effect hook to handle window resize
  // Adds an event listener to the window object on mount and removes it on unmount
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return windowDimensions
}

export default useWindowDimensions
