import {
  CustomTable,
  Status,
} from '../../../components/layouts/custom_table/CustomTable';
import { Profile_View } from '../../../components/layouts/profile/Profile_View';
import { useEffect, useState } from 'react';
import { CustomButton } from '../../../components/shared/button/CustomButton';
import { PrimaryButton } from '../../../components/shared/button/PrimaryButton';
import { CustomDropdownComponent } from '../../../components/shared/dropdown/CustomDropdownComponent';
import { CustomTextfieldComponent } from '../../../components/shared/input/CustomTextfieldComponent';
import { CustomModal } from '../../../components/shared/modal/CustomModal';
import { useUsers } from '../../../hooks/useUsers';
import { Item } from '../../../../domain/datasources/item';
import { useHistorialMedico } from '../../../hooks/useHistorialMedico';
import { useForm } from '../../../hooks/form/useForm';
import { CustomModals } from '../../../../config/helpers/modals/custom_modals';
import { useAuth } from '../../../hooks/auth/useAuth';
import { useNavigate } from 'react-router-dom';

export const HistorialMedicoPage = () => {
  const { historialesResp, status, createHistorial } = useHistorialMedico();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [onErrorInput, setonErrorInput] = useState<boolean>(false);
  const { values, resetForm, handleChange } = useForm({
    diagnostico: '',
    tratamiento: '',
  });
  const { usersResponse } = useUsers();
  const [currentPaciente, setCurrentpaciente] = useState<Item>();
  const { user, authState } = useAuth();
  const navigate = useNavigate();

  //* const onInputChange = (
  //   e: ChangeEvent<HTMLInputElement>,
  //   setValue: React.Dispatch<React.SetStateAction<string>>,
  // ) => {
  //   setValue(e.target.value);
  // };
  const onHistorialCreation = async () => {
    if (currentPaciente === undefined)
      return CustomModals.showCustomModal(
        'Ingresa un paciente a crear',
        'warning',
      );
    const isOk = await createHistorial({
      ...values,
      id_paciente: currentPaciente?.id,
    });
    if (!isOk) {
      setonErrorInput(true);
      return;
    }
    resetForm();
    setIsActive(!isActive);
    setonErrorInput(!onErrorInput);
  };
  const colums = [
    'N.',
    'Paciente',
    'Paciente DNI',
    'Diagnostico',
    'Tratamiento',
    'Observacion Por:',
    'Fecha de Creacion',
  ];
  useEffect(() => {
    if (!user && authState !== 'Authenticated') {
      navigate('/auth/trabajadores/login');
    }
  });
  const allowRoles = [3];

  return (
    <>
      <Profile_View />
      {allowRoles.includes(user?.roleId ?? 0) && (
        <div>
          <CustomButton
            onClick={() => setIsActive(!isActive)}
            title='Registrar Historial Medico'
            marginleft='ml-5'
            marginTop='mt-5'
          />
        </div>
      )}

      <CustomTable columns={colums} status={status}>
        {historialesResp?.historiales.map((e, i) => {
          return (
            <>
              <tr className='m-10 h-[50px]  hover:bg-[#F1F1F1] cursor-pointer'>
                <td className='font-bold'>{i + 1}</td>
                <td>{e.paciente.nombre}</td>
                <td>{e.paciente.dni}</td>
                <td>{e.diagnostico}</td>
                <td>{e.tratamiento}</td>
                <td>{e.profesion?.nombre ?? 'N/A'}</td>
                <td>{e.createdAt.toString()}</td>
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
          <CustomDropdownComponent
            onItemClicked={(e) => setCurrentpaciente(e)}
            title='Ingresa Paciente'
            items={
              usersResponse?.users.map((e) => ({
                id: e.id,
                title: e.nombre,
              })) ?? []
            }
          />
          <CustomTextfieldComponent
            title='Ingresar Diagnostico'
            value={values.diagnostico}
            name='diagnostico'
            errorMsg='Rellena todos los campos requeridos'
            onChange={handleChange}
            error={values.diagnostico.length <= 0 && onErrorInput}
          />
          <CustomTextfieldComponent
            title='Ingresar Tratamiento'
            name='tratamiento'
            value={values.tratamiento}
            errorMsg='Rellena todos los campos requeridos'
            onChange={handleChange}
            error={values.tratamiento.length <= 0 && onErrorInput}
          />

          <PrimaryButton
            title='Crear Historial Medico'
            onClick={onHistorialCreation}
            disabled={status === Status.inProgress}
          />
        </div>
      </CustomModal>
    </>
  );
};
