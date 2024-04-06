import { ChangeEvent, useEffect, useState } from 'react';
import {
  CustomTable,
  Status,
} from '../../../components/layouts/custom_table/CustomTable';
import { Profile_View } from '../../../components/layouts/profile/Profile_View';
import { CustomButton } from '../../../components/shared/button/CustomButton';
import { CustomModal } from '../../../components/shared/modal/CustomModal';
import { CustomTextfieldComponent } from '../../../components/shared/input/CustomTextfieldComponent';
import { CustomDropdownComponent } from '../../../components/shared/dropdown/CustomDropdownComponent';
import { PrimaryButton } from '../../../components/shared/button/PrimaryButton';
import { SignoVitalesResponse } from '../../../../domain/entities/interfaces/responses/signoVitalesResponse';
import { Api } from '../../../../config/api/api';
import { useUsers } from '../../../hooks/useUsers';

export const SignosVitalesPage = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [frecuenciaCardiac, setfrecuenciaCardiaca] = useState<string>('');
  const [frecuenciaRespiratoria, setFrecuenciaRespiratoria] =
    useState<string>('');
  const [temperatura, setTemperatura] = useState<string>('');
  const [oxigeno, setOxigeno] = useState<string>('');
  const [observacionGeneral, setObservacionGeneral] = useState<string>('');
  const [, settipoSangreItem] = useState<string>('');
  const [signosVitalesData, setSignosVitalesData] =
    useState<SignoVitalesResponse>();
  const [, setStatus] = useState<Status>(Status.notStarted);
  const { usersResponse } = useUsers();

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setValue(e.target.value);
  };
  const getSignosVitales = async () => {
    setStatus(Status.inProgress);
    const resp = await Api.instance<SignoVitalesResponse>(
      '/api/signos-vitales',
    );

    const data = resp.data;
    console.log(data);
    setSignosVitalesData(data);
    setStatus(Status.done);
  };

  useEffect(() => {
    getSignosVitales();
  }, []);

  const colums = [
    'Paciente',
    'Frecuencia Cardiaca',
    'Frecuencia Respiratoria',
    'Presion Arterial',
    'Temperatura',
    'Oxigeno',
    'Fecha de Creacion',
    'Leido Por Doctor',
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
        {signosVitalesData?.signosVitales.map((e) => {
          return (
            <>
              <tr className='m-10 h-[50px]  hover:bg-[#F1F1F1] cursor-pointer'>
                <td>{e.paciente.nombre}</td>
                <td>{e.frecuencia_cardiaca}</td>
                <td>{e.frecuencia_respiratoria}</td>
                <td>{e.presion_arterial}</td>
                <td>{e.temperatura}</td>
                <td>{e.oxigeno}</td>
                <td>{e.createdAt.toString()}</td>
                <div className='text-center flex items-center justify-center w-[100%] h-[100%]'>
                  <td
                    className={`${e.leido_por_doctor ? 'bg-green-400' : 'bg-yellow-300'} p-1 w-[100px]  rounded-2xl`}
                  >
                    {e.leido_por_doctor ? 'Sí' : 'No'}
                  </td>
                </div>
              </tr>
            </>
          );
        })}
      </CustomTable>
      <CustomModal isActive={isActive} onCloseModal={() => setIsActive(false)}>
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
              usersResponse?.users.map((e) => ({id: e.id, title: e.nombre})) ?? [({id: 0, title: ''})]
            }
          />
          <CustomTextfieldComponent
            title='Frecuencia Cardiaca'
            typeInput='number'
            value={frecuenciaCardiac}
            onChange={(e) => onInputChange(e, setfrecuenciaCardiaca)}
          />
          <CustomTextfieldComponent
            title='Frecuencia Respiratoria'
            typeInput='number'
            value={frecuenciaRespiratoria}
            onChange={(e) => onInputChange(e, setFrecuenciaRespiratoria)}
          />
          <CustomTextfieldComponent
            title='Temperatura'
            typeInput='number'
            value={temperatura}
            onChange={(e) => onInputChange(e, setTemperatura)}
          />
          <CustomTextfieldComponent
            title='Oxigeno'
            typeInput='number'
            value={oxigeno}
            onChange={(e) => onInputChange(e, setOxigeno)}
          />
          <CustomTextfieldComponent
            title='Observacion General'
            value={observacionGeneral}
            onChange={(e) => onInputChange(e, setObservacionGeneral)}
          />

          <PrimaryButton
            title='Crear Signos Vitales'
            onClick={() => console.log('click')}
          />
        </div>
      </CustomModal>
    </>
  );
};
