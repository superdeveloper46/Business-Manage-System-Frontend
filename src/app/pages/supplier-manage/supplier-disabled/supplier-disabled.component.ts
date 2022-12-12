import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-disabled',
  templateUrl: './supplier-disabled.component.html',
  styleUrls: ['./supplier-disabled.component.scss']
})
export class SupplierDisabledComponent implements OnInit {
  public result;
  public EditForm: FormGroup;
  @Input() supplier;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.EditForm = new FormGroup({
      disableDay: new FormControl('', Validators.required),
      disableRemark: new FormControl('', Validators.required)
    });
  }

  disabledSupplier() {
    var EditObj =
    {
      supplierName: this.supplier.supplierName,
      businessNo: this.supplier.businessNo,
      codeName: this.supplier.codeName,
      contactName: this.supplier.contactName,
      contactPhone: this.supplier.contactPhone,
      badRecord: this.supplier.badRecord,
      email: this.supplier.email,
      supplierTypeId: this.supplier.supplierTypeId,
      workersNum: this.supplier.workersNum,
      locationItem: this.supplier.locationItem,
      address: this.supplier.address,
      workTypeIdList: this.supplier.workTypeIdList,
      locationAreaList: this.supplier.locationAreaList,
      employeeId: this.supplier.employeeId,
      remark: this.supplier.remark,
      supplierBankData: this.supplier.supplierBankData,
      disableDay: this.EditForm.controls['disableDay'].value,
      disableRemark: this.EditForm.controls['disableRemark'].value,
      supplierCareList: this.supplier.supplierCareList,
      enable: false
    }
    if (this.EditForm.valid) {
      this.apiService.editSuppliers(
        this.supplier._id,
        EditObj ,
      ).subscribe((res) => {
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
