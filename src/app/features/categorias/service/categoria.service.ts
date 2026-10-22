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

    getAll(): Observable<CategoriaResponse> {
        return this.http.get<CategoriaResponse>(this.uri);
    }

    findById(id: number): Observable<Categoria> {
        return this.http.get<Categoria>(`${this.uri}/${id}`);
    }

    save(category: CategoriaRequest): Observable<CategoriaResponse> {
        return this.http.post<CategoriaResponse>(this.uri, category);
    }

    delete(id?: number): Observable<any> {
        return this.http.delete<any>(`${this.uri}/${id}`);
    }
}
