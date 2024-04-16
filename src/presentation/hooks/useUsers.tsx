/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Api } from '../../config/api/api';
import { UserResponse } from '../../domain/entities/interfaces/responses/UserResponse';
import { Status } from '../components/layouts/custom_table/CustomTable';
import { CustomModals } from '../../config/helpers/modals/custom_modals';

export const useUsers = () => {
  const [status, setStatus] = useState<Status>(Status.notStarted);
  const [usersResponse, setUsersResponse] = useState<UserResponse>();

  const getUsers = async (): Promise<UserResponse> => {
    setStatus(Status.inProgress);
    const resp = await Api.instance<UserResponse>('/api/user');

    const data = resp.data;
    setUsersResponse(data);
    setStatus(Status.done);
    return data;
  };

  const createUser = async (data: any) => {
    try {
      setStatus(Status.inProgress);
      const resp = await Api.instance.post('/api/user', data);
      console.log(resp.data);
      setStatus(Status.done);
      CustomModals.showCustomModal('Usuario Creado Exitosamente', 'success');
    } catch (error: any) {
      console.error(error);
      setStatus(Status.notStarted);
      CustomModals.showCustomModal(
        'Ups Error no esperado vuelve a intentarlo',
        'error',
        error.message,
      );
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return {
    // * Propiedades
    status,
    usersResponse,
    // * Metodos
    getUsers,
    createUser,
  };
};
