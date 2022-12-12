import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

import {TokenStorageService} from './token-storage.service';
import {api_url} from './api_config';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public user: any = null;
    constructor(
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService,
        private tokenStorage: TokenStorageService,
        public jwtHelper: JwtHelperService
    ) {}

    async login({account, password}): Promise<Observable<any>> {
        try {
            const token = await this.http.post(
                api_url + '/api/auth/login',
                {
                    account,
                    password
                },
                httpOptions
            );
            return token;
        } catch (error) {
            this.toastr.error(error.message);
        }
    }
    async forgotPassword({account, personalNo}): Promise<Observable<any>> {
        try {
            const token = await this.http.post(
                api_url + '/api/auth/forgotpassword',
                {
                    account,
                    personalNo
                },
                httpOptions
            );
            return token;
        } catch (error) {
            this.toastr.error(error.message);
        }
    }
    async getProfile() {
        try {
            this.user = await this.http.get(api_url + '/getProfile');
        } catch (error) {
            this.logout();
            throw error;
        }
    }

    async logout() {
        try {
            this.user = await this.http
                .get(api_url + '/api/auth/logout')
                .subscribe({
                    next: (data) => {
                        //   this.roles = this.tokenStorage.getUser().roles;
                        //   this.reloadPage();
                    },
                    error: (err) => {
                        // this.errorMessage = err.error.message;
                        // this.isLoginFailed = true;
                    }
                });
            this.tokenStorage.signOut();
            this.router.navigate(['/login']);
            return this.user;
        } catch (error) {
            throw error;
        }
    }
    public isAuthenticated(): boolean {
        const token = this.tokenStorage.getToken();
        // Check whether the token is expired and return
        // true or false
        const expirationDate = new Date(
            this.jwtHelper.getTokenExpirationDate(token)
        );
        const servertime = expirationDate.getTime();
        const logintime = parseInt(window.localStorage.getItem('token-time'));
        const offsetSeconds = Math.round(
            (servertime - logintime) / 1000 - 86400
        );
        return !this.jwtHelper.isTokenExpired(token, offsetSeconds);
    }
    getAuthToken() {
        return localStorage.getItem('auth-token');
    }
}
