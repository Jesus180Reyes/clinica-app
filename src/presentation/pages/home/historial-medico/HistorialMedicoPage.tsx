import { Api } from '../../../../config/api/api';
import { HistorialMedicoResponse } from '../../../../domain/entities/interfaces/responses/historialMedicoResponse';
import { CustomTable, Status } from '../../../components/layouts/custom_table/CustomTable';
import { Profile_View } from '../../../components/layouts/profile/Profile_View'
import { useEffect, useState } from 'react';
import { CustomButton } from '../../../components/shared/button/CustomButton';

export const HistorialMedicoPage = () => {
    const [historialesResp, setHistorialesResp] = useState<HistorialMedicoResponse>();
    const [status, setStatus] = useState<Status>(Status.notStarted);

    const getHistoriales = async():Promise<HistorialMedicoResponse> => {
        setStatus(Status.inProgress);
        const resp = await Api.instance.get<HistorialMedicoResponse>('/api/historial-medico');
        const data = resp.data;
        setHistorialesResp(data);
        setStatus(Status.done);

        return data;
    }

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
          onClick={() => null}
          title='Registrar Historial Medico'
          marginleft='ml-5'
          marginTop='mt-5'
          
        />
      </div>
    <CustomTable columns={colums} status={status}>
        {historialesResp?.historiales.map((e,i) => {
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
    
    </>
  )
}
