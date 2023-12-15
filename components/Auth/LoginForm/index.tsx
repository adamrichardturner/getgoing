import dynamic from 'next/dynamic';
import TasksLoadingAnimation from '@/common/TasksLoadingAnimation/TasksLoadingAnimation';

const LoginFormWithNoSSR = dynamic(() => import('./LoginForm'), {
  ssr: false,
  loading: () => <TasksLoadingAnimation />, // You can replace this with your loading component
});

const MainPage = () => {
  return (
    <div>
      {/* Other components... */}
      <LoginFormWithNoSSR />
      {/* Other components... */}
    </div>
  );
};

export default MainPage;
