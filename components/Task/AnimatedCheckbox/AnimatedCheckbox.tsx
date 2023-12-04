import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

interface AnimatedCheckboxProps {
  handleClickComplete: () => void
  borderColor: string
  checkColor: string
  isChecked: boolean
}

const AnimatedCheckbox = ({
  handleClickComplete,
  borderColor,
  checkColor,
  isChecked
}: AnimatedCheckboxProps) => {
  const { theme } = useTheme()

  const toggleCheck = async () => {
    await handleClickComplete()
  }

  const circleVariants = {
    checked: {
      fill: checkColor,
      stroke: checkColor
    },
    unchecked: {
      fill: 'transparent',
      stroke: theme === 'dark' ? '#fff' : borderColor
    }
  }

  const checkVariants = {
    checked: {
      opacity: 1,
      pathLength: 1
    },
    unchecked: {
      opacity: 0,
      pathLength: 0
    }
  }

  return (
    <motion.svg
      initial="unchecked"
      animate={isChecked ? 'checked' : 'unchecked'}
      onClick={toggleCheck}
      width="32"
      height="32"
      viewBox="0 0 50 50"
      style={{ cursor: 'pointer', overflow: 'visible' }}
    >
      <motion.circle
        cx="25"
        cy="25"
        r="15"
        variants={circleVariants}
        strokeWidth="2"
      />
      <motion.path
        fill="none" // Ensure the checkmark has no fill
        d="M16,25 L22,31 L34,19" // Coordinates for the tick path
        stroke="white" // White checkmark
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={checkVariants}
      />
    </motion.svg>
  )
}

export default AnimatedCheckbox
