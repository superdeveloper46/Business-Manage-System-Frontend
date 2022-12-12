import { ContactCardComponent } from './../employee-manage/contact-card/contact-card.component';
import { LicenseCardComponent } from './../employee-manage/license-card/license-card.component';
import { Component, ElementRef, Input, OnInit, ViewChild, Renderer2, ViewContainerRef, ComponentRef, ComponentFactoryResolver, DebugElement } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';
import { Select2OptionData } from 'ng-select2';
import { TokenStorageService } from '../../services/token-storage.service';
import { RightService } from '@services/right.service';
import { HelperService } from '@services/helper.service';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  getRight: any;
  RightObj: {};
  public result;
  public employee;
  public Parentgetdepartments = new Array();
  public ParentgetlicenseTypes = new Array();
  public EditForm: FormGroup;
  public DepartmentIdv: String;
  empGUID = new FormControl('');
  password = new FormControl('');
  createDate = new FormControl('');
  lock = new FormControl('');
  lockDate = new FormControl('');
  expireDate = new FormControl('');
  phone = new FormControl();
  address = new FormControl();
  expertise = new FormControl();
  interest = new FormControl();
  employeePic = new FormControl('');
  employeeSeal = new FormControl('');
  options: any = {
    multiple: true
  };
  fileName: string;
  fileName2: string;
  formData = new FormData();
  formDataList = [];
  Jobs: Array<string>;
  Departments: String;
  Genders: String;
  s2Jobs: Select2OptionData[];
  s2Departments: Select2OptionData[];
  s2Genders: Select2OptionData[];
  contactList = [];
  licenseList = [];
  newcontactList = [];
  newlicenseList = [];

  imgsrc = "";
  imgsrc2 = "";

  k = 0;
  k2 = 0;

  @ViewChild('license', { static: false, read: ViewContainerRef }) target: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  @ViewChild('contact', { static: false, read: ViewContainerRef }) target2: ViewContainerRef;
  private componentRef2: ComponentRef<any>;
  EmployePicBuffer: string | ArrayBuffer;
  EmployeSealBuffer: string | ArrayBuffer;

  constructor(
    public apiService: ApiService,
    public elementRef: ElementRef,
    public renderer: Renderer2,
    private tokenStorage: TokenStorageService,
    private resolver: ComponentFactoryResolver,
    public rightService: RightService,
    public helperService: HelperService,
  ) { this.getRight = this.rightService.getRight(); }

  ngOnInit(): void {
    this.RightObj = this.getRight['__zone_symbol__value'];


    this.EditForm = new FormGroup({
      empName: new FormControl('', Validators.required),
      boss: new FormControl(''),
      account: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      departmentId: new FormControl('', Validators.required),
      personalNo: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      onBoardDate: new FormControl('', Validators.required),
      gender: new FormControl(true, Validators.required),
      employeeSeal: new FormControl(null),
    });
    var userId = this.tokenStorage.getUser().id;
    this.apiService.getEmployee(userId).subscribe((res) => {
      this.employee = res as any;


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

      this.password.setValue(this.employee.password);
      this.phone.setValue(this.employee.phone);
      this.address.setValue(this.employee.address);
      this.expertise.setValue(this.employee.expertise);
      this.interest.setValue(this.employee.interest);

      if (this.employee.contactList != null && this.employee.contactList.length > 0) {
        this.employee.contactList.forEach(element => {
          this.contactList.push(element);
          this.newcontactList.push(element);
        })
        this.k2 = this.contactList.length - 1;
      } else {
        // this.contactList.push({ _id: "", contactName: "", relationship: "", contactPhone: "" });
        this.addEmergencyContact();
      }

      if (this.employee.licenseList != null && this.employee.licenseList.length > 0) {
        this.employee.licenseList.forEach(element => {
          if (element['nextTrainDate'] != null) {
            element['nextTrainDate'] = this.formatDate(element['nextTrainDate']);
          }
          this.licenseList.push(element);
          this.newlicenseList.push(element);

        })
        this.k = this.licenseList.length - 1;
      } else {
        // this.licenseList.push({ _id: "", licenseType: "0", licenseName: "", approveUse: true, needTrain: true, nextTrainDate: "" });
        this.addLicense();
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
      this.helperService.AutoSave(this.renderer, this.elementRef.nativeElement, "employee", this.employee._id);
    });
    this.ddlDepartments();
    this.ddlJobs();
    this.ddlGenders();
    this.ddlLicenseTypes();



    // $("#addLicense").prop("disabled",true);
    //$("#addEmergencyContact").prop("disabled",true);

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

    var self = this;
    setTimeout(function () {
      self.editDynamic(2, 'add', 0);
    }, 100);
  }

  addEmergencyContact() {
    this.k2++;
    let childComponent = this.resolver.resolveComponentFactory(ContactCardComponent);
    this.componentRef2 = this.target2.createComponent(childComponent);
    this.componentRef2.instance.k2 = this.k2;
    var self = this;
    setTimeout(function () {
      self.editDynamic(1, 'add', 0);
    }, 100);
  }

  del(type, index) {
    var id;
    if (type == "e") {
      id = $("input[name='EmergencyContact[" + index + "]._id']").val();
    } else {
      id = $("input[name='License[" + index + "]._id']").val();
    }
    $("#" + type + "_" + index).hide();

    var s = (type == 'e') ? 1 : 2;
    this.editDynamic(s, 'del', id);
  }

  fileSelected(e, type) {
    this.formData = new FormData();
    const file: File = e.target.files[0];
    if (file) {
      if (file.size > 104857600) {
        this.fileName = "";
        Swal.fire({
          title: '檔案不得超過100MB，請重新上傳',
          confirmButtonText: '確定',
          confirmButtonColor: '#17A2B8',
          icon: 'error'
        });
      } else {
        if (type == "pic") {
          this.fileName = file.name;
          var FileExtensionArr = ["jpg", "png"];
          if (FileExtensionArr.indexOf((this.fileName.split('.')[this.fileName.split('.').length - 1]).toLowerCase()) > -1) {
            this.formData.append('url', "employeePic");
            this.formData.append('uploadFile', file);
            const reader = new FileReader();
            reader.onload = e => this.EmployePicBuffer = reader.result;
            reader.readAsDataURL(file);
            // this.formDataList[0] = { type: type, fileName: this.fileName, formData: this.formData };

          }
        } else if (type == "seal") {
          this.fileName2 = file.name;
          var FileExtensionArr = ["jpg", "png"];
          if (FileExtensionArr.indexOf((this.fileName2.split('.')[this.fileName2.split('.').length - 1]).toLowerCase()) > -1) {
            this.formData.append('url', "employeeSeal");
            this.formData.append('uploadFile', file);
            const reader = new FileReader();
            reader.onload = e => this.EmployeSealBuffer = reader.result;
            reader.readAsDataURL(file);
            // this.formDataList[1] = { type: type, fileName: this.fileName2, formData: this.formData };

          }
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
                if (type == 'pic') {
                  this.helperService.callUpdate("employee", null, this.employee._id, "employeePic", "employeePic/" + res["name"], "個人照", "String")
                } else if (type == 'seal') {
                  this.helperService.callUpdate("employee", null, this.employee._id, "employeeSeal", "employeeSeal/" + res["name"], "印章電子檔", "String")
                }
              }
            });
        }
      }

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

  editDynamic(t, action, id) {
    if (action == 'add') {
      var _id = "";
      if (t == 1) {
        // var _id = UUID.UUID();
        // this.newcontactList.push({ _id: _id, contactName: "", relationship: "", contactPhone: "" });
        this.helperService.AddDataByColumn(
          "employee",
          "contactList",
          this.employee._id,
        )
          .subscribe((res) => {
            if (res['status'] !== 'error') {
              _id = res['_id'];
              var self = this;
              $("input[name='EmergencyContact[" + self.k2 + "]._id']").val(_id);
              $("input[name='EmergencyContact[" + self.k2 + "]._id']").attr("data-cId", this.employee._id);
              $("input[name^='EmergencyContact[" + self.k2 + "]").each(function (value, index) {
                var name = $(this).attr("name");
                var Cname = "";
                if (name.indexOf('contactName') > -1) {
                  Cname = "";
                }
                if (name.indexOf('relationship') > -1) {
                  Cname = ":關係";
                }
                if (name.indexOf('contactPhone') > -1) {
                  Cname = ":聯絡電話";
                }
                $(this).addClass("updateDataByColumn updateDataByListColumn");
                $(this).attr("data-label", "緊急聯絡人" + (self.k2 + 1) + Cname);
                $(this).attr("data-subdocName", "contactList");
                $(this).attr("data-subdocId", _id);
              });
            }
          })
      }
      else if (t == 2) {
        // var _id = UUID.UUID();
        // this.newlicenseList.push({ _id: _id, licenseType: this.ParentgetlicenseTypes[0], licenseName: "", approveUse: true, needTrain: true, nextTrainDate: null });
        this.helperService.AddDataByColumn(
          "employee",
          "licenseList",
          this.employee._id,
        )
          .subscribe((res) => {
            if (res['status'] !== 'error') {
              _id = res['_id'];
              var self = this;
              $("input[name='License[" + self.k + "]._id']").val(_id);
              $("input[name='License[" + self.k + "]._id']").attr("data-cId", this.employee._id);
              $("[name^='License[" + self.k + "]").each(function (value, index) {
                var name = $(this).attr("name");
                var Cname = "";
                if (name.indexOf('licenseTypeId') > -1) {
                  Cname = ":類別";
                  // $(this).attr("data-selectName", "licenseType._id");
                }
                if (name.indexOf('licenseName') > -1) {
                  Cname = ":證照名稱";
                }
                if (name.indexOf('approveUse') > -1) {
                  Cname = ":予以公司使用";
                }
                if (name.indexOf('needTrain') > -1) {
                  Cname = ":是否回訓";
                }
                if (name.indexOf('nextTrainDate') > -1) {
                  Cname = ":下次回訊日";
                }
                $(this).addClass("updateDataByColumn updateDataByListColumn");
                $(this).attr("data-label", "證照資料" + (self.k + 1) + Cname);
                $(this).attr("data-subdocName", "licenseList");
                $(this).attr("data-subdocId", _id);

              });
            }
          })
      }
    }
    else if (action == 'del') {
      if (t == 1) {
        this.helperService.DelDataByColumn(
          "employee",
          this.employee._id,
          "contactList",
          id
        )
          .subscribe((res) => {
            if (res['status'] === 'ok') {
              // this.newcontactList = this.newcontactList.filter(w => w._id !== id);
            }
          });
      }
      else if (t == 2) {
          this.helperService.DelDataByColumn(
            "employee",
            this.employee._id,
            "licenseList",
            id
          )
            .subscribe((res) => {
              if (res['status'] === 'ok') {
                // this.newlicenseList = this.newlicenseList.filter(w => w._id !== id);
              }
            });
      }
    }

    // this.apiService
    //   .editEmployees(
    //     this.employee._id,
    //     this.employee.empName,
    //     this.employee.boss,
    //     this.employee.password,
    //     this.employee.email,
    //     this.employee.lock,
    //     this.employee.expireDate,
    //     this.employee.departmentId,
    //     this.employee.birthday,
    //     this.employee.onBoardDate,
    //     this.employee.gender,
    //     this.employee.personalNo,
    //     this.employee.jobList,
    //     this.employee.empGUID,
    //     this.employee.account,
    //     this.employee.createDate,
    //     this.employee.lockDate,
    //     this.employee.phone,
    //     this.employee.address,
    //     this.employee.expertise,
    //     this.employee.interest,

    //     this.newcontactList,
    //     this.newlicenseList,

    //     this.employee.employeePic,
    //     this.employee.employeeSeal
    //   )
    //   .subscribe((res) => {
    //     this.result = res as any;
    //     if (this.result.result_status == false) {
    //       Swal.fire({
    //         title: this.result.result_message,
    //         icon: 'error'
    //       });
    //     }
    //   });

  }

}
  // editDynamic(t) {
  //   // if (this.EditForm.valid) {
  //   if (t == 1) {
  //     //緊急連絡人處理
  //     var EmergencyContactObj = $('#EmergencyContactForm').serializeArray();
  //     var EmergencyContactLen = EmergencyContactObj.length / 3;
  //     var j = 0;
  //     var newContactList = [];
  //     for (var i = 0; i < EmergencyContactLen; i++) {
  //       if (EmergencyContactObj[j].value != "-1") {
  //         var contactName = EmergencyContactObj[j].value;
  //         var relationship = EmergencyContactObj[j + 1].value;
  //         var contactPhone = EmergencyContactObj[j + 2].value;
  //         var _id = UUID.UUID();
  //         newContactList.push({_id, contactName, relationship, contactPhone });
  //       }
  //       j = j + 3;
  //     }

  //     this.helperService.callUpdate("employee", null, this.employee._id, "contactList", newContactList, "緊急連絡人","String");
  //   }

  //   if (t == 2) {
  //     //證照處理
  //     var LicenseObj = $('#LicenseForm').serializeArray();
  //     var LicenseLen = LicenseObj.length / 5;
  //     var j = 0;
  //     var newlicenseList = [];
  //     for (var i = 0; i < LicenseLen; i++) {
  //       if (LicenseObj[j + 1].value != "" && LicenseObj[j].value != "-1") {
  //         var LT = this.ParentgetlicenseTypes.filter((item) => item.id == LicenseObj[j].value);
  //         var licenseType = { _id: LicenseObj[j].value, licenseTypeName: LT[0]['name'] };
  //         var licenseName = LicenseObj[j + 1].value;
  //         var approveUse = LicenseObj[j + 2].value;
  //         var needTrain = LicenseObj[j + 3].value;
  //         var nextTrainDate = LicenseObj[j + 4].value;
  //         var _id = UUID.UUID();
  //         newlicenseList.push({_id, licenseType, licenseName, approveUse, needTrain, nextTrainDate });
  //       }
  //       j = j + 5;
  //     }
  //     this.helperService.callUpdate("employee", null, this.employee._id, "licenseList", newlicenseList, "證照資料","String")
  //   }

  // if (this.formDataList.length > 0) {
  //   var f = 0;
  //   var fileNameArr = [];
  //   this.formDataList.forEach(element => {
  //     f++;


  //   })
  // } else {
  //   // this.callEdit();
  // }
  // } else {
  //   Swal.fire({
  //     title: '請填寫必填欄位',
  //     confirmButtonText: '確定',
  //     confirmButtonColor: '#17A2B8',
  //     icon: 'error'
  //   });
  // }


  // btnShow1 = false;
  // btnShow2 = false;

  // enableCard(i) {
  //   if(i==1){
  //     this.btnShow1 = !this.btnShow1;
  //     if(!this.btnShow1){
  //       $(".card1").prop("readonly", true);
  //       $(".card1").prop("disabled", true);
  //       $("#addEmergencyContact").prop("disabled",true);

  //     }else{
  //       $(".card1").prop("readonly", false);
  //       $(".card1").prop("disabled", false);
  //       $("#addEmergencyContact").prop("disabled",false);

  //     }
  //   }else{
  //     this.btnShow2 = !this.btnShow2;
  //     if(!this.btnShow2){
  //       $(".card2").prop("readonly", true);
  //       $(".card2").prop("disabled", true);
  //       $("#addLicense").prop("disabled",true);
  //     }else{
  //       $(".card2").prop("readonly", false);
  //       $(".card2").prop("disabled", false);
  //       $("#addLicense").prop("disabled",false);
  //     }
  //   }
  // }

  // callEdit() {
  //   var JobList = [];
  //   JobList.push(this.Jobs);

  //   this.apiService
  //     .editEmployees(
  //       this.employee._id,
  //       this.EditForm.controls['empName'].value,
  //       this.EditForm.controls['boss'].value,
  //       this.EditForm.controls['password'].value,
  //       this.EditForm.controls['email'].value,
  //       this.lock.value,
  //       this.expireDate.value,
  //       this.EditForm.controls['departmentId'].value,
  //       this.EditForm.controls['birthday'].value,
  //       this.EditForm.controls['onBoardDate'].value,
  //       this.EditForm.controls['gender'].value,
  //       this.EditForm.controls['personalNo'].value,
  //       this.Jobs,

  //       this.empGUID.value,
  //       this.EditForm.controls['account'].value,
  //       this.createDate.value,
  //       this.lockDate.value,

  //       this.phone.value,
  //       this.address.value,
  //       this.expertise.value,
  //       this.interest.value,
  //       this.contactList,
  //       this.licenseList,
  //       this.employeePic.value,
  //       this.employeeSeal.value
  //     )
  //     .subscribe((res) => {
  //       this.result = res as any;
  //       if (this.result.result_status == false) {
  //         Swal.fire({
  //           title: this.result.result_message,
  //           icon: 'error'
  //         });
  //       } else {
  //         Swal.fire({
  //           title: "修改成功",
  //           icon: 'success',
  //           confirmButtonText: '確定',
  //           confirmButtonColor: '#17A2B8',
  //         }).then((result) => {
  //           window.location.reload();
  //         });

  //       }
  //     });
  // }


