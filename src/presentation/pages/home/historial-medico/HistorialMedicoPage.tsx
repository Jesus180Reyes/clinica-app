import { Api } from '../../../../config/api/api';
import { HistorialMedicoResponse } from '../../../../domain/entities/interfaces/responses/historialMedicoResponse';
import {
  CustomTable,
  Status,
} from '../../../components/layouts/custom_table/CustomTable';
import { Profile_View } from '../../../components/layouts/profile/Profile_View';
import { ChangeEvent, useEffect, useState } from 'react';
import { CustomButton } from '../../../components/shared/button/CustomButton';
import { PrimaryButton } from '../../../components/shared/button/PrimaryButton';
import { CustomDropdownComponent } from '../../../components/shared/dropdown/CustomDropdownComponent';
import { CustomTextfieldComponent } from '../../../components/shared/input/CustomTextfieldComponent';
import { CustomModal } from '../../../components/shared/modal/CustomModal';
import { useUsers } from '../../../hooks/useUsers';

export const HistorialMedicoPage = () => {
  const [historialesResp, setHistorialesResp] =
    useState<HistorialMedicoResponse>();
  const [status, setStatus] = useState<Status>(Status.notStarted);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [dni, setDni] = useState<string>('');
  // const [nombre, setNombre] = useState<string>('');
  // const [direccion, setDireccion] = useState<string>('');
  // const [email, setEmail] = useState<string>('');
  // const [birthday, setBirthday] = useState<string>('');
  const { usersResponse } = useUsers();
  const [, settipoSangreItem] = useState<string>('');

  const getHistoriales = async (): Promise<HistorialMedicoResponse> => {
    setStatus(Status.inProgress);
    const resp = await Api.instance.get<HistorialMedicoResponse>(
      '/api/historial-medico',
    );
    const data = resp.data;
    setHistorialesResp(data);
    setStatus(Status.done);

    return data;
  };
  const onInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    getHistoriales();
  }, []);

  const colums = [
    'N.',
    'Paciente',
    'Paciente DNI',
    'Diagnostico',
    'Tratamiento',
    'Observacion Por:',
    'Fecha de Creacion',
  ];
  return (
    <>
      <Profile_View />
      <div>
        <CustomButton
          onClick={() => setIsActive(!isActive)}
          title='Registrar Historial Medico'
          marginleft='ml-5'
          marginTop='mt-5'
        />
      </div>
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
            onItemClicked={(e) => settipoSangreItem(e)}
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
            value={dni}
            onChange={(e) => onInputChange(e, setDni)}
          />
          <CustomTextfieldComponent
            title='Ingresar Tratamiento'
            value={dni}
            onChange={(e) => onInputChange(e, setDni)}
          />

          <PrimaryButton
            title='Crear Historial Medico'
            onClick={() => console.log('click')}
          />
        </div>
      </CustomModal>
    </>
  );
};
