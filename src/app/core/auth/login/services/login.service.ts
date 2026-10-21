import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../model/login.request';
import { Observable } from 'rxjs';
import { LoginResponse } from '../model/login.response';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

private uri = `${environment.URL_BASE}/api/auth/login`;

private http = inject(HttpClient); // DI

login(loginRequest:LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.uri, loginRequest);
  }

}
