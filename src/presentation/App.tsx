import { Outlet } from 'react-router-dom';
import { SideBar } from './components/layouts/SideBar';

export const App = () => {
  return (
    <>
      <div className='flex bg-[#F1F1F1]'>
        <SideBar />
        <Outlet />
      </div>
    </>
  );
};
