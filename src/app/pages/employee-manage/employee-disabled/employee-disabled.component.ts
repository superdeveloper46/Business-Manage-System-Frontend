import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-disabled',
  templateUrl: './employee-disabled.component.html',
  styleUrls: ['./employee-disabled.component.scss']
})
export class EmployeeDisabledComponent implements OnInit {
  public result;
  public EditForm: FormGroup;
  @Input() employee;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.EditForm = new FormGroup({
      lockDate: new FormControl('', Validators.required),
    });
  }

  disabledEmployee() {
    if (this.EditForm.valid) {
      this.apiService.editEmployees(
        this.employee['_id'],
        this.employee['empName'],
        this.employee['boss'],
        this.employee['password'],
        this.employee['email'],
        true,
        this.employee['expireDate'],
        this.employee['departmentId'],
        this.employee['birthday'],
        this.employee['onBoardDate'],
        this.employee['gender'],
        this.employee['personalNo'],
        this.employee['jobList'],

        this.employee['empGUID'],
        this.employee['account'],
        this.employee['createDate'],
        this.EditForm.controls['lockDate'].value,

        this.employee['phone'],
        this.employee['address'],
        this.employee['expertise'],
        this.employee['interest'],
        this.employee['contactList'],
        this.employee['licenseList'],
        this.employee['employeePic'],
        this.employee['employeeSeal'],
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
