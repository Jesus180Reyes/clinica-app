import { ChangeEvent, useState } from 'react';
import { CustomTable } from '../../../components/layouts/custom_table/CustomTable';
import { Profile_View } from '../../../components/layouts/profile/Profile_View';
import { CustomButton } from '../../../components/shared/button/CustomButton';
import { CustomModal } from '../../../components/shared/modal/CustomModal';
import { CustomTextfieldComponent } from '../../../components/shared/input/CustomTextfieldComponent';
import { CustomDropdownComponent } from '../../../components/shared/dropdown/CustomDropdownComponent';
import { PrimaryButton } from '../../../components/shared/button/PrimaryButton';

export const SignosVitalesPage = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [pacienteNombre, setpacienteNombre] = useState<string>('');
  const [, settipoSangreItem] = useState<string>('');

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setValue(e.target.value);
  };

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
      <div>
        <CustomButton
          onClick={() => setIsActive(!isActive)}
          title='Registrar Signo Vital'
          marginleft='ml-5'
          marginTop='mt-5'
        />
      </div>
      <CustomTable columns={colums}>
        {...rows.map((e) => {
          return (
            <>
              <tr>
                <td>{e.title}</td>
                <td>{e.saludo}</td>
                <div className='text-center flex items-center justify-center w-[100%] h-[100%]'>
                  <td className='bg-yellow-300 p-1 w-[100px]  rounded-2xl'>
                    {e.sexo}
                  </td>
                </div>
              </tr>
            </>
          );
        })}
      </CustomTable>
      <CustomModal isActive={isActive}>
        <div>
          <h1 onClick={() => setIsActive(false)}>TOCAR PARA SALIR</h1>
        </div>
        <div className='mt-3'>
          <CustomTextfieldComponent
            title='Ingresar DNI'
            value={pacienteNombre}
            onChange={(e) => onInputChange(e, setpacienteNombre)}
          />
          <CustomTextfieldComponent
            title='Ingresar Nombre Completo'
            value={pacienteNombre}
            onChange={(e) => onInputChange(e, setpacienteNombre)}
          />
          <CustomTextfieldComponent
            title='Ingresar Direccion'
            value={pacienteNombre}
            onChange={(e) => onInputChange(e, setpacienteNombre)}
          />
          <CustomTextfieldComponent
            title='Correo Electronico'
            value={pacienteNombre}
            onChange={(e) => onInputChange(e, setpacienteNombre)}
          />
          <CustomTextfieldComponent
            title='Fecha de Nacimiento'
            typeInput='date'
            value={pacienteNombre}
            onChange={(e) => onInputChange(e, setpacienteNombre)}
          />
          <CustomDropdownComponent
            onItemClicked={(e) => settipoSangreItem(e)}
            title='Ingresa Signos Vitales'
            items={['O+', 'O-', 'A+']}
          />
          <PrimaryButton title='Crear Paciente' />
        </div>
      </CustomModal>
    </>
  );
};
