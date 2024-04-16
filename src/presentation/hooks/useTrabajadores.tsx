import { useEffect, useState } from 'react';
import { Trabajador } from '../../domain/entities/interfaces/responses/facturaResponse';
import { Api } from '../../config/api/api';
import { Status } from '../components/layouts/custom_table/CustomTable';
export const useTrabajadores = () => {
  const [trabajadoresResp, setTrabajadoresResp] = useState<Trabajador[]>();
  const [status, setstatus] = useState<Status>(Status.notStarted);
  const getTrabajadores = async () => {
    setstatus(Status.inProgress);
    const resp = await Api.instance.get('/api/trabajadores');
    const data = resp.data;
    setTrabajadoresResp(data.trabajadores);
    setstatus(Status.done);
  };

  const createTrabajador = async (data: Trabajador): Promise<boolean> => {
    if (
      data.dni.length === 0 ||
      data.direccion.length === 0 ||
      data.email.length === 0 ||
      data.password.length === 0
    ) {
      return false;
    }
    setstatus(Status.inProgress);
    const resp = await Api.instance.post('/api/trabajadores', data);
    const isStatusOk = resp.status;
    if (isStatusOk !== 200) {
      throw new Error('Upps Hubo un error no esperado');
    }
    setstatus(Status.done);

    return true;
  };

  useEffect(() => {
    getTrabajadores();
  }, []);

  return {
    // * Propiedades
    trabajadoresResp,
    status,
    // * Metodos
    getTrabajadores,
    createTrabajador,
  };
};
