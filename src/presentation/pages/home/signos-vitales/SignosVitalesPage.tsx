/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { SignoVitalesResponse, SignosVitales } from '../../../../domain/entities/interfaces/responses/signoVitalesResponse';
import { Api } from '../../../../config/api/api';
import { useUsers } from '../../../hooks/useUsers';
import { Item } from '../../../../domain/datasources/item';
import { CustomModals } from '../../../../config/helpers/modals/custom_modals';
import { useExamenes } from '../../../hooks/useExamenes';

export const SignosVitalesPage = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [frecuenciaCardiac, setfrecuenciaCardiaca] = useState<string>('');
  const [presionoArterial, setPresionoArterial] = useState<string>('');
  const [isLoadingStatus, setIsLoadingStatus] = useState<Status>(Status.notStarted)
  const [frecuenciaRespiratoria, setFrecuenciaRespiratoria] =
    useState<string>('');
  const [temperatura, setTemperatura] = useState<string>('');
  const [oxigeno, setOxigeno] = useState<string>('');
  const [observacionGeneral, setObservacionGeneral] = useState<string>('');
  const [isActiveStatus, setisActiveStatus] = useState<boolean>(false)
  const [paciente, setPaciente] = useState<Item>();
  const [signosVitalesData, setSignosVitalesData] =
    useState<SignoVitalesResponse>();
  const [status, setStatus] = useState<Status>(Status.notStarted);
  const { usersResponse } = useUsers();
  const [examenesObservacionGeneral, setExamenesObservacionGeneral] = useState<string>('')
  const [examnesMedicosItem, setExamnesMedicosItem] = useState<Item>();
  const {examenesResp, createExamenResultado} = useExamenes();
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
    setSignosVitalesData(data);
    setStatus(Status.done);
  };

  useEffect(() => {
    getSignosVitales();
  }, []);
  const onSubmit  =  async() => {
    const resp = await Api.instance.post(
      '/api/signos-vitales',
      {trabajadorId: 9,paciente_id: paciente?.id,  frecuencia_cardiaca: Number(frecuenciaCardiac), presion_arterial: Number(presionoArterial), frecuencia_respiratoria: Number(frecuenciaRespiratoria), temperatura: Number(temperatura), oxigeno: Number(oxigeno), observacion_general: observacionGeneral}
    );
    const data = resp.data;
    await createExamenResultado({paciente_id: paciente?.id, examenes_id: examnesMedicosItem?.id, observacion_general: examenesObservacionGeneral, trabajador_id: 13 });
    
    if(data.msg === 'Redirigido a Observacion') {
       CustomModals.showCustomModal(data.msg, 'info', 'El usuario a sido redirigido a observacion')
       return;
    }
      CustomModals.showCustomModal('Signo Vitales de Usuario creados exitosamente', 'success')
   

  }
  const onUpdateStatus = async(e: SignosVitales) => {
    try {
    console.log(e.id);
    setIsLoadingStatus(Status.inProgress);
     const resp = await Api.instance.put(
      `/api/signos-vitales/${e.id}`,
    )
    console.log(resp.data)
    setIsLoadingStatus(Status.done);
    setisActiveStatus(!isActiveStatus);
    CustomModals.showCustomModal('Status Actualizado Exitosamente', 'success');
    await getSignosVitales();
    } catch (error:any) {
      console.error(error.message)
      CustomModals.showCustomModal('Ups Ocurrio un error, Vuelve a intentarlo', 'error', error.message);
    }

  }

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
      <CustomTable columns={colums} status={status}>
        {signosVitalesData?.signosVitales.map((e, i) => {
          return (
            <>
              <tr key={i} className='m-10 h-[50px]  hover:bg-[#F1F1F1] cursor-pointer' onClick={() => CustomModals.showModalWithButtons('Desea Actualizar Status', 'Confirmo haber leido este signo vital',()=> onUpdateStatus(e), isLoadingStatus === Status.inProgress)}>
                <td>{e.paciente.nombre}</td>
                <td>{e.frecuencia_cardiaca}</td>
                <td>{e.frecuencia_respiratoria}</td>
                <td>{e.presion_arterial}</td>
                <td>{e.temperatura}</td>
                <td>{e.oxigeno}</td>
                <td>{e.createdAt.toString()}</td>
                <div onClick={() => setisActiveStatus(!isActiveStatus)} className='text-center flex items-center justify-center w-[100%] h-[100%]'>
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
            onItemClicked={(e) => setPaciente(e)}
            title='Ingresa Paciente'
            items={
              usersResponse?.users.map((e) => ({
                id: e.id,
                title: e.nombre,
              })) ?? []
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
              title='Presion Arterial'
              value={presionoArterial}
              onChange={(e) => onInputChange(e, setPresionoArterial)}
            />
          <CustomTextfieldComponent
            title='Observacion General'
            value={observacionGeneral}
            onChange={(e) => onInputChange(e, setObservacionGeneral)}
          />
            <h1>Evaluciones: Examenes Medicos  (opcional)</h1>
            <CustomDropdownComponent
            onItemClicked={(e) => setExamnesMedicosItem(e)}
            title='Agregar Tipo de Examen que se realizo el paciente'
            items={
              examenesResp?.map((e) => ({
                id: e.id,
                title: e.nombre,
              })) ?? []
            }
          />
           <CustomTextfieldComponent
            title='Observacion General del Examen Medico'
            value={examenesObservacionGeneral}
            onChange={(e) => onInputChange(e, setExamenesObservacionGeneral)}
          />
          <PrimaryButton
            title='Crear Signos Vitales'
            onClick={onSubmit}
          />
        </div>
      </CustomModal>
     
    </>
  );
};
