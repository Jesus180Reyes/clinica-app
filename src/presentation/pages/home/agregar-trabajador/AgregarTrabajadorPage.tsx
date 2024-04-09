import { useState } from 'react';
import { CustomTable } from '../../../components/layouts/custom_table/CustomTable';
import { Profile_View } from '../../../components/layouts/profile/Profile_View';
import { CustomButton } from '../../../components/shared/button/CustomButton';
import { CustomModal } from '../../../components/shared/modal/CustomModal';
import { PrimaryButton } from '../../../components/shared/button/PrimaryButton';
import { CustomTextfieldComponent } from '../../../components/shared/input/CustomTextfieldComponent';
import { useTipoSangre } from '../../../hooks/useTipoSangre';
import { useForm } from '../../../hooks/form/useForm';
import { CustomDropdownComponent } from '../../../components/shared/dropdown/CustomDropdownComponent';
import { useTrabajadores } from '../../../hooks/useTrabajadores';
import { useProfesiones } from '../../../hooks/useProfesiones';
import { useRoles } from '../../../hooks/useRoles';
import { capitalize } from '../../../extensions/string_extension';

export const AgregarTrabajadorPage = () => {
  const { tipoSangreResp } = useTipoSangre();
  const { trabajadoresResp } = useTrabajadores();
  const { profesion } = useProfesiones();
  const { roles } = useRoles();

  const [, settipoSangreItem] = useState<string>();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCurrentUserActive, setisCurrentUserActive] = useState<boolean>(false);
  const {values: reportValues, handleChange: reportHandleChange} = useForm({reportName: ''});
  const { values, handleChange, resetForm } = useForm({
    nombre: '',
    dni: '',
    direccion: '',
    email: '',
    password: '',
  });

  const handleSubmit = () => {
    console.log('Formulario enviado:', values);
    resetForm();
  };
  const handleSubmitReport = () => {
    console.log('Formulario enviado:', reportValues);
    resetForm();
  };

  const columns = [
    'N.',
    'Nombre Trabajador',
    'Dni',
    'Email',
    'Direccion',
    'Fecha de Creacion',
  ];

  return (
    <>
      <Profile_View />
      <div className='ml-4 mt-4'>
        <CustomButton
          title={'Agregar Trabajador'}
          onClick={() => setIsActive(!isActive)}
        />
      </div>
      <CustomTable columns={columns}>
        {trabajadoresResp?.map((e, i) => {
          return (
            <>
              <tr
                key={i}
                onClick={() => setisCurrentUserActive(!isCurrentUserActive)}
                className='p-4 m-10 h-[50px]  hover:bg-[#F1F1F1] cursor-pointer'
              >
                <td className='font-bold'>{i + 1}</td>
                <td>{e.nombre}</td>
                <td>{e.dni}</td>
                <td>{e.email}</td>
                <td>{e.direccion}</td>
                <td>{e.createdAt.toString()}</td>
              </tr>
              <CustomModal isActive={isCurrentUserActive}>
      <div className='text-end'>
          <i
            onClick={() => setisCurrentUserActive(false)}
            className='fa-solid fa-xmark cursor-pointer'
          ></i>
        </div>
        <div className='mt-3'>
          <CustomTextfieldComponent
            title='Nombre Trabajador'
            name='reportName'
            defaultValue={e.nombre}
            // value={reportValues.reportName}
            onChange={reportHandleChange}
          />
          <CustomTextfieldComponent
            title='DNI'
            name='dni'
            value={e.dni}
            onChange={reportHandleChange} 
          />
          <CustomTextfieldComponent
            title='Correo Electronico'
            name='direccion'
            value={e.email}
            onChange={handleChange}
          />
          <CustomTextfieldComponent
            title='Direccion'
            name='direccion'
            value={e.direccion}
            onChange={handleChange}
          />
          <PrimaryButton title='Modificar Reporte' onClick={handleSubmitReport} />

        </div>


      </CustomModal>
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
            name='nombre'
            value={values.nombre}
            onChange={handleChange}
          />
          <CustomTextfieldComponent
            title='Ingresar Direccion'
            name='direccion'
            value={values.direccion}
            onChange={handleChange}
          />
          <CustomTextfieldComponent
            title='Correo Electronico'
            name='email'
            value={values.email}
            typeInput='email'
            onChange={handleChange}
          />
          <CustomTextfieldComponent
            title='Contrasena'
            name='password'
            value={values.password}
            typeInput='password'
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
          <CustomDropdownComponent
            onItemClicked={(e) => settipoSangreItem(e)}
            title='Ingresa Profesion de Trabajador'
            items={
              profesion?.map((e) => ({
                id: e.id,
                title: e.nombre,
              })) ?? []
            }
          />
          <CustomDropdownComponent
            onItemClicked={(e) => settipoSangreItem(e)}
            title='Ingresa Rol de Trabajador'
            items={
              roles?.map((e) => ({
                id: e.id,
                title: capitalize(e.nombre) ,
              })) ?? []
            }
          />
          <PrimaryButton title='Crear Trabajador' onClick={handleSubmit} />
        </div>
      </CustomModal>
      
    </>
  );
};
