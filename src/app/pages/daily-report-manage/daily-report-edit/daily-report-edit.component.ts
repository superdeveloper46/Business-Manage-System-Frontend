import { element } from 'protractor';
import { SpecialConstractionCardComponent } from './../special-constraction-card/special-constraction-card.component';
import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, ElementRef, Renderer2 } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { ProjectApiService } from '@services/projectapi.service';

import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MaterialManageCardComponent } from '../material-manage-card/material-manage-card.component';
import { Select2OptionData } from 'ng-select2';
import { SupplierContractCardComponent } from '../supplier-contract-card/supplier-contract-card.component';
import { DocumentCardComponent } from '../document-card/document-card.component';
import { RightService } from '@services/right.service';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-daily-report-edit',
  templateUrl: './daily-report-edit.component.html',
  styleUrls: ['./daily-report-edit.component.scss']
})
export class DailyReportEditComponent implements OnInit {
  getRight: any;
  RightObj: {};
  public dailyReportId;
  public dailyReport;
  public dailyDate;
  public projectId;
  public result;

  public EditForm1: FormGroup;
  projectShortName = "";
  specialConstractionList = [];
  materialManageList = [];
  logTypeDetailList = [];
  sourceLogTypeDetailList = [];
  supplierContractList = [];
  documentList = [];

  public EditForm2: FormGroup;

  s2WorkTypes: Select2OptionData[];
  SupplierContract_WorkType = new Array<String>;
  s2Suppliers: Select2OptionData[];
  SupplierContract_Supplier = new Array<String>;

  @ViewChild('SpecialConstractionList', { static: false, read: ViewContainerRef }) target1: ViewContainerRef;
  private componentRef1: ComponentRef<any>;
  @ViewChild('MaterialManageList', { static: false, read: ViewContainerRef }) target2: ViewContainerRef;
  private componentRef2: ComponentRef<any>;
  @ViewChild('SupplierContractList', { static: false, read: ViewContainerRef }) target3: ViewContainerRef;
  private componentRef3: ComponentRef<any>;
  @ViewChild('DocumentList', { static: false, read: ViewContainerRef }) target4: ViewContainerRef;
  private componentRef4: ComponentRef<any>;

  constructor(
    public apiService: ApiService,
    public ProjectApiService: ProjectApiService,
    private activatedRoute: ActivatedRoute,
    private resolver: ComponentFactoryResolver,
    public rightService: RightService,
    public helperService: HelperService,
    public elementRef: ElementRef,
    public renderer: Renderer2
  ) {
    this.getRight = this.rightService.getRight();

  }


  ngOnInit(): void {
    this.RightObj = this.getRight['__zone_symbol__value'];

    this.activatedRoute.params.subscribe((params = {}) => {
      this.dailyReportId = params['id'];
      this.helperService.AutoSave(this.renderer, this.elementRef.nativeElement, "dailyReport", this.dailyReportId);
    })

    this.EditForm1 = new FormGroup({
      projectDate: new FormControl('', Validators.required),
      bidAmount: new FormControl('', Validators.required),
      changePrice: new FormControl('', Validators.required),
      calendarDay: new FormControl('', Validators.required),
      cumulativeDay: new FormControl('', Validators.required),
      remainingDay: new FormControl('', Validators.required),
      dailyDate: new FormControl('', Validators.required),
      morningWeather: new FormControl('', Validators.required),
      afternoonWeather: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      contractChange: new FormControl(0, Validators.required),
      extendDays: new FormControl(0, Validators.required),
      expectComplete: new FormControl(0, Validators.required),
      actualComplete: new FormControl(0, Validators.required),
      dailyConcept: new FormControl('', Validators.required),
      isProfessional: new FormControl('', Validators.required),
      isEducation: new FormControl(false, Validators.required),
      isInsurance: new FormControl(false, Validators.required),
      isProtect: new FormControl(false, Validators.required),
      isDayNightCheck: new FormControl(false, Validators.required),
      sampleTestRecord: new FormControl('', Validators.required),
      tellSupplier: new FormControl('', Validators.required),
      importantReport: new FormControl('', Validators.required),
    });

    this.EditForm2 = new FormGroup({
      attendSituation: new FormControl('', Validators.required),
      todayItem: new FormControl('', Validators.required),
      tomorrowItem: new FormControl('', Validators.required),
      bossSuggest: new FormControl('', Validators.required),
      integrationReview: new FormControl('', Validators.required),
      waitToSlove: new FormControl('', Validators.required),
      isNewTeam: new FormControl(false, Validators.required),
      isRead: new FormControl(false, Validators.required),
      isChange: new FormControl(false, Validators.required),
      isForSupplier: new FormControl(false, Validators.required),
      isMeeting: new FormControl(false, Validators.required),
      isMeetingRecord: new FormControl(false, Validators.required),
      isDanger: new FormControl(false, Validators.required),
      isCheck: new FormControl(false, Validators.required),
      isAdjust: new FormControl(false, Validators.required),

    });

    this.ddlWorkType();
    this.ddlSupplier();
    this.getLogTypeDetailList();
    this.getDailyReport();

  }

