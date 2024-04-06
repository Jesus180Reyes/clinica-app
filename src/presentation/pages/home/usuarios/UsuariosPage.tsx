import { ChangeEvent, useState } from 'react';
import { CustomTable } from '../../../components/layouts/custom_table/CustomTable';
import { Profile_View } from '../../../components/layouts/profile/Profile_View';
import { CustomButton } from '../../../components/shared/button/CustomButton';
import { PrimaryButton } from '../../../components/shared/button/PrimaryButton';
import { CustomDropdownComponent } from '../../../components/shared/dropdown/CustomDropdownComponent';
import { CustomTextfieldComponent } from '../../../components/shared/input/CustomTextfieldComponent';
import { CustomModal } from '../../../components/shared/modal/CustomModal';
import { NoPermissionGrantedComponent } from '../../../components/shared/permission/NoPermissionGrantedComponent';
import { useUsers } from '../../../hooks/useUsers';
import { useTipoSangre } from '../../../hooks/useTipoSangre';

export const UsuariosPage = () => {
  const { status, usersResponse } = useUsers();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [dni, setDni] = useState<string>('');
  const [nombre, setNombre] = useState<string>('');
  const [direccion, setDireccion] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [, settipoSangreItem] = useState<string>('');

  const { tipoSangreResp } = useTipoSangre();

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setValue(e.target.value);
  };
  const isAdmin = true;

  const colums = [
    'N.',
    'DNI',
    'Direccion',
    'Nombre',
    'Correo Electronico',
    'Aprobado por Auxiliar Medico',
  ];
  if (!isAdmin) return <NoPermissionGrantedComponent />;
  return (
    <>
      <Profile_View />
      <div>
        <CustomButton
          onClick={() => setIsActive(!isActive)}
          title='Crear Paciente'
          marginleft='ml-5'
          marginTop='mt-5'
        />
      </div>

      <CustomTable columns={colums} status={status}>
        {usersResponse?.users.map((e, i) => {
          return (
            <>
              <tr className='m-10 h-[50px]  hover:bg-[#F1F1F1] cursor-pointer'>
                <td className=''>{i + 1}</td>
                <td className=''>{e.dni}</td>
                <td className=''>{e.direccion}</td>
                <td className=''>{e.nombre}</td>
                <td className=''>{e.email}</td>
                <div className='text-center flex items-center justify-center w-[100%] h-[100%]'>
                  <td
                    className={`${!e.leido_por_auxiliar_medico ? 'bg-yellow-300' : 'bg-green-400'} p-1 w-[100px]  rounded-2xl`}
                  >
                    {e.leido_por_auxiliar_medico ? 'Si' : 'No'}
                  </td>
                </div>
              </tr>
            </>
          );
        })}
      </CustomTable>
      <CustomModal isActive={isActive}>
        <div className='text-end'>
          <i
            onClick={() => setIsActive(false)}
            className='fa-solid fa-xmark cursor-pointer'
          ></i>
        </div>
        <div className='mt-3'>
          <CustomTextfieldComponent
            typeInput='number'
            title='Ingresar DNI'
            value={dni}
            onChange={(e) => onInputChange(e, setDni)}
          />
          <CustomTextfieldComponent
            title='Ingresar Nombre Completo'
            value={nombre}
            onChange={(e) => onInputChange(e, setNombre)}
          />
          <CustomTextfieldComponent
            title='Ingresar Direccion'
            value={direccion}
            onChange={(e) => onInputChange(e, setDireccion)}
          />
          <CustomTextfieldComponent
            title='Correo Electronico'
            value={email}
            typeInput='email'
            onChange={(e) => onInputChange(e, setEmail)}
          />
          <CustomTextfieldComponent
            title='Fecha de Nacimiento'
            typeInput='date'
            value={birthday}
            onChange={(e) => onInputChange(e, setBirthday)}
          />
          <CustomDropdownComponent
            onItemClicked={(e) => settipoSangreItem(e)}
            title='Ingresa Signos Vitales'
            items={
              tipoSangreResp?.tiposSangre.map((e) => ({
                id: e.id,
                title: e.nombre,
              })) ?? [{ id: 0, title: '' }]
            }
          />
          <PrimaryButton
            title='Crear Paciente'
            onClick={() => console.log('click')}
          />
        </div>
      </CustomModal>
    </>
  );
};
