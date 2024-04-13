import {
  CustomTable,
  Status,
} from '../../../components/layouts/custom_table/CustomTable';
import { Profile_View } from '../../../components/layouts/profile/Profile_View';
import { Api } from '../../../../config/api/api';
import { useState, useEffect } from 'react';
import { FacturaResponse } from '../../../../domain/entities/interfaces/responses/facturaResponse';

export const FacturacionPage = () => {
  const [status, setStatus] = useState<Status>(Status.notStarted);
  const [facturasResp, setFacturasResp] = useState<FacturaResponse>();

  const getFacturas = async (): Promise<FacturaResponse> => {
    setStatus(Status.inProgress);
    const resp = await Api.instance.get<FacturaResponse>('/api/factura');

    const data = resp.data;
    setFacturasResp(data);
    setStatus(Status.done);

    return data;
  };
  useEffect(() => {
    getFacturas();
  }, []);

  const colums = [
    'N.',
    'Paciente',
    'Trabajador',
    'Habitacion',
    'Estadia',
    'Profesion de Trabajador',
    'Metodo de Pago',
    'Subtotal',
    'Total',
  ];

  return (
    <>
      <Profile_View />
      <CustomTable columns={colums} status={status}>
        {facturasResp?.facturas.map((e, i) => {
          return (
            <tr className='m-10 h-[50px]  hover:bg-[#F1F1F1] cursor-pointer'>
              <td className='font-bold'>{i + 1}</td>
              <td>{e.paciente.nombre}</td>
              <td>{e.trabajador.nombre}</td>
              <td>{e.habitacion?.nombre ?? 'N/A'}</td>
              <td>{e.estadia} dia/s</td>
              <td>{e.trabajador.profesion?.nombre}</td>
              <td>{e.metodo_de_pago}</td>
              <td>{e.subtotal}</td>
              <td>{e.total}</td>
              {/* <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
          <td>Malcolm Lockyer</td>
          <td>1961</td>
          <div className='text-center flex items-center justify-center w-[100%] h-[100%]'>
          <td className='bg-yellow-300 p-1 w-[100px] rounded-2xl'>No</td>
          </div> */}
            </tr>
          );
        })}
        {/* <tr>
          <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
          <td>Malcolm Lockyer</td>
          <td>1961</td>
          <div className='text-center flex items-center justify-center w-[100%] h-[100%]'>
            <td className='bg-yellow-300 p-1 w-[100px] rounded-2xl'>No</td>
          </div>
        </tr> */}
      </CustomTable>
    </>
  );
};
