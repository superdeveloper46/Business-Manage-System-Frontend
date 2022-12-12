import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {
  public result;
  public CreateForm: FormGroup;
  public DepartmentIdv: String;
  options: any = {
    multiple: true
  };

  Jobs: Array<string>;
  Departments: String;
  Genders: String;
  s2Jobs: Select2OptionData[];
  s2Departments: Select2OptionData[];
  s2Genders: Select2OptionData[];

  fileName: string;
  formData = new FormData();
  @Input() selectDepartmentNode;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.CreateForm = new FormGroup({
      empName: new FormControl('', Validators.required),
      boss: new FormControl(''),
      account: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      departmentId: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      onBoardDate: new FormControl('', Validators.required),
      gender: new FormControl(true, Validators.required),
      personalNo: new FormControl('', Validators.required),
      jobList: new FormControl(null, Validators.required),
      employeeSeal: new FormControl(null),
    });
    this.ddlDepartments();
    this.ddlJobs();
    this.ddlGenders();


    var departmentsArr = new Array();
    departmentsArr[0] = this.selectDepartmentNode;
    if (departmentsArr[0] != "") {
      this.CreateForm.controls['departmentId'].setValue(departmentsArr[0]);
      this.DepartmentIdv = departmentsArr[0];

    } else {
      this.CreateForm.controls['departmentId'].setValue(null);
      this.DepartmentIdv = null;
    }
  }

  async ddlDepartments() {
    let arrDepartments = [];
    let k = 0;
    (await this.apiService.getDepartments()).subscribe((res) => {
      var Alldepartments = res as any;
      Alldepartments.forEach(element => {
        arrDepartments.push({ id: element._id, text: element.depName });
        k++;
        if (k == Alldepartments.length) {
          this.s2Departments = arrDepartments;
        }
      });
    });
  }

  async ddlJobs() {
    let arrJobs = [];
    let k = 0;
    (await this.apiService.getJobs()).subscribe((res) => {
      var Alljobs = res as any;
      Alljobs.forEach(element => {
        arrJobs.push({ id: element._id, text: element.jobName });
        k++;
        if (k == Alljobs.length) {
          this.s2Jobs = arrJobs;
        }
      });
    });
  }

  async ddlGenders() {
    let arrGenders = [];
    arrGenders.push({ id: true, text: "男" }, { id: false, text: "女" });
    this.s2Genders = arrGenders;
  }

  onChange_Jobs(val: []): void {
    this.Jobs = val;
  }

  onChange_Departments(val: String): void {
    this.Departments = val;
  }

  onChange_Genders(val: String): void {
    this.Genders = val;
  }

  fileSelected(e) {
    const file: File = e.target.files[0];
    if (file) {
      if (file.size > 104857600) {
        this.fileName = "";
        Swal.fire({
          title: '檔案不得超過100MB!',
          confirmButtonText: '確定',
          confirmButtonColor: '#17A2B8',
          icon: 'error'
        });
      }
      else {
        this.fileName = file.name;
        var FileExtensionArr = ["jpg", "png"];
        if (FileExtensionArr.indexOf((this.fileName.split('.')[this.fileName.split('.').length - 1]).toLowerCase()) > -1) {
          this.formData.append('url', "employeeSeal");
          this.formData.append('uploadFile', file);

        } else {
          this.fileName = "";
          Swal.fire({
            title: '檔案類型不正確!',
            confirmButtonText: '確定',
            confirmButtonColor: '#17A2B8',
            icon: 'error'
          });
        }
      }
    }
  }

  addEmployee() {
    var JobList = [];
    if(this.Jobs != undefined){
      JobList.push(this.Jobs);
    }else{
      JobList=null;
    }
    this.CreateForm.controls['jobList'].setValue(JobList);
    this.CreateForm.controls['departmentId'].setValue(this.Departments);
    if (this.CreateForm.valid) {
      if (this.fileName != undefined) {
        this.apiService
          .uploadData(
            this.formData
          )
          .subscribe((res) => {
            this.result = res as any;
            if (this.result.result_status == false) {
              Swal.fire({
                title: this.result.result_message,
                icon: 'error'
              });
            } else {

              this.callAdd("employeeSeal/" + res["name"]);
            }
          });
      } else {
        this.callAdd("");
      }


    } else {
      Swal.fire({
        title: '請填寫必填欄位',
        confirmButtonText: '確定',
        confirmButtonColor: '#17A2B8',
        icon: 'error'
      });
    }
  }

  callAdd(employeeSealPath) {


    this.CreateForm.controls['employeeSeal'].setValue(employeeSealPath);

    this.CreateForm.controls['gender'].setValue(this.Genders || true);
    this.apiService
      .addEmployees(
        this.CreateForm.value
      )
      .subscribe((res) => {
        this.result = res as any;
        if (this.result.result_status == false) {
          Swal.fire({
            title: this.result.result_message,
            icon: 'error'
          });
        }
        else if(typeof this.result['msg'] === 'string' && this.result != null){
          Swal.fire({
            title: this.result['msg'],
            confirmButtonText: '確定',
            confirmButtonColor: '#17A2B8',
            icon: 'error'
          });
        }
        else {
          this.activeModal.close(this.CreateForm.controls['departmentId'].value);
        }
      });
  }

  closeModal(){
    this.activeModal.close(this.DepartmentIdv);
  }
}
