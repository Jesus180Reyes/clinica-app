import { useState } from 'react';
import { CustomTable } from '../../../components/layouts/custom_table/CustomTable';
import { Profile_View } from '../../../components/layouts/profile/Profile_View';
import { CustomButton } from '../../../components/shared/button/CustomButton';
import { CustomModal } from '../../../components/shared/modal/CustomModal';

export const SignosVitalesPage = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const colums = ['Hola', 'Como', 'esta'];
  const rows = [
    {
      title: 'NAME',
      sexo: 'STATUS',
      saludo: 'dddd'
    },
    {
      title: 'NAME',
      sexo: 'STATUS',
      saludo: 'dddd'
    },
    {
      title: 'NAME',
      sexo: 'STATUS',
      saludo: 'dddd'
    }
  ]
  return (
    <>
    <Profile_View/>
    <div >
    <CustomButton onClick={() => setIsActive(!isActive)} title='Registrar Signo Vital' marginleft='ml-5' marginTop='mt-5'/>
    </div>
    <CustomTable columns={colums}>
    {
        ...rows.map( (e) => {
          return  <>
           <tr>
          <td>{e.title}</td>
          <td>{e.saludo}</td>
           <div className='text-center flex items-center justify-center w-[100%] h-[100%]'>
          <td className='bg-yellow-300 p-1 w-[100px]  rounded-2xl'>{e.sexo}</td> 
          </div>
          
        </tr>
          
          </>
        })
      }

    </CustomTable>
    <CustomModal isActive={isActive} >
    <div>
          <h1 onClick={() => setIsActive(false)}>TOCAR PARA SALIR</h1>
      </div>
      <div className='bg-white p-2'>
        <h1>sajdlksajlkdsalkdjlk</h1>
        <h1>sajdlksajlkdsalkdjlk</h1>
        <h1>sajdlksajlkdsalkdjlk</h1>
        <h1>sajdlksajlkdsalkdjlk</h1>
        <h1>sajdlksajlkdsalkdjlk</h1>
        <h1>sajdlksajlkdsalkdjlk</h1>
      </div>
    </CustomModal>
    
  
    </>
  )
};
