import { User } from './UserResponse';

export interface FacturaResponse {
    ok:       boolean;
    facturas: Factura[];
}

export interface Factura {
    id:             number;
    paciente_id:    number;
    trabajador_id:  number;
    habitacion_id:  number | null;
    observacion_id: number | null;
    consultorio_id: number | null;
    estadia:        number;
    subtotal:       number;
    total:          number;
    metodo_de_pago: string;
    facturado:      boolean;
    createdAt:      Date;
    updatedAt:      Date;
    consultorio:    Consultorio | null;
    paciente:       User;
    trabajador:     Trabajador;
    habitacion:     Habitacion | null;
}

export interface Consultorio {
    id:              number;
    nombre:          string;
    precio:          number;
    id_departamento: number;
    createdAt:       Date;
    updatedAt:       Date;
}

export interface Habitacion {
    id:             number;
    nombre:         string;
    cantidad_camas: number;
    precio_por_dia: number;
    createdAt:      Date;
    updatedAt:      Date;
}



export interface Trabajador {
    id:           number;
    nombre:       string;
    dni:          string;
    direccion:    string;
    email:        string;
    password:     string;
    tipoSangreId: number;
    profesionId:  number;
    roleId:       number;
    createdAt:    Date;
    updatedAt:    Date;
    profesion:    Profesion;
}

export interface Profesion {
    id:        number;
    nombre:    string;
    createdAt: Date;
    updatedAt: Date;
}
