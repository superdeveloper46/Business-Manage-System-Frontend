import {Injectable} from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import {Observable} from 'rxjs';
// import { exit } from 'process';
import {AuthService} from '@services/auth.service';
import { TokenStorageService } from '@services/token-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private authService: AuthService,
        private tokenStorage: TokenStorageService,
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
            if (!this.authService.isAuthenticated()) {
                this.tokenStorage.signOut();
                this.router.navigate(['login']);
                return false;
            }
            return true;
        // return this.getProfile();
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.canActivate(next, state);
    }




    async getProfile() {
        if (this.authService.user) {
            return true;
        }

        try {
            await this.authService.getProfile();
            return true;
        } catch (error) {
            return false;
        }
    }
}
