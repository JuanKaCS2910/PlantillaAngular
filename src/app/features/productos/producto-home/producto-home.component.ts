import { Component } from '@angular/core';
import { ProductoBotoneraComponent } from '../component/producto-botonera.component/producto-botonera.component';
import { Categoria } from '../../categorias/model/categoria';

@Component({
  selector: 'app-producto-home',
  imports: [ProductoBotoneraComponent],
  templateUrl: './producto-home.component.html',
  styleUrl: './producto-home.component.scss',
})
export class ProductoHomeComponent {
    dialogVisible = false;
    categoriaSel: Categoria | null = null;

    onNuevo() {
        console.log('2. padre recibió el evento');
        this.categoriaSel = null;
        this.dialogVisible = true;
    }
}
