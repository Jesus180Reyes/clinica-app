import { useEffect, useState } from 'react';
import { Api } from '../../config/api/api';
import { TipoSangre } from '../../domain/entities/interfaces/responses/UserResponse';
import { Status } from '../components/layouts/custom_table/CustomTable';

interface TipoSangreResp {
    ok: boolean;
    tiposSangre: TipoSangre[]
}
export const useTipoSangre = () => {
    const [status, setStatus] = useState(Status.notStarted);
    const [tipoSangreResp, setTipoSangreResp] = useState<TipoSangreResp>();
    const getTipoSangres = async():Promise<TipoSangreResp> => {
        setStatus(Status.inProgress);
        const resp = await Api.instance<TipoSangreResp>('/api/tipoSangre');
        
        const data =  resp.data;
        console.log(data);
        setTipoSangreResp(data);
        setStatus(Status.done);
        return data;
      };
      useEffect(() => {
        getTipoSangres();
      }, []);
  return {
    // * Propiedades
    status,
    tipoSangreResp,
    // * Metodos
    getTipoSangres,

  }
}
