import { Component, viewChild } from '@angular/core';

import { Producto } from '../model/producto';
import { ProductoBotoneraComponent } from '../component/producto-botonera/producto-botonera.component';
import { ProductoListComponent } from '../component/producto-list/producto-list.component';
import { ProductoNewComponent } from '../component/producto-new/producto-new.component';

@Component({
  selector: 'app-producto-home',
  imports: [ProductoBotoneraComponent, ProductoListComponent, ProductoNewComponent],
  templateUrl: './producto-home.component.html',
  styleUrl: './producto-home.component.scss',
})
export class ProductoHomeComponent {
    dialogVisible = false;
    productoSel: Producto | null = null;
    private list = viewChild(ProductoListComponent);

    onNuevo() {
        console.log('2. padre recibió el evento');
        this.productoSel = null;
        this.dialogVisible = true;
    }

    onSaved() {
        this.list()?.getAll();   // reusa el método que ya tienes
    }

    onEditar(c: Producto) {
        this.productoSel = c;
        this.dialogVisible = true;
    }

}
