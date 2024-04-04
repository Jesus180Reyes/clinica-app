/* eslint-disable @typescript-eslint/no-explicit-any */
import {  ChangeEvent, useState } from 'react';
import { CustomTextfieldComponent } from '../../../components/shared/input/CustomTextfieldComponent';
import { PrimaryButton } from '../../../components/shared/button/PrimaryButton';

export const TrabajadoresLoginPage = () => {
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const onInputChange = (e:ChangeEvent<HTMLInputElement>,setValue:React.Dispatch<React.SetStateAction<string>>) => {
    setValue(e.target.value);
  }
  const onSubmit = (e:any) => {
    e.preventDefault();
    console.log({emailInput, passwordInput})
  }
  return <>
  <div className='min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12'>
  <div className='p-10 xs:p-0 mx-auto md:w-full md:max-w-md'>
    <h1 className='font-bold text-center text-2xl mb-5'>Inicio de Sesion</h1>  
    <div className='bg-white shadow w-full rounded-lg divide-y divide-gray-200'>
      <form onSubmit={onSubmit}>
      <div className='px-5 py-7'>
        <CustomTextfieldComponent   title={'Email'} value={emailInput} onChange={(e)=> onInputChange(e, setEmailInput)}/>
        <CustomTextfieldComponent title={'Contrasena'} value={passwordInput} onChange={(e)=>  onInputChange(e, setPasswordInput)}/>
        <PrimaryButton title='Login'/>
      </div>
      </form>
    </div>
    </div>
    </div>
  </>
  
};

