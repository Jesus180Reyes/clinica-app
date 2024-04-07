import { SidebarEntitie } from '../entities/sidebar_entitie';

export const sidebarData: SidebarEntitie[] = [
  {
    id: 1,
    title: 'Dashboard',
    fontawesomeIcon: 'fa-solid fa-briefcase-medical',
    route: '/',
  },
  {
    id: 2,
    title: 'Signos Vitales',
    fontawesomeIcon: 'fa-solid fa-house-chimney-medical',
    route: '/signos-vitales',
  },
  {
    id: 3,
    title: 'Observaciones',
    fontawesomeIcon: 'fa-solid fa-house-medical-circle-exclamation',
    route: '/observaciones',
  },
  {
    id: 4,
    title: 'Facturacion',
    fontawesomeIcon: 'fa-solid fa-money-bill',
    route: '/facturacion',
  },
  {
    id: 5,
    title: 'Pacientes',
    fontawesomeIcon: 'fa-regular fa-user',
    route: '/usuarios',
  },
  {
    id: 6,
    title: 'Historial Medico',
    fontawesomeIcon: 'fa-solid fa-stethoscope',
    route: '/historial-medico',
  },
  
  {
    id: 7,
    title: 'Examenes Resultados',
    fontawesomeIcon: 'fa-solid fa-prescription-bottle',
    route: '/examenes-resultados',
  },
  {
    id: 8,
    title: 'Agregar Trabajador',
    fontawesomeIcon: 'fa-solid fa-prescription-bottle',
    route: '/agregar-trabajador',
  },
];
