import { useEffect, useState } from 'react';
import { Api } from '../../config/api/api';
import { Profesion } from '../../domain/entities/interfaces/responses/facturaResponse';
import { Status } from '../components/layouts/custom_table/CustomTable';

export const useProfesiones = () => {
  const [status, setstatus] = useState<Status>(Status.notStarted);

  const [profesion, setProfesion] = useState<Profesion[]>();

  const getProfesiones = async () => {
    setstatus(Status.inProgress);
    const resp = await Api.instance.get('/api/profesion');
    const data = resp.data;
    setProfesion(data.profesiones);
    setstatus(Status.done);
  };

  const isLoading = status === Status.inProgress;
  useEffect(() => {
    getProfesiones();
  }, [isLoading]);

  return {
    profesion,
    status,
  };
};
