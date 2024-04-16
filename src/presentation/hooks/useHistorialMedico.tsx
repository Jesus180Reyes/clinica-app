/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Api } from '../../config/api/api';
import { HistorialMedicoResponse } from '../../domain/entities/interfaces/responses/historialMedicoResponse';
import { Status } from '../components/layouts/custom_table/CustomTable';
import { CustomModals } from '../../config/helpers/modals/custom_modals';

export const useHistorialMedico = () => {
  const [historialesResp, setHistorialesResp] =
    useState<HistorialMedicoResponse>();
  const [status, setStatus] = useState<Status>(Status.notStarted);
  const url = '/api/historial-medico';

  const getHistoriales = async (): Promise<HistorialMedicoResponse> => {
    setStatus(Status.inProgress);
    const resp = await Api.instance.get<HistorialMedicoResponse>(url);
    const data = resp.data;
    setHistorialesResp(data);
    setStatus(Status.done);

    return data;
  };
  const createHistorial = async (data: any): Promise<boolean> => {
    if (data.diagnostico.length === 0 || data.tratamiento.length === 0)
      return false;
    try {
      setStatus(Status.inProgress);
      await Api.instance.post(url, data);
      CustomModals.showCustomModal('Historal Creado Exitosamente', 'success');
      setStatus(Status.done);
      return true;
    } catch (error: any) {
      console.log(error);
      CustomModals.showCustomModal(
        'Upps a ocurrido un error no esperado, Vuelve a intentarlo',
        'error',
        error.message,
      );
      setStatus(Status.notStarted);
      return false;
    }
  };
  useEffect(() => {
    getHistoriales();
  }, []);

  return {
    // * Propiedades
    status,
    historialesResp,
    // * Metodos
    getHistoriales,
    createHistorial,
  };
};
