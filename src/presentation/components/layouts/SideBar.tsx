import { useState } from 'react';
import { sidebarData } from '../../../domain/datasources/sidebar_data';
import { SidebarItem } from './sidebar/SidebarItem';
import { useAuth } from '../../hooks/auth/useAuth';

export const SideBar = () => {
  const [isActiveCategory, setIsActiveCategory] = useState<number>(1);
  const {logOut} = useAuth();
  const onHandleClick = (id: number) => {
    setIsActiveCategory(id);
    return id;
  };
  
  return (
    <>
      <div className='sidebar-container'>
        <h1 className='text-3xl text-center flex items-center justify-center font-bold h-[10%]  text-ellipsis'>
          Clinica UTH
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
        <div onClick={logOut}>
        <SidebarItem
          sidebarItem={{
            title: 'Cerrar Sesion',
            fontawesomeIcon: 'fa-solid fa-arrow-right-from-bracket',
            id: 100,
            route: 'auth/trabajadores/login',
          }}
          />
          </div>
      </div>
    </>
  );
};
