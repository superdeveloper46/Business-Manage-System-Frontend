import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-work-type-add',
  templateUrl: './work-type-add.component.html',
  styleUrls: ['./work-type-add.component.scss']
})
export class WorkTypeAddComponent implements OnInit {
  public result;
  public CreateForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.CreateForm = new FormGroup({
      workTypeName: new FormControl('', Validators.required),
      enable: new FormControl(true),
    });
  }

  addWorkType() {
    if (this.CreateForm.valid) {
      this.apiService
        .addWorkTypes(
          this.CreateForm.value
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
