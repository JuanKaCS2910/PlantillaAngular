import { NotificationService } from '@/app/shared/services/notification.service';
import { CommonModule } from '@angular/common';
import { Component, inject, output, signal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../service/usuario.service';

interface Column {
    field: string;
    header: string;
}

@Component({
  selector: 'app-usuario-list',
  imports: [TableModule, IconFieldModule, InputIconModule,
            InputTextModule, RatingModule, TagModule, ButtonModule,
            CommonModule, ConfirmDialogModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.scss',
})
export class UsuarioListComponent {
    private usuarioService = inject(UsuarioService);
    private notificationService = inject(NotificationService);
    private confirmationService = inject(ConfirmationService);

    public usuarios = signal<Usuario[]>([]);
    totalRecords = signal(0);
    editar = output<Usuario>();

    selectedUsuario: any[] = [];

    cols: Column[] = [
        { field: 'idUsuario', header: 'Id' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'correo', header: 'Correo' },
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
        this.usuarioService.getAll().subscribe({
            next: (res) => {
                console.log(res);
                this.usuarios.set(res.datos.items);
                this.totalRecords.set(res.datos.totalRegistros);
            },
            error: (err) => {
                this.notificationService.error(err.mensaje);
            },
            complete() {}
        });
    }

    editUsuario(u: Usuario) { this.editar.emit(u); }

    deleteUsuario(u: Usuario) {
        this.confirmationService.confirm({
                    message: `¿Estás seguro de eliminar Usuario: <b>${u.nombre}</b>?`,
                    header: 'Confirmar eliminación',
                    icon: 'pi pi-exclamation-triangle',
                    acceptLabel: 'Sí',
                    rejectLabel: 'No',
                    acceptButtonStyleClass: 'p-button-danger',
                    accept: () => {
                        this.usuarioService.delete(u.idUsuario).subscribe({
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
