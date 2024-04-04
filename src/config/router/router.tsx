import { Navigate, createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../../presentation/pages/home/HomePage';
import { App } from '../../presentation/App';
import { Auth } from '../../presentation/Auth';
import {
  FacturacionPage,
  ObservacionesPage,
  SignosVitalesPage,
  TrabajadoresLoginPage,
  UsuariosPage,
} from '../../presentation/pages';

export class RouterAdapter {
  static router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          path: '/',
          element: <HomePage />,
        },
        {
          path: 'signos-vitales',
          element: <SignosVitalesPage />,
        },
        {
          path: 'observaciones',
          element: <ObservacionesPage />,
        },
        {
          path: 'facturacion',
          element: <FacturacionPage />,
        },
        {
          path: 'usuarios',
          element: <UsuariosPage />,
        },

        { path: '*', element: <Navigate to='/' /> },
      ],
    },
    {
      path: '/auth',
      element: <Auth />,
      children: [
        // {
        //   path: 'paciente/login',
        //   element: <PacienteLoginPage />,
        // },
        {
          path: 'trabajadores/login',
          element: <TrabajadoresLoginPage />,
        },
        // {
        //   path: 'seleccionarRol',
        //   element: <SelectRolePage />,
        // },

        { path: '*', element: <Navigate to='/auth/paciente/login' /> },
        { path: '/auth/*', element: <Navigate to='/auth/paciente/login' /> },
      ],
    },
  ]);
}
