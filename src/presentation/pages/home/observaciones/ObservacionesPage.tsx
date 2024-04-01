import { CustomTable } from '../../../components/layouts/custom_table/CustomTable';
import { Profile_View } from '../../../components/layouts/profile/Profile_View';
import { CustomButton } from '../../../components/shared/button/CustomButton';

export const ObservacionesPage = () => {
  const colums = ['Hola', 'Como', 'esta'];
  const rows = [
    {
      title: 'culo',
      sexo: 'sexo',
      saludo: 'dddd'
    },
    {
      title: 'culo',
      sexo: 'sexo',
      saludo: 'dddd'
    },
    {
      title: 'culo',
      sexo: 'sexo',
      saludo: 'dddd'
    }
  ]
  return <>
    <Profile_View/>
    <div >
    <CustomButton onClick={() => console.log('Click Aqui!!')} title='Crear Observacion' marginleft='ml-5' marginTop='mt-5'/>
    </div>
    <CustomTable columns={colums} >
    {
        ...rows.map( (e) => {
          return  <>
           <tr>
          <td>{e.title}</td>
          <td>{e.saludo}</td>
          {/* <td>{e.sexo}</td> */}
           <div className='text-center flex items-center justify-center w-[100%] h-[100%]'>
          <td className='bg-yellow-300 p-1 w-[100px]  rounded-2xl'>{e.sexo}</td> 
          </div>
          
        </tr>
          
          </>
        })
      }
    </CustomTable>



  </>;
};
