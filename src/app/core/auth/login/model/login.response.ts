export interface LoginResponse {
    exito: boolean;
    mensaje: string;
    datos: {
        access_token: string;
        refresh_token: string;
        token_type: string;
        expires_in: number;
        usuario: {
            idUsuario: number;
            nombre: string;
            correo: string;
            activo: boolean;
        };
    };
    errores: string[];
}
