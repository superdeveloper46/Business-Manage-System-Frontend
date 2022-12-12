import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.scss']
})
export class DepartmentEditComponent implements OnInit {
  public result;
  public Parentgetdepartments = new Array();
  s2departments: Select2OptionData[];
  public EditForm: FormGroup;
  public rootDepartmentIdv = [];
  @Input() department;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.EditForm = new FormGroup({
      depName: new FormControl('', Validators.required),
      level: new FormControl('0', Validators.required),
      depCode: new FormControl('', Validators.required),
      depChineseCode: new FormControl(''),
      rootDepartmentId: new FormControl(''),
      sort: new FormControl('0', Validators.required),
    });

    this.EditForm.controls['depName'].setValue(this.department.depName);
    this.EditForm.controls['level'].setValue(this.department.level);
    this.EditForm.controls['depCode'].setValue(this.department.depCode);
    this.EditForm.controls['depChineseCode'].setValue(this.department.depChineseCode);
    this.EditForm.controls['sort'].setValue(this.department.sort);
    this.EditForm.controls['rootDepartmentId'].setValue(this.department.rootDepartmentId);

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

    // var rootArr = new Array();
    // rootArr[0] = this.department.rootDepartmentId;
    // if (rootArr[0] != "") {
    //   this.EditForm.controls['rootDepartmentId'].setValue(rootArr.map(String));
    //   this.rootDepartmentIdv = rootArr.map(String);

    // } else {
    //   this.EditForm.controls['rootDepartmentId'].setValue(null);
    //   this.rootDepartmentIdv = null;
    // }
  }

  onChange_departments(val: string): void {
    val = val == null ? "" : val;
    this.EditForm.controls['rootDepartmentId'].setValue(val);
  }

  editDepartment() {
    if (this.EditForm.valid) {
      this.apiService
        .editDepartments(
          this.department._id,
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
