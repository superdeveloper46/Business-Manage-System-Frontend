import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-work-type-edit',
  templateUrl: './work-type-edit.component.html',
  styleUrls: ['./work-type-edit.component.scss']
})
export class WorkTypeEditComponent implements OnInit {
  public result;
  public EditForm: FormGroup;
  @Input() workType;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.EditForm = new FormGroup({
      workTypeName: new FormControl('', Validators.required),
      enable: new FormControl(true),
    });
    this.EditForm.controls['workTypeName'].setValue(this.workType.workTypeName);
    this.EditForm.controls['enable'].setValue(this.workType.enable);

  }

  editWorkType() {
    if (this.EditForm.valid) {
      this.apiService
        .editWorkTypes(
          this.workType._id,
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
