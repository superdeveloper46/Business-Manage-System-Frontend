import { HTTP_INTERCEPTORS, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {
  Router
} from '@angular/router';

import { TokenStorageService } from '../services/token-storage.service';
import {AuthService} from '@services/auth.service';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    let ok: string;
    let res;
    const token = this.tokenStorage.getToken();
    if (token != null) {
      if (!this.authService.isAuthenticated()) {
        this.tokenStorage.signOut();
        this.router.navigate(['login']);
      }
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    else{
    }
    return next.handle(authReq)
    .pipe(
      tap({
        // Succeeds when there is a response; ignore other events
        next: (event) => (ok = event instanceof HttpResponse ? 'succeeded' : '',res = event),
        // Operation failed; error is an HttpErrorResponse
        error: (error) => (ok = 'failed',res = error)
      }),
      // Log when response observable either completes or errors
      finalize(() => {
        if(res.error){
          if(res.error.status == 401){
            this.toastr.error(res.error.message);
            window.localStorage.removeItem(TOKEN_KEY);
            window.localStorage.removeItem(USER_KEY);
          }
          else if(res.error.status == 500){
            this.toastr.error("An error occurred in the servicer");
          }
        }
      })
    );
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];