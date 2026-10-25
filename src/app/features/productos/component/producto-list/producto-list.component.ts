import { Component, inject, output, signal } from '@angular/core';
import { Producto } from '../../model/producto';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../service/producto.service';
import { NotificationService } from '@/app/shared/services/notification.service';
import { ImageModule } from 'primeng/image';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

interface Column {
    field: string;
    header: string;
}

@Component({
  selector: 'app-producto-list',
  imports: [TableModule, IconFieldModule, InputIconModule,
            InputTextModule, RatingModule, TagModule,
            ButtonModule, CommonModule, ImageModule, TooltipModule, ConfirmDialogModule  ],
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.scss',
})
export class ProductoListComponent {

    private productoService = inject(ProductoService);
    private notificationService = inject(NotificationService);
    private confirmationService = inject(ConfirmationService);

    public productos = signal<Producto[]>([]);
    totalRecords = signal(0);
    editar = output<Producto>();

    cols: Column[] = [
        { field: 'idMarca', header: 'Id' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'activo', header: 'Activo' },
        { field: 'usuarioCreacion', header: 'Usuario Creación' },
        { field: 'fechaCreacion', header: 'Fecha Creación' }
    ];

    selectedProducto: any[] = [];

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    ngOnInit(): void {
        this.getAll();
    }

    getAll() {
        this.productoService.getAll().subscribe({
            next: (res) => {
                console.log(res);
                this.productos.set(res.datos.items);
                this.totalRecords.set(res.datos.totalRegistros);
            },
            error: (err) => {
                this.notificationService.error(err.mensaje);
            },
            complete() {}
        });
    }

    onImageError(event: Event) {
        (event.target as HTMLImageElement).src = 'assets/no-image.png';
    }
    editProducto(c: Producto) { this.editar.emit(c); }

    deleteProducto(p: Producto) {

        this.confirmationService.confirm({
            message: `¿Estás seguro de eliminar <b>${p.nombre}</b>?`,
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.productoService.delete(p.idProducto).subscribe({
                    next: (resp) => {
                        if (resp.exito) {
                            this.notificationService.success(resp.mensaje);
                            this.getAll();
                        } else {
                            this.notificationService.error(resp.mensaje);
                        }
                    },
                    error: () => this.notificationService.error('No se pudo eliminar el producto')
                });
            }
        });
    }

}
