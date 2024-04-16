import { useEffect, useState } from 'react';
import user from '../../../../assets/user.png';
import { ProfileItem } from './ProfileItem';
import { DateTime } from 'luxon';
import { useAuth } from '../../../hooks/auth/useAuth';
export const Profile_View = () => {
  DateTime.local().setLocale('es-mx');
  const hora = DateTime.local().toLocaleString({
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Formato de 12 horas
  });
  const [currentHour, setCurrentHour] = useState<string>(hora);
  const { user: userInfo } = useAuth();

  const fechaActual = DateTime.local().toLocaleString(DateTime.DATE_FULL);
  useEffect(() => {
    setInterval(() => {
      setCurrentHour(
        DateTime.local().toLocaleString({
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }),
      );
    }, 60000);
  });

  return (
    <>
      <div className='flex '>
        <div className='ml-4 mt-4 w-[70vw] bg-white rounded-xl h-[20vh] max-h-[30vh] flex items-center '>
          <img src={user} height={100} width={100} />
          <div className=''>
            <h1 className='m-4 text-xl font-bold'>
              Nombre de Usuario: {userInfo?.nombre}
            </h1>
            <div className='flex h-[100%]  flex-wrap'>
              <ProfileItem
                title={`Ubicacion: ${userInfo?.direccion}`}
                icon='fa-solid fa-location-dot'
              />
              <ProfileItem
                title={`DNI: ${userInfo?.dni}`}
                icon='fa-regular fa-id-card'
              />
              <ProfileItem
                title={`Correo Electronico: ${userInfo?.email}`}
                icon='fa-regular fa-envelope'
              />
            </div>
          </div>
        </div>
        <div className='mt-4 p-4 text-center h-[20vh] flex flex-col justify-center items-center  w-[10vw] '>
          <h3 className='text-sm'>{fechaActual}</h3>
          <h1 className='font-bold text-xl'>{currentHour}</h1>
        </div>
      </div>
    </>
  );
};
