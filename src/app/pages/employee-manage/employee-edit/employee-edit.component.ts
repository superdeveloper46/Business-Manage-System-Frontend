import { ContactCardComponent } from './../contact-card/contact-card.component';
import { LicenseCardComponent } from './../license-card/license-card.component';
import { filter } from 'rxjs/operators';
import { Component, ElementRef, Input, OnInit, ViewChild, Renderer2, ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';
import { Select2OptionData } from 'ng-select2';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  public result;
  public Parentgetdepartments = new Array();
  public ParentgetlicenseTypes = new Array();
  public EditForm: FormGroup;
  public DepartmentIdv: String;

  empGUID = new FormControl('');
  createDate = new FormControl('');
  lock = new FormControl('');
  lockDate = new FormControl('');
  expireDate = new FormControl('');
  phone = new FormControl();
  address = new FormControl();
  expertise = new FormControl();
  interest = new FormControl();
  employeePic = new FormControl();
  employeeSeal = new FormControl();
  options: any = {
    multiple: true
  };
  fileName: string;
  fileName2: string;
  formData = new FormData();


  Jobs: [];
  Departments: String;
  Genders: String;
  s2Jobs: Select2OptionData[];
  s2Departments: Select2OptionData[];
  s2Genders: Select2OptionData[];
  contactList = [];
  licenseList = [];

  imgsrc = "";
  imgsrc2 = "";

  k = 0;
  k2 = 0;

  @Input() employee;
  @ViewChild('license', { static: false, read: ViewContainerRef }) target: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  @ViewChild('contact', { static: false, read: ViewContainerRef }) target2: ViewContainerRef;
  private componentRef2: ComponentRef<any>;
  EmployePicBuffer: string | ArrayBuffer;
  EmployeSealBuffer: string | ArrayBuffer;

  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.EditForm = new FormGroup({
      empName: new FormControl('', Validators.required),
      boss: new FormControl(''),
      account: new FormControl('', Validators.required),
      password: new FormControl(''),
      email: new FormControl('', Validators.required),
      departmentId: new FormControl('', Validators.required),
      personalNo: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      onBoardDate: new FormControl('', Validators.required),
      gender: new FormControl(true, Validators.required),
      jobList: new FormControl(null, Validators.required),

    });
    this.EditForm.controls['empName'].setValue(this.employee.empName);
    this.EditForm.controls['boss'].setValue(this.employee.boss);
    this.empGUID.setValue(this.employee.empGUID);
    this.EditForm.controls['account'].setValue(this.employee.account);
    this.EditForm.controls['password'].setValue(this.employee.password);
    this.EditForm.controls['email'].setValue(this.employee.email);
    this.createDate.setValue(this.employee.createDate);
    this.lock.setValue(this.employee.lock);
    this.lockDate.setValue(this.employee.lockDate);
    if (this.employee.expireDate != null) {
      this.expireDate.setValue(this.formatDate(this.employee.expireDate));
    }
    this.EditForm.controls['departmentId'].setValue(this.employee.departmentId);
    if (this.employee.departmentId != null) {
      this.Departments = this.employee.departmentId;
    }
    this.EditForm.controls['personalNo'].setValue(this.employee.personalNo);
    this.EditForm.controls['gender'].setValue(this.employee.gender);
    if (this.employee.birthday != null) {
      this.EditForm.controls['birthday'].setValue(this.formatDate(this.employee.birthday));
    }
    if (this.employee.onBoardDate != null) {
      this.EditForm.controls['onBoardDate'].setValue(this.formatDate(this.employee.onBoardDate));
    }

    if (this.employee.jobList.length > 0) {
      this.Jobs = this.employee.jobList.map(String);
    }



    this.phone.setValue(this.employee.phone);
    this.address.setValue(this.employee.address);
    this.expertise.setValue(this.employee.expertise);
    this.interest.setValue(this.employee.interest);
    if (this.employee.contactList != null && this.employee.contactList.length > 0) {
      this.employee.contactList.forEach(element => {
        this.contactList.push(element);
      })
    } else {
      this.contactList.push({ contactName: "", relationship: "", contactPhone: "" });
    }
    if (this.employee.licenseList != null && this.employee.licenseList.length > 0) {
      this.employee.licenseList.forEach(element => {
        if (element['nextTrainDate'] != null) {
          element['nextTrainDate'] = this.formatDate(element['nextTrainDate']);
        }
        this.licenseList.push(element);
      })
    } else {
      this.licenseList.push({ licenseType: "0", licenseName: "", approveUse: true, needTrain: true, nextTrainDate: "" });
    }
    if (this.employee.employeePic != "" && this.employee.employeePic != null) {
      this.employeePic.setValue(this.employee.employeePic);

      this.apiService.download(this.employee.employeePic).subscribe((res) => {
        this.imgsrc = this.apiService.downLoadFileToBase64(res);
      });
    }

    if (this.employee.employeeSeal != "" && this.employee.employeeSeal != null) {
      this.employeeSeal.setValue(this.employee.employeeSeal);

      this.apiService.download(this.employee.employeeSeal).subscribe((res) => {
        this.imgsrc2 = this.apiService.downLoadFileToBase64(res);
      });
    }
    this.ddlDepartments();
    this.ddlJobs();
    this.ddlLicenseTypes();
    this.ddlGenders();

    this.k = this.licenseList.length - 1;
    this.k2 = this.contactList.length - 1;
  }

  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  async ddlGenders() {
    let arrGenders = [];
    arrGenders.push({ id: true, text: "男" }, { id: false, text: "女" });
    this.s2Genders = arrGenders;
  }


  async ddlDepartments() {
    let arrDepartments = [];
    let k = 0;
    (await this.apiService.getDepartments()).subscribe((res) => {
      var AllDepartments = res as any;
      AllDepartments.forEach(element => {
        arrDepartments.push({ id: element._id, text: element.depName });
        k++;
        if (k == AllDepartments.length) {
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

  async ddlLicenseTypes() {
    (await this.apiService.getLicenseTypes()).subscribe((res) => {
      var AlllicenseTypes = res as any;
      AlllicenseTypes.forEach(element => {
        this.ParentgetlicenseTypes.push({ id: element._id, name: element.licenseTypeName });
      });
    });
  }

  onChange_Jobs(val: []): void {
    if(typeof val == "string"){
      this.Jobs = [];
      this.Jobs.push(val);
    }else{
      this.Jobs = val;
    }
  }


  onChange_Departments(val: String): void {
    this.Departments = val;
  }

  onChange_Genders(val: String): void {
    this.Genders = val;
  }


  addLicense() {
    this.k++;
    let childComponent = this.resolver.resolveComponentFactory(LicenseCardComponent);
    this.componentRef = this.target.createComponent(childComponent);
    this.componentRef.instance.k = this.k;

  }

  addEmergencyContact() {
    this.k2++;
    let childComponent = this.resolver.resolveComponentFactory(ContactCardComponent);
    this.componentRef2 = this.target2.createComponent(childComponent);
    this.componentRef2.instance.k2 = this.k2;
  }

  del(type, index) {
    if (type == "e") {
      $("input[name='EmergencyContact[" + index + "].contactName']").val('')
    } else {
      $("input[name='License[" + index + "].licenseName']").val('')
    }
    $("#" + type + "_" + index).hide();
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
      } else {

        this.fileName = file.name;
        var FileExtensionArr = ["jpg", "png"];
        if (FileExtensionArr.indexOf((this.fileName.split('.')[this.fileName.split('.').length - 1]).toLowerCase()) > -1) {
          this.formData.append('url', "employeeSeal");
          this.formData.append('uploadFile', file);

          const reader = new FileReader();
          reader.onload = e => this.EmployeSealBuffer = reader.result;
          reader.readAsDataURL(file);

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

  editEmployee() {
    this.EditForm.controls['jobList'].setValue(this.Jobs);
    if (this.EditForm.valid) {

      //緊急連絡人處理
      var EmergencyContactObj = $('#EmergencyContactForm').serializeArray();
      var EmergencyContactLen = EmergencyContactObj.length / 3;
      var j = 0;
      this.contactList = [];
      for (var i = 0; i < EmergencyContactLen; i++) {
        if (EmergencyContactObj[j].value != "") {
          var contactName = EmergencyContactObj[j].value;
          var relationship = EmergencyContactObj[j + 1].value;
          var contactPhone = EmergencyContactObj[j + 2].value;
          var _id = UUID.UUID();
          this.contactList.push({ _id, contactName, relationship, contactPhone });
        }
        j = j + 3;
      }

      //證照處理
      var LicenseObj = $('#LicenseForm').serializeArray();
      var LicenseLen = LicenseObj.length / 5;
      var j = 0;
      this.licenseList = [];
      for (var i = 0; i < LicenseLen; i++) {
        if (LicenseObj[j + 1].value != "" && LicenseObj[j].value != "") {
          var LT = this.ParentgetlicenseTypes.filter((item) => item.id == LicenseObj[j].value);
          var licenseType = { _id: LicenseObj[j].value, licenseTypeName: LT[0]['name'] };
          var licenseName = LicenseObj[j + 1].value;
          var approveUse = LicenseObj[j + 2].value;
          var needTrain = LicenseObj[j + 3].value;
          var nextTrainDate = LicenseObj[j + 4].value;
          var _id = UUID.UUID();
          this.licenseList.push({ _id, licenseType, licenseName, approveUse, needTrain, nextTrainDate });
        }
        j = j + 5;
      }
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
              this.employeeSeal.setValue("employeeSeal/" + res["name"]);
              this.callEdit(this.employeeSeal.value);
            }
          });
      } else {
        this.callEdit(this.employee.employeeSeal || "");
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


  callEdit(employeeSealPath) {
    // var JobList = [];
    // JobList[0] = this.Jobs;


    this.apiService
      .editEmployees(
        this.employee._id,
        this.EditForm.controls['empName'].value,
        this.EditForm.controls['boss'].value,
        this.EditForm.controls['password'].value,
        this.EditForm.controls['email'].value,
        this.lock.value,
        this.expireDate.value,
        this.EditForm.controls['departmentId'].value,
        this.EditForm.controls['birthday'].value,
        this.EditForm.controls['onBoardDate'].value,
        this.EditForm.controls['gender'].value,
        this.EditForm.controls['personalNo'].value,
        this.Jobs,

        this.employee.empGUID,
        this.EditForm.controls['account'].value,
        this.employee.createDate,
        this.employee.lockDate,

        this.employee.phone,
        this.employee.address,
        this.employee.expertise,
        this.employee.interest,
        this.employee.contactList,
        this.employee.licenseList,
        this.employee.employeePic,
        employeeSealPath,
      )
      .subscribe((res) => {
        this.result = res as any;
        if (this.result.result_status == false) {
          Swal.fire({
            title: this.result.result_message,
            icon: 'error'
          });
        } else if (typeof this.result['msg'] === 'string' && this.result != null){
          Swal.fire({
            title: this.result['msg'],
            confirmButtonText: '確定',
            confirmButtonColor: '#17A2B8',
            icon: 'error'
          });
        }else {
          this.activeModal.close(this.EditForm.controls['departmentId'].value);
        }
      });
  }

  closeModal(){
    this.activeModal.close(this.EditForm.controls['departmentId'].value);
  }

}
