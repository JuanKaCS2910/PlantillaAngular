import { Component, viewChild } from '@angular/core';
import { MarcaBotoneraComponet } from '../component/marca-botonera/marca-botonera.componet';
import { Marca } from '../model/marca';
import { MarcaListComponent } from '../component/marca-list/marca-list.component';
import { MarcaNewComponent } from '../component/marca-new/marca-new.component';

@Component({
  selector: 'app-marca-home',
  imports: [MarcaBotoneraComponet, MarcaListComponent, MarcaNewComponent],
  templateUrl: './marca-home.component.html',
  styleUrl: './marca-home.component.scss',
})
export class MarcaHomeComponent {
    dialogVisible = false;
    private list = viewChild(MarcaListComponent);
    MarcaSel: Marca | null = null;

    onNuevo() {
        console.log('2. padre recibió el evento');
        this.MarcaSel = null;
        this.dialogVisible = true;
    }

    onSaved() {
        this.list()?.getAll();   // reusa el método que ya tienes
    }

    onEditar(c: Marca) {
        this.MarcaSel = c;
        this.dialogVisible = true;
    }

}
