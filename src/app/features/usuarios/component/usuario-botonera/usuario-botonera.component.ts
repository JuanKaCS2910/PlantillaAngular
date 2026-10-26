import { Component, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-usuario-botonera',
  imports: [ToolbarModule, ButtonModule],
  templateUrl: './usuario-botonera.component.html',
  styleUrl: './usuario-botonera.component.scss',
})
export class UsuarioBotoneraComponent {
    nuevo = output<void>();
    selectedMarca: any[] = [];   // tipa esto cuando tengas tu modelo Categoria

    openNew() { /* abrir diálogo de nueva categoría */
        console.log('1. click en Nuevo');   // ← ¿se imprime al hacer click?
        this.nuevo.emit();
    }

    deleteSelectedUsuario() { /* eliminar seleccionados */ }

    exportCSV() { /* exportar tabla */ }
}
