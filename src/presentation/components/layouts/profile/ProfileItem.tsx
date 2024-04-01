import { FC } from 'react';

interface Props {
    title: string;
    icon: string;
}
export const ProfileItem:FC<Props> = ({title, icon}) => {
  return (
    <div className='flex items-center m-4 truncate text-md'>
    <i className={`${icon} mr-2`}></i>
    <p>{title}</p>
    </div>
  )
}
