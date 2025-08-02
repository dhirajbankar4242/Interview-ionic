import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../services/error-handler.service';
import { StorageService } from '../services/storage.service';
import { Global } from 'src/dto/dtos';

export const apiInterceptor: HttpInterceptorFn = (request, next) => {
  const localStorage = inject(StorageService);
  const authService = inject(HttpService);
  const router = inject(Router);
  const errorHandlerService = inject(ErrorHandlerService);
  const helper = new JwtHelperService();
  let refreshTokenInProgress = false;

  return from(localStorage.getItem(Global.key_token)).pipe(
    switchMap((token: string | null) => {
      if (request.url.includes('/auth')) {
        return next(request);
      }

      if (token && isAccessTokenExpired(token)) {
        return from(localStorage.getItem(Global.key_refresh_token)).pipe(
          switchMap((refreshToken: string | null) => {
            if (!refreshToken || isAccessTokenExpired(refreshToken)) {
              logout(localStorage, router);
              return throwError(() => new Error('Session expired'));
            }

            if (!refreshTokenInProgress) {
              refreshTokenInProgress = true;
              return authService.refreshAccessToken(refreshToken).pipe(
                switchMap(newToken => {
                  refreshTokenInProgress = false;
                  localStorage.setItem(Global.key_token, newToken);
                  return next(injectToken(request, newToken));
                }),
                catchError(error => {
                  logout(localStorage, router);
                  return throwError(() => error);
                })
              );
            }

            return next(request);
          })
        );
      } else if (token) {
        request = injectToken(request, token);
        return next(request);
      }

      return next(request);
    }),
    catchError((error: HttpErrorResponse) => {
      return errorHandlerService.handleError(error);
    })
  );

  function injectToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'X-Authorization': `Bearer ${token}`
      }
    });
  }

  function logout(localStorage: StorageService, router: Router) {
    localStorage.clear();
    router.navigate(['/login']);
  }

  function isAccessTokenExpired(token: string): boolean {
    try {
      return helper.isTokenExpired(token);
    } catch {
      return false;
    }
  }
};


// export const apiInterceptor: HttpInterceptorFn = (request, next) => {

//   const localStorage = inject(StorageService);
//   const authService = inject(HttpService);
//   const router = inject(Router);
//   const errorHandlerService = inject(ErrorHandlerService);
//   const helper = new JwtHelperService();
//   let refreshTokenInProgress = false;
//   const token = localStorage.getItem(Global.key_token);

//   if (request.url.includes('/auth')) {
//     return next(request);
//   }

//   if (token && isAccessTokenExpired(token)) {
//     const refreshToken = localStorage.getItem(Global.key_refresh_token);
    
//     if (refreshToken || isAccessTokenExpired(refreshToken)) {
//       logout(localStorage, router);
//       return throwError('Session expired');
//     } else {
//       if (!refreshTokenInProgress) {
//         refreshTokenInProgress = true;
//         return authService.refreshAccessToken(refreshToken).pipe(
//           switchMap(newToken => {
//             refreshTokenInProgress = false;
//             localStorage.setItem(Global.key_token, newToken);
//             return next(injectToken(request, localStorage));
//           }),
//           catchError(error => {
//             logout(localStorage, router);
//             return throwError(() => error);
//           })
//         );
//       }
//     }
//   } else if (token) {
//     request = injectToken(request, localStorage);
//     return next(request);
//   }

//   return next(request).pipe(
//     catchError((error: HttpErrorResponse) => {
//       // console.log(error)
//       return errorHandlerService.handleError(error);
//     })
//   );

//   function injectToken(request: HttpRequest<any>, localStorage: StorageService): HttpRequest<any> {
//       const token = localStorage.getItem(Global.key_token);
//       return request.clone({
//       setHeaders: {
//         'X-Authorization': `Bearer ${token}`
//       }
//     });
//   }

//   function logout(localStorage: StorageService, router: Router) {
//     localStorage.clear();
//     router.navigate(['/login']);
//   }

//   function isAccessTokenExpired(token: string): boolean {
//     try {
//       return helper.isTokenExpired(token);
//     } catch (e) {
//       return false;
//     }
//   }
  
// };
