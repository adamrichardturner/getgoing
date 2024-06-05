"use client"

import loadingDarkMode from "@/public/loading/loadingDarkMode.svg"
import loadingLightMode from "@/public/loading/loadingLightMode.svg"
import Image from "next/image"
import { useTheme } from "next-themes"

const TasksLoadingAnimation = () => {
  const { theme } = useTheme()
  if (theme !== "dark") {
    return (
      <div className="bg-main h-screen w-full flex flex-col items-center justify-center">
        <Image
          src={loadingLightMode}
          alt={"Loading Bar"}
          height={100}
          width={100}
          priority
        />
      </div>
    )
  } else {
    return (
      <div className="bg-main h-screen w-full flex flex-col items-center justify-center">
        <Image
          src={loadingDarkMode}
          alt={"Loading Bar"}
          height={100}
          width={100}
          priority
        />
      </div>
    )
  }
}

export default TasksLoadingAnimation
