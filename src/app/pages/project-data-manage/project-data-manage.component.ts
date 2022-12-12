import { Component, ElementRef, Input, OnInit, ViewChild, Renderer2, ViewContainerRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { ProjectApiService } from '@services/projectapi.service';

import Swal from 'sweetalert2';
import { Select2OptionData } from 'ng-select2';
import { RightService } from '@services/right.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RelatedPersonnelCardComponent } from './related-personnel-card/related-personnel-card.component';
import { MaterialCardComponent } from './material-card/material-card.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from '@services/helper.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-project-data-manage',
  templateUrl: './project-data-manage.component.html',
  styleUrls: ['./project-data-manage.component.scss']
})

export class ProjectDataManageComponent implements OnInit {
  getRight: any;
  RightObj: {};
  public result;

  public projectId;
  public projectData;

  public Card1Form: FormGroup;
  public Card2Form: FormGroup;

  //card 2
  relatedPersonnelList = [];
  s2Situations: Select2OptionData[];
  RelatedPersonnelList_situation = new Array<String>;
  s2Departments: Select2OptionData[];
  RelatedPersonnelList_department = new Array<String>;
  s2Employees = new Array<Select2OptionData[]>;
  RelatedPersonnelList_employees = new Array<String>;
  s2Employees2 = new Array<Select2OptionData[]>;
  RelatedPersonnelList_employees2 = new Array<String>;

  //card 3
  public dailyReport;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  fileName: string;
  formData = new FormData();
  imgsrc = "";
  PicBuffer: string | ArrayBuffer;

  //card 4
  tenderImportant: string;
  bossImportant: string;

  //card 5
  material = [];

  //card 6
  proposal = [];

  @ViewChild('RelatedPersonnelList', { static: false, read: ViewContainerRef }) target: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  @ViewChild('MaterialList', { static: false, read: ViewContainerRef }) target2: ViewContainerRef;
  private componentRef2: ComponentRef<any>;
  @ViewChild('ProjectList', { static: false, read: ViewContainerRef }) target3: ViewContainerRef;
  private componentRef3: ComponentRef<any>;




