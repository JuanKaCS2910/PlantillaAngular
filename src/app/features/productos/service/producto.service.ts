import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto, ProductoRequest, ProductoResponse } from '../model/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private uri = `${environment.URL_BASE}/api/productos`;
    private http = inject(HttpClient); // DI

    getAll(pagina = 1, tamanio = 1000): Observable<ProductoResponse> {
            return this.http.get<ProductoResponse>(`${this.uri}?pagina=${pagina}&tamanio=${tamanio}`);
        }

    findById(id: number): Observable<Producto> {
        return this.http.get<Producto>(`${this.uri}/${id}`);
    }

    save(producto: ProductoRequest): Observable<ProductoResponse> {
        return this.http.post<ProductoResponse>(this.uri, producto);
    }

    update(id: number, req: ProductoRequest): Observable<ProductoResponse> {
        return this.http.put<ProductoResponse>(`${this.uri}/${id}`, req);
    }

    delete(id?: number): Observable<any> {
        return this.http.delete<any>(`${this.uri}/${id}`);
    }

    uploadImage(formData: FormData): Observable<any> {
        return this.http.post<any>(`${environment.URL_BASE}/api/uploads`, formData);
        //          ↑ ajusta a la ruta real de tu API
    }

}
