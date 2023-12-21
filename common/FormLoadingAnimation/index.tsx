import loadingDarkMode from '@/public/loading/loadingDarkMode.svg'
import loadingLightMode from '@/public/loading/loadingLightMode.svg'
import Image from 'next/image'

const FormLoadingAnimation = (isLightMode: any) => {
  if (isLightMode) {
    return (
      <div className='h-full w-full flex flex-col items-center justify-center'>
        <Image
          src={loadingLightMode}
          alt={'Loading Bar'}
          height={100}
          width={100}
          priority
        />
      </div>
    )
  } else if (!isLightMode)
    return (
      <div className='h-full w-full flex flex-col items-center justify-center'>
        <Image
          src={loadingDarkMode}
          alt={'Loading Bar'}
          height={100}
          width={100}
          priority
        />
      </div>
    )
}

export default FormLoadingAnimation
