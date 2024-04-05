import { FC, useState } from 'react';

interface Props {
  title: string;
  items: string[];
  onItemClicked: (item: string) => void;
}
/**
 * Componente de Dropdown personalizado .
 * Hecho Por Jesus Reyes.
 * @param title - Titulo de Input.
 * @param items - Items Totales.
 * @param onItemClicked - Función llamada cuando cambia el valor del input ```(item) => void```.
 
 */
export const CustomDropdownComponent: FC<Props> = ({
  title,
  items,
  onItemClicked,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentValueSelected, setCurrentValueSelected] = useState<string>();
  const itemClickedFunction = (item: string) => {
    onItemClicked.call(item, item);
    setCurrentValueSelected(item);
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className=''>
        <button
          onClick={() => setIsOpen(!isOpen)}
          id='dropdown-button'
          className='text-left flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
        >
          {currentValueSelected !== undefined ? currentValueSelected : title}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-5 h-5 ml-2 -mr-1'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fill-rule='evenodd'
              d='M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
              clip-rule='evenodd'
            />
          </svg>
        </button>
        {isOpen && (
          <div
            id='dropdown-menu'
            className='  mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'
          >
            <div
              className='py-2 p-2'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='dropdown-button'
            >
              {items.map((e) => {
                return (
                  <a
                    onClick={() => itemClickedFunction(e)}
                    className='flex  rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer'
                    role='menuitem'
                  >
                    {e}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
