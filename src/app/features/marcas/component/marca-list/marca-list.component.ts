import { CommonModule } from '@angular/common';
import { Component, inject, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Marca } from '../../model/marca';
import { NotificationService } from '@/app/shared/services/notification.service';
import { MarcaService } from '../../service/marca.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

interface Column {
    field: string;
    header: string;
}

@Component({
  selector: 'app-marca-list',
  imports: [TableModule, IconFieldModule, InputIconModule,
            InputTextModule, RatingModule, TagModule, ButtonModule,
            CommonModule, ConfirmDialogModule],
  templateUrl: './marca-list.component.html',
  styleUrl: './marca-list.component.scss',
})
export class MarcaListComponent {
    private marcaService = inject(MarcaService);
    private notificationService = inject(NotificationService);
    private confirmationService = inject(ConfirmationService);

    public marcas = signal<Marca[]>([]);
    totalRecords = signal(0);
    editar = output<Marca>();

    cols: Column[] = [
        { field: 'idMarca', header: 'Id' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'activo', header: 'Activo' },
        { field: 'usuarioCreacion', header: 'Usuario Creación' },
        { field: 'fechaCreacion', header: 'Fecha Creación' }
    ];

    selectedMarca: any[] = [];

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    ngOnInit(): void {
        this.getAll();
    }

    getAll() {
        this.marcaService.getAll().subscribe({
            next: (res) => {
                console.log(res);
                this.marcas.set(res.datos.items);
                this.totalRecords.set(res.datos.totalRegistros);
            },
            error: (err) => {
                this.notificationService.error(err.mensaje);
            },
            complete() {}
        });
    }

    editMarca(m: Marca) { this.editar.emit(m); }

    deleteMarca(m: Marca) {
        this.confirmationService.confirm({
                    message: `¿Estás seguro de eliminar marca: <b>${m.nombre}</b>?`,
                    header: 'Confirmar eliminación',
                    icon: 'pi pi-exclamation-triangle',
                    acceptLabel: 'Sí',
                    rejectLabel: 'No',
                    acceptButtonStyleClass: 'p-button-danger',
                    accept: () => {
                        this.marcaService.delete(m.idMarca).subscribe({
                            next: (resp) => {
                                if (resp.exito) {
                                    this.notificationService.success(resp.mensaje);
                                    this.getAll();
                                } else {
                                    this.notificationService.error(resp.mensaje);
                                }
                            },
                            error: () => this.notificationService.error('No se pudo eliminar la marca')
                        });
                    }
                });
    }

}
