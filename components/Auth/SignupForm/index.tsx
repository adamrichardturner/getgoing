import dynamic from 'next/dynamic'
import TasksLoadingAnimation from '@/common/TasksLoadingAnimation/TasksLoadingAnimation'

const LoginFormWithNoSSR = dynamic(() => import('./SignupForm'), {
  ssr: false,
  loading: () => <TasksLoadingAnimation />, // You can replace this with your loading component
})

const MainPage = () => {
  return (
    <div>
      <LoginFormWithNoSSR />
    </div>
  )
}

export default MainPage
