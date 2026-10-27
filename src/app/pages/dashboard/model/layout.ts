export interface ResumenItem {
    total: number;
    activos: number;
    inactivos: number;
}

export interface DashboardResumen {
    categorias: ResumenItem;
    marcas: ResumenItem;
    productos: ResumenItem;
    usuarios: ResumenItem;
}

export interface DashboardResponse {
    exito: boolean;
    mensaje: string;
    datos: DashboardResumen;
    errores: string[];
}
