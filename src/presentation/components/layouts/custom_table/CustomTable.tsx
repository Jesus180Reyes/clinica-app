import { FC } from 'react';
export enum Status {
  notStarted,
  inProgress,
  done,
}
interface Props {
  columns: string[];
  children: React.ReactNode;
  status?: Status;
}

export const CustomTable: FC<Props> = ({ columns, children, status }) => {
  if (status === Status.inProgress)
    return (
      <div className=' flex justify-center items-center bg-white rounded-xl h-[500px] w-[80vw] shadow-lg mt-4'>
        <h1>Cargando...</h1>
      </div>
    );
  return (
    <>
      <table
        className='border-collapse shadow-lg mt-4

 ml-4  table-cell   text-center bg-white rounded-xl  overflow-y-scroll overflow h-[500px] w-[80vw]'
      >
        <thead>
          <tr>
            {...columns.map((e) => (
              <th className='border bg-[F1F1F1] p-2'>{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </>
  );
};
