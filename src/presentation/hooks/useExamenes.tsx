/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Api } from '../../config/api/api';
import { Examen } from '../../domain/entities/interfaces/responses/examenesResultadosResp';
import { Status } from '../components/layouts/custom_table/CustomTable';
import { CustomModals } from '../../config/helpers/modals/custom_modals';

export const useExamenes = () => {
  const [status, setStatus] = useState<Status>(Status.notStarted);
    const [examenesResp, setexamenesResp] = useState<Examen[]>();
    const getExamenes = async() => {
        setStatus(Status.inProgress);
        const resp = await Api.instance.get(
            '/api/examenes',
        );
        
        const data = resp.data.examenes;
        setexamenesResp(data);
        setStatus(Status.done);
    }
    const createExamenResultado = async(data: any) => {
        try {
        if(data.examenes_id === undefined || data.observacion_general === undefined) return;
        setStatus(Status.inProgress);
        const resp = await Api.instance.post('/api/examenes/resultados',data);
        console.log(resp.data);
        CustomModals.showCustomModal('Examen Medico Creado Exitosamente', 'success', );
        setStatus(Status.done);
        } catch (error ) {
        console.error(error);
        CustomModals.showCustomModal('Upps a ocurrido un error no esperado, Vuelve a intentarlo', 'error', );
        setStatus(Status.notStarted);   
        }
    }
    useEffect(() => {
      getExamenes();
    }, [])
    
  return {
    // * Propiedades
    examenesResp,
    status,
    // * Metodos
    getExamenes,
    createExamenResultado,

  }
}
