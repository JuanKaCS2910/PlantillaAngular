import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Marca, MarcaRequest } from '../../model/marca';
import { MarcaService } from '../../service/marca.service';
import { NotificationService } from '@/app/shared/services/notification.service';

@Component({
  selector: 'app-marca-new',
  imports: [DialogModule, ButtonModule, InputTextModule,
            CheckboxModule, FormsModule, CommonModule],
  templateUrl: './marca-new.component.html',
  styleUrl: './marca-new.component.scss',
})
export class MarcaNewComponent {
    visible = model(false);
    editData = input<Marca | null>(null);

    submitted = false;
    saved = output<void>();
    marca: Partial<Marca> = { nombre: '', activo: true };

    private categoriaService = inject(MarcaService);
    private notification = inject(NotificationService);

    constructor() {
        effect(() => {                                 // corre cuando editData cambia
            const d = this.editData();
            this.marca = d
                ? { idMarca: d.idMarca, nombre: d.nombre, activo: d.activo }
                : { nombre: '', activo: true };         // reset para "nuevo"
        });
    }

    hideDialog() {
        this.visible.set(false);   // cerrar también avisa al padre
        this.submitted = false;
    }

    saveMarca() {
            this.submitted = true;

            const request: MarcaRequest = {
                nombre: this.marca.nombre,
                activo: this.marca.activo ?? true
            };

            const op$ = this.esEdicion                                    // ← aquí se decide
            ? this.categoriaService.update(this.marca.idMarca!, request)
            : this.categoriaService.save(request);

            op$.subscribe({
                next: (resp) => {
                    if (resp.exito) {
                        this.notification.success(resp.mensaje);
                        this.saved.emit();
                        this.hideDialog();
                        this.marca = { nombre: '', activo: true };
                    } else {
                        this.notification.error(resp.mensaje);
                    }
                },
                error: () => this.notification.error('No se pudo guardar la categoría')
            });

        }

    get esEdicion() { return !!this.marca.idMarca; }
}
