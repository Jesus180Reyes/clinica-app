import { User } from './UserResponse';

export interface SignoVitalesResponse {
    ok:            boolean;
    signosVitales: SignosVitales[];
}

export interface SignosVitales {
    id:                      number;
    paciente_id:             number;
    frecuencia_cardiaca:     number;
    presion_arterial:        number;
    frecuencia_respiratoria: number;
    temperatura:             number;
    oxigeno:                 number;
    observacion_general:     string;
    leido_por_doctor:        boolean;
    createdAt:               Date;
    updatedAt:               Date;
    paciente:                User;
}



