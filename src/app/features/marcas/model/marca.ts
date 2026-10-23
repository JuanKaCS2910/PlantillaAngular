export interface Marca {
    idMarca: number;
    nombre: string;
    activo: boolean;
    fechaCreacion: string;
    usuarioCreacion: string;
}

// y una para la respuesta completa
export interface MarcaResponse {
    exito: boolean;
    mensaje: string;
    datos: {
        items: Marca[];
        pagina: number;
        tamanio: number;
        tienePaginaAnterior: boolean;
        tienePaginaSiguiente: boolean;
        totalPaginas: number;
        totalRegistros: number;
    };
    errores: string[];
}

export interface MarcaRequest {
    nombre?: string;
    activo: boolean;
}
