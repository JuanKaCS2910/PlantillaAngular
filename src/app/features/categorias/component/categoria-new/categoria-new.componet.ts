import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Categoria, CategoriaRequest } from '../../model/categoria';
import { CheckboxModule } from 'primeng/checkbox';
import { CategoriaService } from '../../service/categoria.service';
import { NotificationService } from '@/app/shared/services/notification.service';

@Component({
  selector: 'app-categoria-new',
  imports: [DialogModule, ButtonModule, InputTextModule,
            CheckboxModule, FormsModule, CommonModule
  ],
  templateUrl: './categoria-new.componet.html',
  styleUrl: './categoria-new.componet.scss',
})
export class CategoriaNewComponet {
    visible = model(false);
    editData = input<Categoria | null>(null);          // null = nuevo, objeto = editar
    submitted = false;
    saved = output<void>();
    categoria: Partial<Categoria> = { nombre: '', activo: true };

    private categoriaService = inject(CategoriaService);
    private notification = inject(NotificationService);

    constructor() {
        effect(() => {                                 // corre cuando editData cambia
            const d = this.editData();
            this.categoria = d
                ? { idCategoria: d.idCategoria, nombre: d.nombre, activo: d.activo }
                : { nombre: '', activo: true };         // reset para "nuevo"
        });
    }

    hideDialog() {
        this.visible.set(false);   // cerrar también avisa al padre
        this.submitted = false;
    }

    saveCategoria() {
        this.submitted = true;
        if (!this.categoria.nombre?.trim()) return;

        const request: CategoriaRequest = {
            nombre: this.categoria.nombre,
            activo: this.categoria.activo ?? true
        };

        const op$ = this.esEdicion                                    // ← aquí se decide
        ? this.categoriaService.update(this.categoria.idCategoria!, request)
        : this.categoriaService.save(request);

        op$.subscribe({
            next: (resp) => {
                if (resp.exito) {
                    this.notification.success(resp.mensaje);
                    this.saved.emit();
                    this.hideDialog();
                    this.categoria = { nombre: '', activo: true };
                } else {
                    this.notification.error(resp.mensaje);
                }
            },
            error: () => this.notification.error('No se pudo guardar la categoría')
        });

    }

    get esEdicion() { return !!this.categoria.idCategoria; }

}
