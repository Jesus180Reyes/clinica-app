/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { Api } from '../../../config/api/api';
import { CustomModals } from '../../../config/helpers/modals/custom_modals';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginAuth, logout } from '../../store/slices/auth/authSlice';

export const useAuth = () => {
  const user = useAppSelector((state) => state.auth.user);
  const authState = useAppSelector((state) => state.auth.authMsg);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const login = async (data: any) => {
    try {
      const resp = await Api.instance.post('/api/auth', data);
      const user = resp.data.user;
      if (resp.status === 200) {
        dispatch(loginAuth(user));
        navigate('/', { replace: true });
        return;
      }
    } catch (error: any) {
      console.error(error.response.data.msg);
      CustomModals.showCustomModal(
        'ups hubo un error no esperado',
        'error',
        error.response.data.msg,
      );
    }
  };
  const logOut = () => {
    dispatch(logout());
  };

  return {
    // * Propiedades
    user,
    authState,
    // * Metodos
    login,
    logOut,
  };
};
