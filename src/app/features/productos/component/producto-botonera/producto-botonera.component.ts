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
    selectedProducts: any[] = [];

    openNew() {
        console.log('1. click en Nuevo');
        this.nuevo.emit();
    }

    deleteSelectedProducts() {  }

    exportCSV() {  }
}
