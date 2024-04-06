export interface UserResponse {
    ok:    boolean;
    users: User[];
}

export interface User {
    id:                        number;
    dni:                       string;
    nombre:                    string;
    direccion:                 string;
    email:                     string;
    tipoSangreId:              number;
    birthDay:                  Date | null;
    leido_por_auxiliar_medico: boolean;
    createdAt:                 Date;
    updatedAt:                 Date;
    tipoSangre:                TipoSangre;
}

export interface TipoSangre {
    id:        number;
    nombre:    string;
    createdAt: Date;
    updatedAt: Date;
}
