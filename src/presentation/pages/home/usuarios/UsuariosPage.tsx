import { CustomTable } from '../../../components/layouts/custom_table/CustomTable';
import { Profile_View } from '../../../components/layouts/profile/Profile_View';
import { CustomButton } from '../../../components/shared/button/CustomButton';
import { NoPermissionGrantedComponent } from '../../../components/shared/permission/NoPermissionGrantedComponent';

export const UsuariosPage = () => {
  const isAdmin = false;

  const colums = ['COL1', 'COL2', 'COL3'];
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
  if(!isAdmin) return (<NoPermissionGrantedComponent/>);
  return <>
    <Profile_View/>
    <div>
    <CustomButton onClick={() => console.log('Click Aqui!!')} title='Crear Paciente' marginleft='ml-5' marginTop='mt-5'/>
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
