import { motion } from 'framer-motion'
import { Variants } from 'framer-motion'

const LoadingAnimation = () => {
  // Define the animation for the skeleton
  const shimmerAnimation: Variants = {
    initial: { backgroundPosition: '-100%' },
    animate: {
      backgroundPosition: '100%',
      transition: {
        repeat: Infinity,
        repeatType: 'loop', // Must be 'loop', 'reverse', or 'mirror'
        duration: 1.5,
        ease: 'linear'
      }
    }
  }

  // Define the structure of the skeleton to match your card
  return (
    <motion.div
      className="bg-gray-200 rounded-lg p-4 max-w-sm w-full mx-auto"
      variants={shimmerAnimation}
      initial="initial"
      animate="animate"
    >
      <motion.div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-400 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-gray-400 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-gray-400 rounded col-span-2"></div>
              <div className="h-2 bg-gray-400 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-gray-400 rounded"></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LoadingAnimation