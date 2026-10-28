import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Usuario, UsuarioRequest } from '../../model/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { NotificationService } from '@/app/shared/services/notification.service';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-usuario-new',
  imports: [DialogModule, ButtonModule, InputTextModule,
            CheckboxModule, FormsModule, CommonModule, PasswordModule],
  templateUrl: './usuario-new.component.html',
  styleUrl: './usuario-new.component.scss',
})
export class UsuarioNewComponent {
    visible = model(false);
    editData = input<Usuario | null>(null);

    submitted = false;
    saved = output<void>();
    usuario: Partial<Usuario> = { nombre: '', correo:'', activo: true };

    private usuarioService = inject(UsuarioService);
    private notification = inject(NotificationService);

    constructor() {
        effect(() => {
            const d = this.editData();
            this.usuario = d
                ? { idUsuario: d.idUsuario, correo:d.correo, passwordHash: d.passwordHash, nombre: d.nombre, activo: d.activo }
                : { nombre: '',correo:'', passwordHash:'', activo: true };
        });
    }

    hideDialog() {
        this.visible.set(false);
        this.submitted = false;
    }

    saveUsuario() {
                this.submitted = true;
                if (!this.usuario.nombre?.trim()) return;
                if (!this.usuario.correo?.trim()) return;

                const request: UsuarioRequest = {
                    nombre: this.usuario.nombre,
                    correo: this.usuario.correo,
                    passwordHash: this.usuario.passwordHash,
                    activo: this.usuario.activo ?? true
                };

                const op$ = this.esEdicion
                ? this.usuarioService.update(this.usuario.idUsuario!, request)
                : this.usuarioService.save(request);

                op$.subscribe({
                    next: (resp) => {
                        if (resp.exito) {
                            this.notification.success(resp.mensaje);
                            this.saved.emit();
                            this.hideDialog();
                            this.usuario = { nombre: '',correo:'', passwordHash:'', activo: true };
                        } else {
                            this.notification.error(resp.mensaje);
                        }
                    },
                    error: () => this.notification.error('No se pudo guardar el usuario')
                });

            }

    get esEdicion() { return !!this.usuario.idUsuario; }
}
