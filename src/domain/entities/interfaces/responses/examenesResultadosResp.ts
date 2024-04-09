import { User } from './UserResponse';
import { Trabajador } from './facturaResponse';

export interface ExamenesResultadosResponse {
  ok: boolean;
  examenes: Examenes[];
}

export interface Examenes {
  id: number;
  paciente_id: number;
  examenes_id: number;
  observacion_general: string;
  trabajador_id: number;
  authenticado: boolean;
  createdAt: Date;
  updatedAt: Date;
  examenes: Examen;
  paciente: User;
  trabajador: Trabajador;
}

export interface Examen {
  id: number;
  nombre: string;
  precio: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Role {
  id: number;
  nombre: string;
  createdAt: Date;
  updatedAt: Date;
}
