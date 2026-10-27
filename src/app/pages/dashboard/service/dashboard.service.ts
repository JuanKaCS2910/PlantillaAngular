import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardResponse } from '@/app/pages/dashboard/model/layout';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

    private uri = `${environment.URL_BASE}/api/resumen`;
    private http = inject(HttpClient); // DI

    getResumen(): Observable<DashboardResponse> {
        return this.http.get<DashboardResponse>(`${this.uri}`);
    }

}
