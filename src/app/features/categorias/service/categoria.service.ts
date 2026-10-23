import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria, CategoriaRequest, CategoriaResponse } from '../model/categoria';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {
    private uri = `${environment.URL_BASE}/api/categorias`;

    private http = inject(HttpClient); // DI

    getAll(pagina = 1, tamanio = 1000): Observable<CategoriaResponse> {
        return this.http.get<CategoriaResponse>(`${this.uri}?pagina=${pagina}&tamanio=${tamanio}`);
    }

    findById(id: number): Observable<Categoria> {
        return this.http.get<Categoria>(`${this.uri}/${id}`);
    }

    save(category: CategoriaRequest): Observable<CategoriaResponse> {
        return this.http.post<CategoriaResponse>(this.uri, category);
    }

    update(id: number, req: CategoriaRequest): Observable<CategoriaResponse> {
        return this.http.put<CategoriaResponse>(`${this.uri}/${id}`, req);
    }

    delete(id?: number): Observable<any> {
        return this.http.delete<any>(`${this.uri}/${id}`);
    }
}
