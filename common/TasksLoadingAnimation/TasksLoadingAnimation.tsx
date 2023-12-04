import loadingDarkMode from '@/public/loading/loadingDarkMode.svg'
import loadingLightMode from '@/public/loading/loadingLightMode.svg'
import Image from 'next/image'

const TasksLoadingAnimation = (isLightMode: any) => {
  if (isLightMode) {
    return (
      <Image
        src={loadingLightMode}
        alt={'Loading Bar'}
        height={100}
        width={100}
      />
    )
  } else if (!isLightMode)
    return (
      <Image
        src={loadingDarkMode}
        alt={'Loading Bar'}
        height={100}
        width={100}
      />
    )
}

export default TasksLoadingAnimation
