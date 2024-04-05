import { FC } from 'react';

interface Props {
  columns: string[];
  children: React.ReactNode;
}

export const CustomTable: FC<Props> = ({ columns, children }) => {
  return (
    <>
      <table
        className='border-collapse shadow-lg

mt-10 ml-4 table-fixed  table text-center bg-white rounded-xl  h-[100vh] w-[80vw]'
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
