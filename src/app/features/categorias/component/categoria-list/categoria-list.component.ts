import { CommonModule } from '@angular/common';
import { Component, inject, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CategoriaService } from '../../service/categoria.service';
import { Categoria } from '../../model/categoria';
import { NotificationService } from '@/app/shared/services/notification.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

interface Column {
    field: string;
    header: string;
}

@Component({
  selector: 'app-categoria-list',
  imports: [TableModule, IconFieldModule, InputIconModule,
            InputTextModule, RatingModule, TagModule, ButtonModule,
            CommonModule, ConfirmDialogModule
            ],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.scss',
})

export class CategoriaListComponent {
    private categoryService = inject(CategoriaService);
    private notificationService = inject(NotificationService);
    private confirmationService = inject(ConfirmationService);

    public categorias = signal<Categoria[]>([]);
    totalRecords = signal(0);
    editar = output<Categoria>();

    selectedProducts: any[] = [];

    cols: Column[] = [
        { field: 'id', header: 'Id' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'activo', header: 'Activo' },
        { field: 'usuarioCreacion', header: 'Usuario Creación' },
        { field: 'fechaCreacion', header: 'Fecha Creación' }
    ];

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    ngOnInit(): void {
        this.getAll();
    }

    getAll() {
        this.categoryService.getAll().subscribe({
            next: (res) => {
                console.log(res);
                this.categorias.set(res.datos.items);
                this.totalRecords.set(res.datos.totalRegistros);
            },
            error: (err) => {
                this.notificationService.error(err.mensaje);
            },
            complete() {}
        });
    }

    editCategoria(c: Categoria) { this.editar.emit(c); }

    deleteCategoria(c: Categoria) {
        this.confirmationService.confirm({
                    message: `¿Estás seguro de eliminar categoria : <b>${c.nombre}</b>?`,
                    header: 'Confirmar eliminación',
                    icon: 'pi pi-exclamation-triangle',
                    acceptLabel: 'Sí',
                    rejectLabel: 'No',
                    acceptButtonStyleClass: 'p-button-danger',
                    accept: () => {
                        this.categoryService.delete(c.idCategoria).subscribe({
                            next: (resp) => {
                                if (resp.exito) {
                                    this.notificationService.success(resp.mensaje);
                                    this.getAll();
                                } else {
                                    this.notificationService.error(resp.mensaje);
                                }
                            },
                            error: () => this.notificationService.error('No se pudo eliminar la categoria')
                        });
                    }
                });

    }

}