  async getDailyReport() {

    (await this.ProjectApiService.getDailyReportById(this.dailyReportId)).subscribe((res) => {
      this.dailyReport = res;
      this.projectId = res.projectId;
      this.dailyDate = res.dailyDate;
      //EditForm1
      var project = this.dailyReport.project;
      this.EditForm1.controls['projectDate'].setValue(this.formatDate(project.beginDate, '/') + " - " + this.formatDate(project.endDate, '/'));
      this.EditForm1.controls['bidAmount'].setValue(project.bidAmount);
      this.EditForm1.controls['changePrice'].setValue(project.changePrice);
      this.EditForm1.controls['calendarDay'].setValue(project.calendarDay);
      this.EditForm1.controls['cumulativeDay'].setValue(project.cumulativeDay);
      this.EditForm1.controls['remainingDay'].setValue(project.remainingDay);
      this.projectShortName = project.projectShortName;

      this.EditForm1.controls['dailyDate'].setValue(this.formatDate(this.dailyReport.dailyDate));
      this.EditForm1.controls['morningWeather'].setValue(this.dailyReport.morningWeather);
      this.EditForm1.controls['afternoonWeather'].setValue(this.dailyReport.afternoonWeather);
      this.EditForm1.controls['company'].setValue(this.dailyReport.company);
      this.EditForm1.controls['contractChange'].setValue(this.dailyReport.contractChange);
      this.EditForm1.controls['extendDays'].setValue(this.dailyReport.extendDays);
      this.EditForm1.controls['expectComplete'].setValue(this.dailyReport.expectComplete);
      this.EditForm1.controls['actualComplete'].setValue(this.dailyReport.actualComplete);
      this.EditForm1.controls['dailyConcept'].setValue(this.dailyReport.dailyConcept);
      this.EditForm1.controls['isProfessional'].setValue(this.dailyReport.professional);
      this.EditForm1.controls['isEducation'].setValue(this.dailyReport.education);
      this.EditForm1.controls['isInsurance'].setValue(this.dailyReport.insurance);
      this.EditForm1.controls['isProtect'].setValue(this.dailyReport.protect);
      this.EditForm1.controls['isDayNightCheck'].setValue(this.dailyReport.dayNightCheck);
      this.EditForm1.controls['sampleTestRecord'].setValue(this.dailyReport.sampleTestRecord);
      this.EditForm1.controls['tellSupplier'].setValue(this.dailyReport.tellSupplier);
      this.EditForm1.controls['importantReport'].setValue(this.dailyReport.importantReport);

      if (this.dailyReport.specialConstractionList != null && this.dailyReport.specialConstractionList.length > 0) {
        this.dailyReport.specialConstractionList.forEach(element => {
          this.specialConstractionList.push(element);
        })
        this.k1 = this.specialConstractionList.length - 1;
      } else {
        this.AddCard(1);
        this.k1 = -1;
      }

      if (this.dailyReport.materialManageList != null && this.dailyReport.materialManageList.length > 0) {
        this.dailyReport.materialManageList.forEach(element => {
          this.materialManageList.push(element);
        })
        this.k2 = this.materialManageList.length - 1;
      } else {
        this.AddCard(2);
        this.k2 = -1;
      }

      if (this.dailyReport.logTypeDetailList != null && this.dailyReport.logTypeDetailList.length > 0) {
        this.dailyReport.logTypeDetailList.forEach(element => {
          this.logTypeDetailList.push(element);
        })
      }

      //EditForm2
      this.EditForm2.controls['attendSituation'].setValue(this.dailyReport.attendSituation);
      this.EditForm2.controls['todayItem'].setValue(this.dailyReport.todayItem);
      this.EditForm2.controls['tomorrowItem'].setValue(this.dailyReport.tomorrowItem);
      this.EditForm2.controls['bossSuggest'].setValue(this.dailyReport.bossSuggest);
      this.EditForm2.controls['integrationReview'].setValue(this.dailyReport.integrationReview);
      this.EditForm2.controls['waitToSlove'].setValue(this.dailyReport.waitToSlove);
      this.EditForm2.controls['isNewTeam'].setValue(this.dailyReport.newTeam);
      this.EditForm2.controls['isRead'].setValue(this.dailyReport.read);
      this.EditForm2.controls['isChange'].setValue(this.dailyReport.change);
      this.EditForm2.controls['isForSupplier'].setValue(this.dailyReport.forSupplier);
      this.EditForm2.controls['isMeeting'].setValue(this.dailyReport.meeting);
      this.EditForm2.controls['isMeetingRecord'].setValue(this.dailyReport.meetingRecord);
      this.EditForm2.controls['isDanger'].setValue(this.dailyReport.danger);
      this.EditForm2.controls['isCheck'].setValue(this.dailyReport.check);
      this.EditForm2.controls['isAdjust'].setValue(this.dailyReport.adjust);

      if (this.dailyReport.supplierContractList != null && this.dailyReport.supplierContractList.length > 0) {
        this.dailyReport.supplierContractList.forEach((element, index) => {
          this.supplierContractList.push(element);
          this.SupplierContract_Supplier[index] = element.supplierId;
          this.SupplierContract_WorkType[index] = element.workTypeId;
        })
        this.k3 = this.supplierContractList.length - 1;
      } else {
        this.AddCard(3);
        this.k3 = -1;
      }

      if (this.dailyReport.documentList != null && this.dailyReport.documentList.length > 0) {
        this.dailyReport.documentList.forEach(element => {
          this.documentList.push(element);
        })
        this.k4 = this.documentList.length - 1;
      } else {
        this.AddCard(4);
        this.k4 = -1;
      }

    });
  }

