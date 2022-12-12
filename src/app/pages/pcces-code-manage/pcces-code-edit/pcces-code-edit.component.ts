import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pcces-code-edit',
  templateUrl: './pcces-code-edit.component.html',
  styleUrls: ['./pcces-code-edit.component.scss']
})
export class PccesCodeEditComponent implements OnInit {
  public result;
  public EditForm: FormGroup;
  @Input() pccesCode;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.EditForm = new FormGroup({
      _id: new FormControl('', Validators.required),
      itemKind: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required)
    });
    this.EditForm.controls['_id'].setValue(this.pccesCode._id);
    this.EditForm.controls['itemKind'].setValue(this.pccesCode.itemKind);
    this.EditForm.controls['description'].setValue(this.pccesCode.description);
    this.EditForm.controls['unit'].setValue(this.pccesCode.unit);
  }

  editPccesCode() {
    if (this.EditForm.valid) {
      this.apiService
        .editPccesCodes(
          this.pccesCode._id,
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
