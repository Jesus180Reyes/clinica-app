/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState } from 'react';
import { CustomTextfieldComponent } from '../../../components/shared/input/CustomTextfieldComponent';
import { PrimaryButton } from '../../../components/shared/button/PrimaryButton';
import { useAuth } from '../../../hooks/auth/useAuth';
import { useNavigate } from 'react-router-dom';

export const TrabajadoresLoginPage = () => {
  const { login, user, authState } = useAuth();
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const navigate = useNavigate();
  const onInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setValue(e.target.value);
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    await login({ email: emailInput, password: passwordInput });
  };
  useEffect(() => {
    if (!user && authState !== 'Not Authenticated') {
      navigate('/');
    }
  });

  return (
    <>
      <div className='min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12'>
        <div className='p-10 xs:p-0 mx-auto md:w-full md:max-w-md'>
          <h1 className='font-bold text-center text-2xl mb-5'>
            Inicio de Sesion
          </h1>
          <div className='bg-white shadow w-full rounded-lg divide-y divide-gray-200'>
            <form onSubmit={onSubmit}>
              <div className='px-5 py-7'>
                <CustomTextfieldComponent
                  title='Email'
                  value={emailInput}
                  onChange={(e) => onInputChange(e, setEmailInput)}
                />
                <CustomTextfieldComponent
                  typeInput='password'
                  title='Contrasena'
                  value={passwordInput}
                  onChange={(e) => onInputChange(e, setPasswordInput)}
                />
                <PrimaryButton title='Login' onClick={() => onSubmit} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
