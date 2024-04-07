import { useEffect, useState } from 'react';
import { Api } from '../../../../config/api/api';
import { ObservacionResponse } from '../../../../domain/entities/interfaces/responses/observacionResponse';
import { CustomTable, Status } from '../../../components/layouts/custom_table/CustomTable';
import { Profile_View } from '../../../components/layouts/profile/Profile_View';

export const ObservacionesPage = () => {
  const [observacionResponse, setObservacionResponse] = useState<ObservacionResponse>();
const [status, setStatus] = useState<Status>(Status.notStarted);
  const getObservaciones = async():Promise<ObservacionResponse> => {
    setStatus(Status.inProgress)
    const resp = await Api.instance.get<ObservacionResponse>('/api/observacion');
    const data = resp.data;
    
    setObservacionResponse(data);
    setStatus(Status.done);
    return data;

  }
  useEffect(() => {
    getObservaciones()
  
    
  }, []);
  
  const colums = ['N.','Paciente','Paciente DNI', 'Trabajador','Profesion Trabajador', 'Habitacion','Fecha de Ingreso'];
 
  return (
    <>
      <Profile_View />
      <CustomTable columns={colums} status={status}>
        {observacionResponse?.observaciones.map((e,i) => {
          return (
            <>
              <tr className='m-10 h-[50px]  hover:bg-[#F1F1F1] cursor-pointer'>
                <td className='font-bold'>{i + 1}</td>
                <td>{e.paciente.nombre}</td>
                <td>{e.paciente.dni}</td>
                <td>{e.trabajador.nombre}</td>
                <td>{e.trabajador.profesion.nombre}</td>
                <td>{e.habitacion?.nombre ?? 'N/A' }</td>
                <td>{e.createdAt.toString()}</td>
                
              </tr>
            </>
          );
        })}
      </CustomTable>
    </>
  );
};
