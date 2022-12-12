import {
    Component,
    HostBinding,
    OnDestroy,
    OnInit
} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {AuthService} from '@services/auth.service';
import {AppService} from '@services/app.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
    // @HostBinding('class') class = 'login-box';
    public forgotPasswordForm: UntypedFormGroup;
    public isAuthLoading = false;

    constructor(
        public activeModal: NgbActiveModal,
        private authService: AuthService,
        // private appService: AppService
    ) {}

    ngOnInit(): void {
        this.forgotPasswordForm = new UntypedFormGroup({
            account: new UntypedFormControl(null, Validators.required),
            personalNo: new UntypedFormControl(null, Validators.required)
        });
    }

    focusNext(i) {
        let nextElementSiblingId = 'modal_input'+ (i+1);
        console.log(i,nextElementSiblingId,document.getElementById(nextElementSiblingId));
        if (i==0) {
            document.getElementById(nextElementSiblingId).focus()
        }
        else{
            this.forgotPassword();
        }
    }
    async forgotPassword() {
        if (this.forgotPasswordForm.valid) {
            ( await this.authService.forgotPassword(this.forgotPasswordForm.value) ).subscribe({
                next: data => {
                    if(data.status != undefined){
                        if(data.status == 0){
                            Swal.fire({
                                title: "系統密碼已寄送至您的信箱，請到信箱查看，謝謝!",
                                icon: 'success',
                                confirmButtonColor: "#17a2b8",
                            });
                        }
                        else if(data.status == 1){
                            Swal.fire({
                                title: data.message,
                                icon: 'warning',
                                confirmButtonColor: "#17a2b8",
                            });
                        }
                    }
                },
                error: err => {
                    Swal.fire({
                        title: "An error occurred in the servicer",
                        icon: 'error',
                        confirmButtonColor: "#17a2b8",
                    });
                }
              });
        } else {
            Swal.fire({
                title: "Form is not valid!'",
                icon: 'error',
                confirmButtonColor: "#17a2b8",
            });
        }
    }

    ngOnDestroy(): void {
        console.log("destroyed");
    }
}
