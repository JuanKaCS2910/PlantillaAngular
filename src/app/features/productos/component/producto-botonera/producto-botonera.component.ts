import { Component, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-producto-botonera',
  imports: [ToolbarModule, ButtonModule],
  templateUrl: './producto-botonera.component.html',
  styleUrl: './producto-botonera.component.scss',
})
export class ProductoBotoneraComponent {
    nuevo = output<void>();
    selectedProducts: any[] = [];   // tipa esto cuando tengas tu modelo Categoria

    openNew() { /* abrir diálogo de nueva categoría */
        //this.nuevo.emit();
        console.log('1. click en Nuevo');   // ← ¿se imprime al hacer click?
        this.nuevo.emit();
    }

    deleteSelectedProducts() { /* eliminar seleccionados */ }

    exportCSV() { /* exportar tabla */ }
}
