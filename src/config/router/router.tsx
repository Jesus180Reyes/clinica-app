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
import { HistorialMedicoPage } from '../../presentation/pages/home/historial-medico/HistorialMedicoPage';
import { ExamenesResultadosPage } from '../../presentation/pages/home/examenes-resultados/ExamenesResultadosPage';
import { AgregarTrabajadorPage } from '../../presentation/pages/home/agregar-trabajador/AgregarTrabajadorPage';

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
          path: 'historial-medico',
          element: <HistorialMedicoPage />,
        },

        {
          path: 'examenes-resultados',
          element: <ExamenesResultadosPage />,
        },
        {
          path: 'usuarios',
          element: <UsuariosPage />,
        },
        {
          path: 'agregar-trabajador',
          element: <AgregarTrabajadorPage />,
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
