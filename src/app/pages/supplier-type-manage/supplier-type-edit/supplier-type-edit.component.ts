import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-type-edit',
  templateUrl: './supplier-type-edit.component.html',
  styleUrls: ['./supplier-type-edit.component.scss']
})
export class SupplierTypeEditComponent implements OnInit {
  public result;
  public EditForm: FormGroup;
  @Input() supplierType;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.EditForm = new FormGroup({
      typeName: new FormControl('', Validators.required),
    });

    this.EditForm.controls['typeName'].setValue(this.supplierType.typeName);
  }

  editSupplierType() {
    if (this.EditForm.valid) {
      this.apiService
        .editSupplierTypes(
          this.supplierType._id,
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
