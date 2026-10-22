import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = sessionStorage.getItem('access_token')
  //console.log(token)
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req).pipe(                          // ← aquí va, en el return final
        catchError((err: HttpErrorResponse) => {
            if (err.status === 401) {
                sessionStorage.clear();
                inject(Router).navigate(['/login']);
            }
            return throwError(() => err);
        })
    );
};
