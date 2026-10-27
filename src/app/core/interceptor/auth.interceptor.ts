import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { LoginService } from '../auth/login/services/login.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const token = sessionStorage.getItem('access_token')

  const authReq = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;

    return next(authReq).pipe(
        catchError((err: HttpErrorResponse) => {
            // solo 401 y que no sea el propio login/refresh (evita loops)
            const esAuth = req.url.includes('/api/auth/');
            if (err.status === 401 && !esAuth) {
                const refreshToken = sessionStorage.getItem('refresh_token');

                if (!refreshToken) {                     // sin refresh → al login
                    sessionStorage.clear();
                    router.navigate(['/login']);
                    return throwError(() => err);
                }

                return loginService.refresh(refreshToken).pipe(
                    switchMap((resp) => {
                        // guarda los NUEVOS tokens y reintenta el request original
                        sessionStorage.setItem('access_token', resp.datos.access_token);
                        sessionStorage.setItem('refresh_token', resp.datos.refresh_token);
                        const retryReq = req.clone({
                            setHeaders: { Authorization: `Bearer ${resp.datos.access_token}` }
                        });
                        return next(retryReq);
                    }),
                    catchError(() => {                    // refresh falló → sesión muerta → login
                        sessionStorage.clear();
                        router.navigate(['/login']);
                        return throwError(() => err);
                    })
                );
            }
            return throwError(() => err);
        })
    );

//   //console.log(token)
//   if (token) {
//     const clonedRequest = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return next(clonedRequest);
//   }

//   return next(req).pipe(                          // ← aquí va, en el return final
//         catchError((err: HttpErrorResponse) => {
//             if (err.status === 401) {
//                 sessionStorage.clear();
//                 inject(Router).navigate(['/login']);
//             }
//             return throwError(() => err);
//         })
//     );



};
