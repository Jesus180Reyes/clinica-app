import { FC } from 'react';
import { SidebarEntitie } from '../../../../domain/entities/sidebar_entitie'
import { useNavigate } from 'react-router-dom';

interface Props {
    sidebarItem: SidebarEntitie;
    isActive?: boolean;
    onClick?: (id: number) => number;

}
export const SidebarItem:FC<Props> = ({sidebarItem,onClick,isActive}) => {
    const navigate = useNavigate();

    const onHandleClick = () => {
        onClick?.call(sidebarItem, sidebarItem.id);
        navigate(sidebarItem.route);
    }

  return (
    <>
      <div onClick={onHandleClick}className={`sidebar-item  ${isActive  && 'isSelected' }`} >
        <i className={`${sidebarItem.fontawesomeIcon} mr-4 w-[30%]`}></i>
        <h1 className='w-[70%]'>{sidebarItem.title} </h1>
        </div>
    </>
  )
}
