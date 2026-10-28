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
    selectedMarca: any[] = [];

    openNew() {
        console.log('1. click en Nuevo');
        this.nuevo.emit();
    }

    deleteSelectedUsuario() {  }

    exportCSV() {  }
}
