import { useEffect, useState } from 'react';
import {
  CustomTable,
  Status,
} from '../../../components/layouts/custom_table/CustomTable';
import { Profile_View } from '../../../components/layouts/profile/Profile_View';
import { CustomButton } from '../../../components/shared/button/CustomButton';
import { PrimaryButton } from '../../../components/shared/button/PrimaryButton';
import { CustomDropdownComponent } from '../../../components/shared/dropdown/CustomDropdownComponent';
import { CustomTextfieldComponent } from '../../../components/shared/input/CustomTextfieldComponent';
import { CustomModal } from '../../../components/shared/modal/CustomModal';
import { NoPermissionGrantedComponent } from '../../../components/shared/permission/NoPermissionGrantedComponent';
import { useUsers } from '../../../hooks/useUsers';
import { useTipoSangre } from '../../../hooks/useTipoSangre';
import { Item } from '../../../../domain/datasources/item';
import { useForm } from '../../../hooks/form/useForm';
import { useAuth } from '../../../hooks/auth/useAuth';
import { useNavigate } from 'react-router-dom';

export const UsuariosPage = () => {
  const { user, authState } = useAuth();
  const navigate = useNavigate();
  const { status, usersResponse, createUser } = useUsers();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [tipoSangreItem, settipoSangreItem] = useState<Item>();

  const { tipoSangreResp } = useTipoSangre();
  const { handleChange, resetForm, values } = useForm({
    dni: '',
    nombre: '',
    direccion: '',
    email: '',
    birthday: '',
  });

  //* const onInputChange = (
  //   e: ChangeEvent<HTMLInputElement>,
  //   setValue: React.Dispatch<React.SetStateAction<string>>,
  // ) => {
  //   setValue(e.target.value);
  // };
  const isAdmin = true;
  const onUserCreation = async () => {
    await createUser({
      ...values,
      tipoSangreId: tipoSangreItem?.id,
      trabajadorId: 22,
    });
    resetForm();
  };

  const colums = [
    'N.',
    'DNI',
    'Direccion',
    'Nombre',
    'Correo Electronico',
    'Aprobado por Auxiliar Medico',
  ];
  useEffect(() => {
    if (!user && authState !== 'Authenticated') {
      navigate('/auth/trabajadores/login');
    }
  });
  if (!isAdmin) return <NoPermissionGrantedComponent />;
  return (
    <>
      <Profile_View />
      <div>
        <CustomButton
          onClick={() => setIsActive(!isActive)}
          title='Ingresar paciente'
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
            name='dni'
            value={values.dni}
            onChange={handleChange}
          />
          <CustomTextfieldComponent
            title='Ingresar Nombre Completo'
            value={values.nombre}
            name='nombre'
            onChange={handleChange}
          />
          <CustomTextfieldComponent
            title='Ingresar Direccion'
            value={values.direccion}
            name='direccion'
            onChange={handleChange}
          />
          <CustomTextfieldComponent
            title='Correo Electronico'
            value={values.email}
            name='email'
            typeInput='email'
            onChange={handleChange}
          />
          <CustomTextfieldComponent
            title='Fecha de Nacimiento'
            typeInput='date'
            name='birthday'
            value={values.birthday}
            onChange={handleChange}
          />
          <CustomDropdownComponent
            onItemClicked={(e) => settipoSangreItem(e)}
            title='Ingresa Tipo de Sangre'
            items={
              tipoSangreResp?.tiposSangre.map((e) => ({
                id: e.id,
                title: e.nombre,
              })) ?? []
            }
          />
          <PrimaryButton
            title={`${status === Status.inProgress ? 'Cargando...' : 'Crear Cita'}   `}
            onClick={onUserCreation}
            disabled={status === Status.inProgress}
          />
        </div>
      </CustomModal>
    </>
  );
};
