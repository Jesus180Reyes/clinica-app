import { useEffect, useState } from 'react';
import { Profile_View } from '../../../components/layouts/profile/Profile_View';
import { Api } from '../../../../config/api/api';
import { ExamenesResultadosResponse } from '../../../../domain/entities/interfaces/responses/examenesResultadosResp';
import {
  CustomTable,
  Status,
} from '../../../components/layouts/custom_table/CustomTable';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth/useAuth';

export const ExamenesResultadosPage = () => {
  
  const navigate = useNavigate();
  const {user,authState} = useAuth();

  const [examenesResp, setexamenesResp] =
    useState<ExamenesResultadosResponse>();
  const [status, setStatus] = useState<Status>(Status.notStarted);
  const getHistoriales = async (): Promise<ExamenesResultadosResponse> => {
    setStatus(Status.inProgress);
    const resp = await Api.instance.get<ExamenesResultadosResponse>(
      '/api/examenes/resultados',
    );
    const data = resp.data;
    setexamenesResp(data);
    setStatus(Status.done);
    return data;
  };

  useEffect(() => {
    getHistoriales();
  }, []);
  const colums = [
    'N.',
    'Paciente',
    'Paciente DNI',
    'Examen',
    'Trabajador',
    'Trabajdor Profesion',
    'Observacion General',
    'Fecha de Creacion',
  ];
  useEffect(() => {
    if(!user && authState !== 'Authenticated'){
      navigate('/auth/trabajadores/login')
    }
    
  }, )
  
  return (
    <>
      <Profile_View />
      <CustomTable columns={colums} status={status}>
        {examenesResp?.examenes.map((e, i) => {
          return (
            <>
              <tr className='m-10 h-[50px]  hover:bg-[#F1F1F1] cursor-pointer'>
                <td className='font-bold'>{i + 1}</td>
                <td>{e.paciente.nombre}</td>
                <td>{e.paciente.dni}</td>
                <td>{e.examenes.nombre}</td>
                <td>{e.trabajador.nombre}</td>
                <td>{e.trabajador.profesion?.nombre}</td>
                <td>{e.observacion_general}</td>
                <td>{e.createdAt.toString()}</td>
              </tr>
            </>
          );
        })}
      </CustomTable>
    </>
  );
};
