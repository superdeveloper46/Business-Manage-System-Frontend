import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {
    NgbModalConfig,
    NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '@services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [NgbModalConfig, NgbModal]
})
export class LoginComponent implements OnInit, OnDestroy {
    // @HostBinding('class') class = 'login-box';
    public loginForm: UntypedFormGroup;
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    // roles: string[] = [];

    constructor(
        private renderer: Renderer2,
        private router: Router,
        private toastr: ToastrService,
        private authService: AuthService,
        private tokenStorage: TokenStorageService,
        config: NgbModalConfig,
        private modalService: NgbModal
    ) {
        config.backdrop = true;
        config.keyboard = false;
        config.centered = true;
    }
    focusNext(i) {
        let nextElementSiblingId = 'input'+ (i+1);
        if (i==0) {
            document.getElementById(nextElementSiblingId).focus()
        }
        else{
            this.loginByAuth();
        }
    }
    forgotPasswordModal(){
        const modalRef = this.modalService.open(ForgotPasswordComponent,{windowClass: 'forgot-password'});
        modalRef.result.then(
            () => {
                console.log('When user closes');
            },
            () => {
                console.log('Backdrop click')
            }
        )
    }
    ngOnInit() {
        if (this.authService.isAuthenticated()) {
            this.isLoggedIn = true;
            // this.roles = this.tokenStorage.getUser().roles;
        }
        this.loginForm = new UntypedFormGroup({
            account: new UntypedFormControl(null, Validators.required),
            password: new UntypedFormControl(null, Validators.required)
        });
    }

    async loginByAuth() {
        if (this.loginForm.valid) {
            this.isAuthLoading = true;
            (await this.authService.login(this.loginForm.value)).subscribe({
                next: data => {
                    if(data.status != undefined){
                        this.toastr.warning(data.message);
                    }
                    else{
                        this.tokenStorage.saveToken(data.accessToken);
                        this.tokenStorage.saveUser(data);
                        this.isLoginFailed = false;
                        this.isLoggedIn = true;
                        this.router.navigate(['/']);
                    }
                //   this.roles = this.tokenStorage.getUser().roles;
                },
                error: err => {
                  this.errorMessage = err.error.message;
                  this.isLoginFailed = true;
                }
              });
            this.isAuthLoading = false;
        } else {
            this.toastr.error('Form is not valid!');
        }
    }
    // async loginByAuth1() {
    //     if (this.loginForm.valid) {
    //         this.isAuthLoading = true;
    //         await this.appService.loginByAuth(this.loginForm.value);
    //         this.isAuthLoading = false;
    //     } else {
    //         this.toastr.error('Form is not valid!');
    //     }
    // }

    // async loginByGoogle() {
    //     this.isGoogleLoading = true;
    //     await this.appService.loginByGoogle();
    //     this.isGoogleLoading = false;
    // }

    // async loginByFacebook() {
    //     this.isFacebookLoading = true;
    //     await this.appService.loginByFacebook();
    //     this.isFacebookLoading = false;
    // }

    ngOnDestroy() {
        console.log('login is destroyed');
    }
}