  calculateDiff(eDate, sDate) {
    eDate = new Date(eDate);
    sDate = new Date(sDate);

    return Math.floor((Date.UTC(eDate.getFullYear(), eDate.getMonth(), eDate.getDate()) - Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate())) / (1000 * 60 * 60 * 24));
  }



  async getLogTypeDetailList() {
    (await this.ProjectApiService.getConstructionLogTypes()).subscribe((res) => {
      var ConstructionLogTypes = res['_embedded']['constructionLogTypes'] as any;
      ConstructionLogTypes.forEach((element) => {
        var idArr = element['_links']['self']['href'].split('/');
        var id = idArr[idArr.length - 1];
        this.sourceLogTypeDetailList.push({ _id: id, constructionLogTypeName: element.constructionLogTypeName, constructionType: element.constructionType });
      })
    })
  }


  async ddlWorkType() {
    let arrWorkType = [];
    let k = 0;
    var checkedItem = [];
    //var checkedItem = this.supplier.workTypeIdList;
    (await this.apiService.getWorkTypes()).subscribe((res) => {
      var AllWorkType = (res as any).filter(w => w.enable);
      AllWorkType.forEach(element => {
        if (element['enable'] || checkedItem.indexOf(element)) {
          arrWorkType.push({ id: element['_id'], text: element['workTypeName'] });
        }
        k++;
        if (k == AllWorkType.length) {
          this.s2WorkTypes = arrWorkType;
        }
      });
    });
  }

  async ddlSupplier() {
    let arrSupplier = [];
    let k = 0;
    var checkedItem = [];
    //var checkedItem = this.supplier.workTypeIdList;
    (await this.apiService.getSuppliers('', '', '', [], [])).subscribe((res) => {
      var AllSupplier = (res as any).filter(w => w.enable);
      AllSupplier.forEach(element => {
        if (element['enable'] || checkedItem.indexOf(element)) {
          arrSupplier.push({ id: element['_id'], text: element['supplierName'] });
        }
        k++;
        if (k == AllSupplier.length) {
          this.s2Suppliers = arrSupplier;
        }
      });
    });
  }

  onChange_Suppliers(val: String, k, subdocId): void {
    if (val == null) val = "";
    if (val != undefined && this.SupplierContract_Supplier[k] != val) {
      var whereObj = [{ key: "_id", value: this.dailyReportId, subdocName: "" }, { key: "_id", value: subdocId, subdocName: "supplierContractList" }]
      this.helperService.callUpdate("dailyReport", whereObj, this.dailyReportId, "supplierId", val, "營造業專業工程特定施工清單" + (k + 1) + ":廠商", "String")
    }
    this.SupplierContract_Supplier[k] = val;
  }

  onChange_WorkTypes(val: String, k, subdocId): void {
    if (val == null) val = "";
    if (val != undefined && this.SupplierContract_WorkType[k] != val) {
      var whereObj = [{ key: "_id", value: this.dailyReportId, subdocName: "" }, { key: "_id", value: subdocId, subdocName: "supplierContractList" }]
      this.helperService.callUpdate("dailyReport", whereObj, this.dailyReportId, "workTypeId", val, "營造業專業工程特定施工清單" + (k + 1) + ":工項", "String")
    }
    this.SupplierContract_WorkType[k] = val;
  }

  del(index, type, id) {
    $("#" + type + "_" + index).hide();
    switch (type) {
      case "s":
        (this.helperService.DelDataByColumn("dailyReport", this.dailyReportId, "specialConstractionList", id)).subscribe((res) => { });
        break;
      case "m":
        (this.helperService.DelDataByColumn("dailyReport", this.dailyReportId, "materialManageList", id)).subscribe((res) => { });
        break;
      case "s2":
        (this.helperService.DelDataByColumn("dailyReport", this.dailyReportId, "supplierContractList", id)).subscribe((res) => { });
        break;
      case "d":
        (this.helperService.DelDataByColumn("dailyReport", this.dailyReportId, "documentList", id)).subscribe((res) => { });
        break;
    }
  }


  k1 = 0;
  k2 = 0;
  k3 = 0;
  k4 = 0;
  AddCard(t) {
    switch (t) {
      case 1:
        this.helperService.AddDataByColumn(
          "dailyReport",
          "specialConstractionList",
          this.dailyReportId,
        ).subscribe((res) => {
          var id = res['_id'];

          this.k1++;
          let childComponent = this.resolver.resolveComponentFactory(SpecialConstractionCardComponent);
          this.componentRef1 = this.target1.createComponent(childComponent);
          this.componentRef1.instance.k1 = this.k1;
          this.componentRef1.instance.id = id;
          this.componentRef1.instance.reportId = this.dailyReportId;
        })

        break;
      case 2:
        this.helperService.AddDataByColumn(
          "dailyReport",
          "materialManageList",
          this.dailyReportId,
        ).subscribe((res) => {
          var id = res['_id'];

          this.k2++;
          let childComponent2 = this.resolver.resolveComponentFactory(MaterialManageCardComponent);
          this.componentRef2 = this.target2.createComponent(childComponent2);
          this.componentRef2.instance.k2 = this.k2;
          this.componentRef2.instance.id = id;
          this.componentRef2.instance.reportId = this.dailyReportId;

        })


        break;
      case 3:
        this.helperService.AddDataByColumn(
          "dailyReport",
          "supplierContractList",
          this.dailyReportId,
        ).subscribe((res) => {
          var id = res['_id'];

          this.k3++;
          let childComponent3 = this.resolver.resolveComponentFactory(SupplierContractCardComponent);
          this.componentRef3 = this.target3.createComponent(childComponent3);
          this.componentRef3.instance.SupplierContract_Supplier = this.SupplierContract_Supplier;
          this.componentRef3.instance.SupplierContract_WorkType = this.SupplierContract_WorkType;
          this.componentRef3.instance.k3 = this.k3;
          this.componentRef3.instance.id = id;
          this.componentRef3.instance.reportId = this.dailyReportId;

        })
        break;
      case 4:
        this.helperService.AddDataByColumn(
          "dailyReport",
          "documentList",
          this.dailyReportId,
        ).subscribe((res) => {
          var id = res['_id'];
          this.k4++;
          let childComponent4 = this.resolver.resolveComponentFactory(DocumentCardComponent);
          this.componentRef4 = this.target4.createComponent(childComponent4);
          this.componentRef4.instance.k4 = this.k4;
          this.componentRef4.instance.id = id;
          this.componentRef4.instance.reportId = this.dailyReportId;

        })
        break;
    }

  }

  formatDate(date, symbol = '-') {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join(symbol);
  }

}
