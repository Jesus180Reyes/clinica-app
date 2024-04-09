import { ChangeEvent, FC } from 'react';

interface Props {
  //* Etiqueta que describe el propósito del input
  title: string;
  //* Tipo de input (por defecto es 'text')
  typeInput?: React.HTMLInputTypeAttribute;
  //*  Valor actual del input
  value: string;
  // *  Función llamada cuando cambia el valor del input
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  // * Texto de marcador de posición para el input
  placeholder?: string;
  //* Indica si el input está deshabilitado
  disabled?: boolean;
  // * Indica si hay error en el input
  error?: boolean;

  name?: string;
}
/**
 * Componente de input personalizado .
 * Hecho Por Jesus Reyes.
 * @param title - Etiqueta que describe el propósito del input.
 * @param value - Valor actual del input.
 * @param onChange - Función llamada cuando cambia el valor del input.
 * @param typeInput - Tipo de input (por defecto es 'text').
 * @param placeholder - Texto de marcador de posición para el input.
 * @param error - Mensaje de error a mostrar.
 * @param disabled - Indica si el input está deshabilitado.
 * @param name - Nombre de valor a Ingresar .
 */
export const CustomTextfieldComponent: FC<Props> = ({
  title,
  value,
  onChange,
  error,
  disabled,
  placeholder,
  typeInput = 'text',
  name,
}) => {
  return (
    <>
      <label className='font-semibold text-sm text-gray-600 pb-1 block'>
        {title}
      </label>
      <input
        name={name}
        type={typeInput}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={`border rounded-lg px-3 py-2 mt-1 mb-3 text-sm w-full ${error ? 'border-red-500' : undefined}`}
      />
      {error && <p className='text-red-500 text-sm'>Hay un error</p>}
    </>
  );
};
