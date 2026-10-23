import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca, MarcaRequest, MarcaResponse } from '../model/marca';

@Injectable({
  providedIn: 'root',
})

export class MarcaService {
    private uri = `${environment.URL_BASE}/api/marcas`;
    private http = inject(HttpClient); // DI

    getAll(pagina = 1, tamanio = 1000): Observable<MarcaResponse> {
            return this.http.get<MarcaResponse>(`${this.uri}?pagina=${pagina}&tamanio=${tamanio}`);
        }

    findById(id: number): Observable<Marca> {
        return this.http.get<Marca>(`${this.uri}/${id}`);
    }

    save(marca: MarcaRequest): Observable<MarcaResponse> {
        return this.http.post<MarcaResponse>(this.uri, marca);
    }

    update(id: number, req: MarcaRequest): Observable<MarcaResponse> {
        return this.http.put<MarcaResponse>(`${this.uri}/${id}`, req);
    }

    delete(id?: number): Observable<any> {
        return this.http.delete<any>(`${this.uri}/${id}`);
    }

}
