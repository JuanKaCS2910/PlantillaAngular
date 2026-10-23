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

interface Column {
    field: string;
    header: string;
}

@Component({
  selector: 'app-marca-list',
  imports: [TableModule, IconFieldModule, InputIconModule,
            InputTextModule, RatingModule, TagModule, ButtonModule, CommonModule],
  templateUrl: './marca-list.component.html',
  styleUrl: './marca-list.component.scss',
})
export class MarcaListComponent {
    private marcaService = inject(MarcaService);
    private notificationService = inject(NotificationService);

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

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'info';
        }
    }

    editMarca(c: Marca) { this.editar.emit(c); }

    deleteMarca(categorias: any) {
        // luego: confirmar y eliminar
    }

}
