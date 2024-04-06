import { useEffect, useState } from 'react';
import { Api } from '../../config/api/api';
import { UserResponse } from '../../domain/entities/interfaces/responses/UserResponse';
import { Status } from '../components/layouts/custom_table/CustomTable';

export const useUsers = () => {
    const [status, setStatus] = useState<Status>(Status.notStarted);
    const [usersResponse, setUsersResponse] = useState<UserResponse>();
  
    const getUsers = async():Promise<UserResponse> => {
        setStatus(Status.inProgress);
        const resp = await Api.instance<UserResponse>('/api/user');
        
        const data =  resp.data;
        console.log(data);
        setUsersResponse(data);
        setStatus(Status.done);
        return data;
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


  }
}
