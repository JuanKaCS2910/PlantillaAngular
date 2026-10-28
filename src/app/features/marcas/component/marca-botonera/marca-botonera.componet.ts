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
    selectedMarca: any[] = [];

    openNew() {
        console.log('1. click en Nuevo');
        this.nuevo.emit();
    }

    deleteSelectedMarca() {  }

    exportCSV() {  }
}
