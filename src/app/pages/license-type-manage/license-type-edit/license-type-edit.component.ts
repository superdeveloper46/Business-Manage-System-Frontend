import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-license-type-edit',
  templateUrl: './license-type-edit.component.html',
  styleUrls: ['./license-type-edit.component.scss']
})

export class LicenseTypeEditComponent implements OnInit {
  public result;
  public EditForm: FormGroup;
  @Input() licenseType;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.EditForm = new FormGroup({
      licenseTypeName: new FormControl('', Validators.required),
    });

    this.EditForm.controls['licenseTypeName'].setValue(this.licenseType.licenseTypeName);
  }

  editLicenseType() {
    if (this.EditForm.valid) {
      this.apiService
        .editLicenseTypes(
          this.licenseType._id,
          this.EditForm.value
        )
        .subscribe((res) => {
          this.result = res as any;
          if (this.result.result_status == false) {
            Swal.fire({
              title: this.result.result_message,
              icon: 'error'
            });
          } else {
            this.activeModal.close();
          }
        });
    } else {
      Swal.fire({
        title: '請填寫必填欄位',
        confirmButtonText: '確定',
        confirmButtonColor: '#17A2B8',
        icon: 'error'
      });
    }
  }
}
