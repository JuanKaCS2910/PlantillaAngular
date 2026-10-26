import { Component, viewChild } from '@angular/core';
import { UsuarioBotoneraComponent } from '../component/usuario-botonera/usuario-botonera.component';
import { UsuarioListComponent } from '../component/usuario-list/usuario-list.component';
import { UsuarioNewComponent } from '../component/usuario-new/usuario-new.component';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-usuario-home',
  imports: [UsuarioBotoneraComponent, UsuarioListComponent,UsuarioNewComponent],
  templateUrl: './usuario-home.component.html',
  styleUrl: './usuario-home.component.scss',
})
export class UsuarioHomeComponent {
    dialogVisible = false;
    private list = viewChild(UsuarioListComponent);
    UsuarioSel: Usuario | null = null;

    onNuevo() {
        console.log('2. padre recibió el evento');
        this.UsuarioSel = null;
        this.dialogVisible = true;
    }

    onEditar(c: Usuario) {
        this.UsuarioSel = c;
        this.dialogVisible = true;
    }

    onSaved() {
        this.list()?.getAll();   // reusa el método que ya tienes
    }

}
