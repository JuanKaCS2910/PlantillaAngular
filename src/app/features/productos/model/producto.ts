export interface Producto {
    idProducto: number;
    idCategoria: number;
    categoria: string;
    idMarca: number;
    marca: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagenUrl: string;
    activo: boolean;
    fechaCreacion: string;
    usuarioCreacion: string;
}

export interface ProductoResponse {
    exito: boolean;
    mensaje: string;
    datos: {
        items: Producto[];
        pagina: number;
        tamanio: number;
        tienePaginaAnterior: boolean;
        tienePaginaSiguiente: boolean;
        totalPaginas: number;
        totalRegistros: number;
    };
    errores: string[];
}

export interface ProductoRequest {
    idProducto?: number;
    idCategoria?: number;
    idMarca?: number;
    nombre?: string;
    descripcion?: string;
    precio?: number;
    stock?: number;
    imagenUrl?: string;
    activo: boolean;
}
