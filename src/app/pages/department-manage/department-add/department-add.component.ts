import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.scss']
})
export class DepartmentAddComponent implements OnInit {
  public result;
  public Parentgetdepartments = new Array();
  s2departments: Select2OptionData[];

  public CreateForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }


  ngOnInit(): void {
    this.CreateForm = new FormGroup({
      depName: new FormControl('', Validators.required),
      level: new FormControl('0', Validators.required),
      depCode: new FormControl('', Validators.required),
      depChineseCode: new FormControl(''),
      rootDepartmentId: new FormControl(''),
      sort: new FormControl('0', Validators.required),
    });
    this.ddlDepartments();
  }

  async ddlDepartments() {
    (await this.apiService.getDepartments()).subscribe((res) => {
      var Alldepartments = res as any;
      Alldepartments.forEach(element => {
        this.Parentgetdepartments.push({ id: element._id, text: element.depName });
      });
      this.s2departments = this.Parentgetdepartments;
    });
  }

  onChange_departments(val: FormControl): void {
    this.CreateForm.controls['rootDepartmentId'].setValue(val);
  }

  addDepartment() {
    if (this.CreateForm.valid) {
      this.apiService
        .addDepartments(
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
