import { User } from './UserResponse';
import { Profesion } from './facturaResponse';

export interface HistorialMedicoResponse {
  ok: boolean;
  historiales: Historiales[];
}

export interface Historiales {
  id: number;
  id_paciente: number;
  id_profesion: number | null;
  diagnostico: string;
  tratamiento: string;
  createdAt: Date;
  updatedAt: Date;
  profesion: Profesion | null;
  paciente: User;
}
