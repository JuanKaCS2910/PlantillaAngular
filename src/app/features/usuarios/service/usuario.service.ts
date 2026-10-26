import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario, UsuarioRequest, UsuarioResponse } from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
    private uri = `${environment.URL_BASE}/api/usuarios`;
    private http = inject(HttpClient); // DI

    getAll(pagina = 1, tamanio = 1000): Observable<UsuarioResponse> {
            return this.http.get<UsuarioResponse>(`${this.uri}?pagina=${pagina}&tamanio=${tamanio}`);
        }

    findById(id: number): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.uri}/${id}`);
    }

    save(usuario: UsuarioRequest): Observable<UsuarioResponse> {
        return this.http.post<UsuarioResponse>(this.uri, usuario);
    }

    update(id: number, req: UsuarioRequest): Observable<UsuarioResponse> {
        return this.http.patch<UsuarioResponse>(`${this.uri}/${id}`, req);
    }

    delete(id?: number): Observable<any> {
        return this.http.delete<any>(`${this.uri}/${id}`);
    }
}
