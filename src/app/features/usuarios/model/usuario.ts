export interface Usuario {
    idUsuario: number;
    nombre: string;
    correo: string;
    activo: boolean;
    fechaCreacion: string;
    usuarioCreacion: string;
    passwordHash:string;
}

export interface UsuarioResponse {
    exito: boolean;
    mensaje: string;
    datos: {
        items: Usuario[];
        pagina: number;
        tamanio: number;
        tienePaginaAnterior: boolean;
        tienePaginaSiguiente: boolean;
        totalPaginas: number;
        totalRegistros: number;
    };
    errores: string[];
}

export interface UsuarioRequest {
    nombre?: string;
    activo: boolean;
    correo: string;
    passwordHash?: string;
}
