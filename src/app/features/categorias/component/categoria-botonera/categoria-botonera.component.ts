import { Component, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-categoria-botonera',
  imports: [ToolbarModule, ButtonModule],
  templateUrl: './categoria-botonera.component.html',
  styleUrl: './categoria-botonera.component.scss',
})
export class CategoriaBotoneraComponent {
    selectedProducts: any[] = [];   // tipa esto cuando tengas tu modelo Categoria
    nuevo = output<void>();

    openNew() { /* abrir diálogo de nueva categoría */
        //this.nuevo.emit();
        console.log('1. click en Nuevo');   // ← ¿se imprime al hacer click?
        this.nuevo.emit();
    }

    deleteSelectedProducts() { /* eliminar seleccionados */ }

    exportCSV() { /* exportar tabla */ }

}
