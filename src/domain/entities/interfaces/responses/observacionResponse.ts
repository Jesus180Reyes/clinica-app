import { User } from './UserResponse';
import { Habitacion, Trabajador } from './facturaResponse';

export interface ObservacionResponse {
  ok: boolean;
  observaciones: Observaciones[];
}

export interface Observaciones {
  id: number;
  paciente_id: number;
  trabajador_id: number;
  habitacion_id: number;
  createdAt: Date;
  updatedAt: Date;
  paciente: User;
  habitacion: Habitacion | null;
  trabajador: Trabajador;
}
