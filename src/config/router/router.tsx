import { Navigate, createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../presentation/pages/home/HomePage";
import { App } from "../../presentation/App";
import { Auth } from "../../presentation/Auth";
import { PacienteLoginPage,SelectRolePage, TrabajadoresLoginPage } from "../../presentation/pages";

export class RouterAdapter {
  static router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          path: "/",
          element: <HomePage />,
        },

        { path: "*", element: <Navigate to="/" /> },
      ],
    },
    {
      path: "/auth",
      element: <Auth />,
      children: [
        {
          path: "paciente/login",
          element: <PacienteLoginPage />,
        },
        {
          path: "trabajadores/login",
          element: <TrabajadoresLoginPage />,
        },
        {
          path: "seleccionarRol",
          element: <SelectRolePage />,
        },

        { path: "*", element: <Navigate to="/auth/paciente/login" /> },
        { path: "/auth/*", element: <Navigate to="/auth/paciente/login" /> },
      ],
    },
  ]);
}
