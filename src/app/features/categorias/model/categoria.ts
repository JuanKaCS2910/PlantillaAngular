export interface Categoria {
    idCategoria: number;
    nombre: string;
    activo: boolean;
    fechaCreacion: string;
    usuarioCreacion: string;
}

// y una para la respuesta completa
export interface CategoriaResponse {
    exito: boolean;
    mensaje: string;
    datos: {
        items: Categoria[];
        pagina: number;
        tamanio: number;
        tienePaginaAnterior: boolean;
        tienePaginaSiguiente: boolean;
        totalPaginas: number;
        totalRegistros: number;
    };
    errores: string[];
}

export interface CategoriaRequest {
    nombre?: string;
    activo: boolean;
}
