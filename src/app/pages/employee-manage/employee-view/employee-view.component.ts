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
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.scss']
})
export class EmployeeViewComponent implements OnInit {
  public result;
  public Parentgetdepartments = new Array();
  public ParentgetlicenseTypes = new Array();
  public ViewForm: FormGroup;
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


  Jobs: Array<string>;
  s2Jobs: Select2OptionData[];
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

  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.ViewForm = new FormGroup({
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

    });
    this.ViewForm.controls['empName'].setValue(this.employee.empName);
    this.ViewForm.controls['boss'].setValue(this.employee.boss);
    this.empGUID.setValue(this.employee.empGUID);
    this.ViewForm.controls['account'].setValue(this.employee.account);
    this.ViewForm.controls['password'].setValue(this.employee.password);
    this.ViewForm.controls['email'].setValue(this.employee.email);
    this.createDate.setValue(this.employee.createDate);
    this.lock.setValue(this.employee.lock);
    this.lockDate.setValue(this.employee.lockDate);
    if (this.employee.expireDate != null) {
      this.expireDate.setValue(this.formatDate(this.employee.expireDate));
    }
    this.ViewForm.controls['departmentId'].setValue(this.employee.departmentId);
    this.ViewForm.controls['personalNo'].setValue(this.employee.personalNo);
    this.ViewForm.controls['gender'].setValue(this.employee.gender);
    if (this.employee.birthday != null) {
      this.ViewForm.controls['birthday'].setValue(this.formatDate(this.employee.birthday));
    }
    if (this.employee.onBoardDate != null) {
      this.ViewForm.controls['onBoardDate'].setValue(this.formatDate(this.employee.onBoardDate));
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

  async ddlDepartments() {
    (await this.apiService.getDepartments()).subscribe((res) => {
      var Alldepartments = res as any;
      Alldepartments.forEach(element => {
        this.Parentgetdepartments.push({ id: element._id, name: element.depName });
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
    this.Jobs = val;
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
          this.formData.append('url', "employeePic");
          this.formData.append('uploadFile', file);

          const reader = new FileReader();
          reader.onload = e => this.EmployePicBuffer = reader.result;
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

  viewEmployee() {
    this.activeModal.close(this.ViewForm.controls['departmentId'].value);
  }


}
