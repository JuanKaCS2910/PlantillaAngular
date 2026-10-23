import { Component, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-marca-botonera',
  imports: [ToolbarModule, ButtonModule],
  templateUrl: './marca-botonera.componet.html',
  styleUrl: './marca-botonera.componet.scss',
})
export class MarcaBotoneraComponet {
    nuevo = output<void>();
    selectedMarca: any[] = [];   // tipa esto cuando tengas tu modelo Categoria

    openNew() { /* abrir diálogo de nueva categoría */
        //this.nuevo.emit();
        console.log('1. click en Nuevo');   // ← ¿se imprime al hacer click?
        this.nuevo.emit();
    }

    deleteSelectedMarca() { /* eliminar seleccionados */ }

    exportCSV() { /* exportar tabla */ }
}
