import { useState } from 'react';
import { sidebarData } from '../../../domain/datasources/sidebar_data';
import { SidebarItem } from './sidebar/SidebarItem';

export const SideBar = () => {
  const [isActiveCategory, setIsActiveCategory] = useState<number>(1);
  const onHandleClick = (id: number) => {
    setIsActiveCategory(id);
    return id;
  };
  return (
    <>
      <div className='sidebar-container'>
        <h1 className='text-3xl text-center flex items-center justify-center font-bold h-[10%]  text-ellipsis'>
          Clinica La pope
        </h1>
        <div className='sidebar-items-col'>
          {...sidebarData.map((e) => (
            <SidebarItem
              sidebarItem={e}
              isActive={isActiveCategory === e.id}
              onClick={onHandleClick}
            />
          ))}
        </div>
        <SidebarItem
          sidebarItem={{
            title: 'Cerrar Sesion',
            fontawesomeIcon: 'fa-solid fa-arrow-right-from-bracket',
            id: 100,
            route: '/auth/login',
          }}
        />
      </div>
    </>
  );
};
