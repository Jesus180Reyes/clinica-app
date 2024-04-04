import { CustomTable } from '../../../components/layouts/custom_table/CustomTable';
import { Profile_View } from '../../../components/layouts/profile/Profile_View';

export const FacturacionPage = () => {
  const colums = ['Hola', 'Como', 'esta'];
  const rows = [
    {
      title: 'NAME',
      sexo: 'STATUS',
      saludo: 'dddd',
    },
    {
      title: 'NAME',
      sexo: 'STATUS',
      saludo: 'dddd',
    },
    {
      title: 'NAME',
      sexo: 'STATUS',
      saludo: 'dddd',
    },
  ];

  return (
    <>
      <Profile_View />
      <CustomTable columns={colums}>
        {...rows.map((e) => {
          return (
            <tr>
              <td>{e.title}</td>
              <td>{e.saludo}</td>
              <td>{e.sexo}</td>
              {/* <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
          <td>Malcolm Lockyer</td>
          <td>1961</td>
          <div className='text-center flex items-center justify-center w-[100%] h-[100%]'>
          <td className='bg-yellow-300 p-1 w-[100px] rounded-2xl'>No</td>
          </div> */}
            </tr>
          );
        })}
        <tr>
          <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
          <td>Malcolm Lockyer</td>
          <td>1961</td>
          <div className='text-center flex items-center justify-center w-[100%] h-[100%]'>
            <td className='bg-yellow-300 p-1 w-[100px] rounded-2xl'>No</td>
          </div>
        </tr>
      </CustomTable>
    </>
  );
};
