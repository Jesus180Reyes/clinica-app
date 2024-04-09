import { useEffect, useState } from 'react';
import { Role } from '../../domain/entities/interfaces/responses/examenesResultadosResp';
import { Api } from '../../config/api/api';
import { Status } from '../components/layouts/custom_table/CustomTable';

export const useRoles = () => {
  const [roles, setRoles] = useState<Role[]>();
  const [status, setstatus] = useState<Status>(Status.notStarted);

  const getRoles = async () => {
    setstatus(Status.inProgress);
    const resp = await Api.instance.get('/api/roles');
    const data = resp.data;
    setRoles(data.roles);
    setstatus(Status.done);
  };

  const isLoading = status === Status.inProgress;

  useEffect(() => {
    getRoles();
  }, [isLoading]);

  return {
    roles,
    status,
  };
};
