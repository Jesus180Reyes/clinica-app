import { useEffect, useState } from 'react';
import { Trabajador } from '../../domain/entities/interfaces/responses/facturaResponse';
import { Api } from '../../config/api/api';
import { Status } from '../components/layouts/custom_table/CustomTable';

export const useTrabajadores = () => {
    const [trabajadoresResp, setTrabajadoresResp] = useState<Trabajador[]>();
    const [status, setstatus] = useState<Status>(Status.notStarted);
    const getTrabajadores = async() => {
        setstatus(Status.inProgress);
        const resp = await Api.instance.get('/api/trabajadores');
        const data = resp.data;
        setTrabajadoresResp(data.trabajadores);
        setstatus(Status.done);
    }

    useEffect(() => {
    getTrabajadores();
    
      
    }, []);
    

  return {
    // * Propiedades
    trabajadoresResp,
    status,
    // * Metodos
    getTrabajadores,

  }
}
