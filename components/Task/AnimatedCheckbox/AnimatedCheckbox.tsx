'use client'

import useTodos from '@/hooks/todos'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

interface AnimatedCheckboxProps {
  id: number
  handleClickComplete: () => void
  borderColor: string
  checkColor: string
  isChecked: boolean
  setIsChecked: (selected: boolean) => void
}

const AnimatedCheckbox = ({
  id,
  handleClickComplete,
  borderColor,
  checkColor,
  isChecked,
  setIsChecked
}: AnimatedCheckboxProps) => {
  const { theme } = useTheme()
  const { changeComplete } = useTodos()

  const toggleCheck = async () => {
    changeComplete(id)
    setIsChecked(!isChecked)
    await handleClickComplete()
  }

  const circleVariants = {
    checked: {
      fill: checkColor,
      stroke: checkColor
    },
    unchecked: {
      fill: 'var(--completedBg)',
      stroke: theme === 'dark' ? '#fff' : borderColor,
      // Apply Tailwind CSS class for light grey when unchecked
      className: isChecked ? '' : 'stroke-gray-300'
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
      className={isChecked ? '' : 'stroke-gray-300'} // Apply Tailwind CSS class conditionally
    >
      <motion.circle
        cx="25"
        cy="25"
        r="15"
        variants={circleVariants}
        strokeWidth="2"
      />
      <motion.path
        fill="none"
        d="M16,25 L22,31 L34,19"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={checkVariants}
      />
    </motion.svg>
  )
}

export default AnimatedCheckbox
