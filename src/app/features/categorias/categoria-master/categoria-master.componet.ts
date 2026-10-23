import { Component, viewChild } from '@angular/core';
import { CategoriaBotoneraComponent } from '../component/categoria-botonera/categoria-botonera.component';
import { CategoriaListComponent } from '../component/categoria-list/categoria-list.component';
import { CategoriaNewComponet } from '../component/categoria-new/categoria-new.componet';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-categoria-master',
  imports: [CategoriaBotoneraComponent, CategoriaListComponent, CategoriaNewComponet],
  templateUrl: './categoria-master.componet.html',
  styleUrl: './categoria-master.componet.scss',
})
export class CategoriaMasterComponet {
    dialogVisible = false;
    private list = viewChild(CategoriaListComponent);
    categoriaSel: Categoria | null = null;

    onNuevo() {
        console.log('2. padre recibió el evento');
        this.categoriaSel = null;
        this.dialogVisible = true;
    }

    onSaved() {
        this.list()?.getAll();   // reusa el método que ya tienes
    }

    onEditar(c: Categoria) {
        this.categoriaSel = c;
        this.dialogVisible = true;
    }

}
