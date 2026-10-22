import { CommonModule } from '@angular/common';
import { Component, inject, model, output } from '@angular/core';
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
  imports: [DialogModule, ButtonModule, InputTextModule, CheckboxModule, FormsModule, CommonModule
  ],
  templateUrl: './categoria-new.componet.html',
  styleUrl: './categoria-new.componet.scss',
})
export class CategoriaNewComponet {
    visible = model(false);
    submitted = false;
    saved = output<void>();
    categoria: Partial<Categoria> = { nombre: '', activo: true };
    private categoriaService = inject(CategoriaService);
    private notification = inject(NotificationService);

    hideDialog() {
        // this.CategoriaDialog = false;
        // this.submitted = false;
        this.visible.set(false);   // cerrar también avisa al padre
        this.submitted = false;
    }

    saveCategoria() {
        this.submitted = true;

        const request: CategoriaRequest = {
            nombre: this.categoria.nombre,
            activo: this.categoria.activo ?? true
        };

        if (this.categoria.nombre) { /* llamar service.save + cerrar */
            this.categoriaService.save(request).subscribe({
            next: (resp) => {
                if (resp.exito) {
                    this.notification.success(resp.mensaje);   // o 'Categoría creada'
                    this.saved.emit();                          // avisa al padre → recarga tabla
                    this.hideDialog();
                    this.categoria = { nombre: '', activo: true };  // resetea el form
                } else {
                    this.notification.error(resp.mensaje);
                }
            },
            error: () => this.notification.error('No se pudo guardar la categoría')
        });
        }



    }

}