  constructor(
    public apiService: ApiService,
    public ProjectApiService: ProjectApiService,
    public rightService: RightService,
    public helperService: HelperService,
    private modalService: NgbModal,
    private resolver: ComponentFactoryResolver,
    private activatedRoute: ActivatedRoute,
    public elementRef: ElementRef,
    public renderer: Renderer2
  ) {
    // this.getRight = this.rightService.getRight();
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params = {}) => {
      this.projectId = params['id'];
      this.helperService.AutoSave(this.renderer, this.elementRef.nativeElement, "project", this.projectId);
    })

    this.dtOptions = this.helperService.setDtOptions();
    // this.RightObj = this.getRight['__zone_symbol__value'];

    this.ddlSituation();
    this.ddlDepartment();

    this.reloadData();
    this.Card1Form = new FormGroup({
      projectName: new FormControl('', Validators.required),
      projectNo: new FormControl('', Validators.required),
      projectShortName: new FormControl('', Validators.required),
      projectDate: new FormControl(''),
      calendarDay: new FormControl(''),
      cumulativeDay: new FormControl(''),
      remainingDay: new FormControl(''),
      bidAmount: new FormControl('', Validators.required),
      changePrice: new FormControl('', Validators.required),


    });
    this.Card2Form = new FormGroup({
      employeeList: new FormControl(''),
      constructionImg: new FormControl(''),
      projectManager: new FormControl(''),
      engineerManager: new FormControl(''),
      purchaseManager: new FormControl(''),

    });
  }

  // calculateDiff(eDate, sDate) {
  //   eDate = new Date(eDate);
  //   sDate = new Date(sDate);

  //   return Math.floor((Date.UTC(eDate.getFullYear(), eDate.getMonth(), eDate.getDate()) - Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate())) / (1000 * 60 * 60 * 24));
  // }

  async reloadData() {
    (await this.ProjectApiService.getProject(this.projectId)).subscribe(async (res) => {
      this.projectData = res as any;
      //Card1Form
      this.Card1Form.controls['projectName'].setValue(this.projectData.projectName);
      this.Card1Form.controls['projectNo'].setValue(this.projectData.projectNo);
      this.Card1Form.controls['projectShortName'].setValue(this.projectData.projectShortName);
      this.Card1Form.controls['projectDate'].setValue(this.formatDate(this.projectData.beginDate) + "-" + this.formatDate(this.projectData.endDate));

      this.Card1Form.controls['calendarDay'].setValue(this.projectData.calendarDay);
      this.Card1Form.controls['cumulativeDay'].setValue(this.projectData.cumulativeDay);
      this.Card1Form.controls['remainingDay'].setValue(this.projectData.remainingDay);

      this.Card1Form.controls['bidAmount'].setValue(this.projectData.bidAmount);
      // let bidAmount = this.projectData.bidAmount;
      // let sumChangeprice = 0;
      // if (this.projectData?.changePriceList) {
      //   this.projectData?.changePriceList.forEach(element => {
      //     sumChangeprice += element.changePrice;
      //   });
      // }

      // let changeAmount = bidAmount - sumChangeprice;
      this.Card1Form.controls['changePrice'].setValue(this.projectData.changePrice);
      //changeAmount



      //Card2Form
      this.Card2Form.controls['projectManager'].setValue(this.projectData.projectManager.empName);
      this.Card2Form.controls['engineerManager'].setValue(this.projectData.engineerManager.empName);
      this.Card2Form.controls['purchaseManager'].setValue(this.projectData.purchaseManager.empName);

      if (this.projectData.constructionImg != "" && this.projectData.constructionImg != null) {
        this.Card2Form.controls['constructionImg'].setValue(this.projectData.constructionImg);

        this.apiService.download(this.projectData.constructionImg).subscribe((res) => {
          this.imgsrc = this.apiService.downLoadFileToBase64(res);
        });
      }

      if (this.projectData.employeeList != null && this.projectData.employeeList.length > 0) {
        this.projectData.employeeList.forEach((element, index) => {
          this.relatedPersonnelList.push(element);
          var depId = "";
          if (element.employeeId != '') {
            (this.apiService.getEmployee(element.employeeId)).subscribe((res) => {
              var Employee = (res as any);
              if (Employee != null) {
                depId = Employee.departmentId;
                this.RelatedPersonnelList_department[index] = depId;
              }
            });
          } else {
            this.RelatedPersonnelList_department[index] = '';
          }


          this.RelatedPersonnelList_situation[index] = element.situationId;
          this.RelatedPersonnelList_employees[index] = element.employeeId;
          this.RelatedPersonnelList_employees2[index] = element.rootEmployeeId;
          this.updateEmployee2();
        })
        this.k1 = this.relatedPersonnelList.length - 1;
      } else {
        this.AddRelatedPersonnelList();
        this.k1 = -1;
      }


      //Card3
      (await this.ProjectApiService.getDailyReport(this.projectId)).subscribe((res) => {
        this.dailyReport = res as any;
        this.dtTrigger.next(null);
      });

      //Card4Form
      this.tenderImportant = this.projectData.tenderImportant;
      this.bossImportant = this.projectData.bossImportant;

      //Card5
      (await this.ProjectApiService.getMaterial(this.projectId)).subscribe((res) => {
        this.material = res as any;
        if (this.material.length > 0) {
          this.k2 = this.material.length - 1;
        } else {
          this.AddMaterialList();
          this.k2 = -1;

        }
      });

      //Card6
      (await this.ProjectApiService.getProposal(this.projectId)).subscribe((res) => {
        this.proposal = res as any;
        if (this.proposal.length > 0) {
          this.k3 = this.proposal.length - 1;
        } else {
          this.AddProjectList();
          this.k3 = -1;
        }
      });

    });
  }

  async ddlSituation() {
    let arrSituations = [];
    let k = 0;
    (await this.apiService.getSituations()).subscribe((res) => {
      var AllSituations = res as any;
      AllSituations.forEach(element => {
        arrSituations.push({ id: element._id, text: element.situationName });
        k++;
        if (k == AllSituations.length) {
          this.s2Situations = arrSituations;
        }
      });
    });
  }

  async ddlDepartment() {
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

  async ddlEmployees(depId, index) {
    let arrEmployees = [];
    let k = 0;
    (await this.apiService.getEmployeesByDepartment(depId)).subscribe((res) => {
      var AllEmployees = res as any;
      AllEmployees.forEach(element => {
        arrEmployees.push({ id: element._id, text: element.empName });
        k++;
        if (k == AllEmployees.length) {
          this.s2Employees[index] = arrEmployees;
        }
      });
    });
  }


  async ddlEmployees2(index) {
    var myEmpId = this.RelatedPersonnelList_employees[index];
    let arrEmployees = [];
    let k = 0;

    this.RelatedPersonnelList_employees.filter(w => w != myEmpId).forEach(element => {
      (this.apiService.getEmployee(element)).subscribe((res) => {
        var Employee = (res as any);
        if (Employee != null) {
          arrEmployees.push({ id: element, text: Employee.empName });

          k++;
          if (k == this.RelatedPersonnelList_employees.length - 1) {
            this.s2Employees2[index] = arrEmployees;
          }
        }
      })


    })
  }

  onChange_Situations(val: String, k, subdocId): void {
    if (val == null) val = "";
    if (val != undefined && this.RelatedPersonnelList_situation[k] != val) {
      var whereObj = [{ key: "_id", value: this.projectId, subdocName: "" }, { key: "_id", value: subdocId, subdocName: "employeeList" }]
      this.helperService.callUpdate("project", whereObj, this.projectId, "situationId", val, "相關人員" + (k + 1) + ":職稱", "String")
    }
  }

  onChange_Departments(val: String, k): void {
    if (val == null) val = "";
    if (val != "") {
      this.ddlEmployees(val, k);
    }
  }


  onChange_Employees(val: String, k, subdocId): void {
    if (val == null) val = "";
    if (val != undefined && this.RelatedPersonnelList_employees[k] != val) {
      this.RelatedPersonnelList_employees[k] = val;
      var whereObj = [{ key: "_id", value: this.projectId, subdocName: "" }, { key: "_id", value: subdocId, subdocName: "employeeList" }]
      this.helperService.callUpdate("project", whereObj, this.projectId, "employeeId", val, "相關人員" + (k + 1) + ":人員", "String")
      this.updateEmployee2();
    }
  }

  onChange_Employees2(val: String, k, subdocId): void {
    if (val == null) val = "";
    if (val != undefined && this.RelatedPersonnelList_employees2[k] != val) {
      var whereObj = [{ key: "_id", value: this.projectId, subdocName: "" }, { key: "_id", value: subdocId, subdocName: "employeeList" }]
      this.helperService.callUpdate("project", whereObj, this.projectId, "rootEmployeeId", val, "相關人員" + (k + 1) + ":上層主管", "String")
    }
  }

  updateEmployee2() {
    for (var i = 0; i < this.RelatedPersonnelList_employees.length; i++) {
      this.ddlEmployees2(i);
    }
  }

  del(index, type, id) {
    $("#" + type + "_" + index).hide();
    switch (type) {
      case "r":
        (this.helperService.DelDataByColumn("project", this.projectId, "employeeList",id)).subscribe((res) => { });
        this.RelatedPersonnelList_employees = this.RelatedPersonnelList_employees.filter(w => w !== id);
        this.updateEmployee2();
        break;
      case "m":
        (this.helperService.DelDataByColumn("material", id, "", "")).subscribe((res) => { });
        break;
      case "p":
        (this.helperService.DelDataByColumn("proposal", id, "", "")).subscribe((res) => { });
        break;
    }
  }

  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('/');
  }


  k1 = 0;
  k2 = 0;
  k3 = 0;
  AddRelatedPersonnelList() {
    this.helperService.AddDataByColumn(
      "project",
      "employeeList",
      this.projectId,
    ).subscribe((res) => {
      var id = res['_id'];
      this.k1++;
      let childComponent = this.resolver.resolveComponentFactory(RelatedPersonnelCardComponent);
      this.componentRef = this.target.createComponent(childComponent);
      this.componentRef.instance.k = this.k1;
      this.componentRef.instance.id = id;
      this.componentRef.instance.projectId = this.projectId;
      this.componentRef.instance.RelatedPersonnelList_employees = this.RelatedPersonnelList_employees;

    });
  }

  AddMaterialList() {
    this.helperService.AddDataByColumn(
      "material",
      "",
      "",
    ).subscribe((res) => {
      var id = res['_id'];
      this.helperService.callUpdate("material", null, id, "projectId", this.projectId, "材料送審", "String")
      this.k2++;
      let childComponent = this.resolver.resolveComponentFactory(MaterialCardComponent);
      this.componentRef2 = this.target2.createComponent(childComponent);
      this.componentRef2.instance.k2 = this.k2;
      this.componentRef2.instance.id = id;
    });
  }

  AddProjectList() {
    this.helperService.AddDataByColumn(
      "proposal",
      "",
      "",
    ).subscribe((res) => {
      var id = res['_id'];
      this.helperService.callUpdate("proposal", null, id, "projectId", this.projectId, "計劃書送審項目", "String")
      this.k3++;
      let childComponent = this.resolver.resolveComponentFactory(ProjectCardComponent);
      this.componentRef3 = this.target3.createComponent(childComponent);
      this.componentRef3.instance.k3 = this.k3;
      this.componentRef3.instance.id = id;
    });
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
          this.formData.append('url', "constructionImg");
          this.formData.append('uploadFile', file);

          const reader = new FileReader();
          reader.onload = e => this.PicBuffer = reader.result;
          reader.readAsDataURL(file);

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
                this.helperService.callUpdate("project", null, this.projectId, "constructionImg", "constructionImg/" + res["name"], "組織圖上傳", "String")
              }
            });


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
}
