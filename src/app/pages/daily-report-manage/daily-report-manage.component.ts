import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import { ProjectApiService } from '@services/projectapi.service';
import { Subject } from 'rxjs';
import { RightService } from '@services/right.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DailyReportMonthReportComponent } from './daily-report-month-report/daily-report-month-report.component';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from '@services/helper.service';
import { DataTableDirective } from 'angular-datatables';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-daily-report-manage',
  templateUrl: './daily-report-manage.component.html',
  styleUrls: ['./daily-report-manage.component.scss']
})
export class DailyReportManageComponent implements OnInit {
  getRight: any;
  RightObj: {};
  public projectId;
  public dailyReport;
  dtOptions: DataTables.Settings = {};
  public result;
  constructor(
    public rightService: RightService,
    public helperService: HelperService,
    public apiService: ApiService,
    public ProjectApiService: ProjectApiService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
  ) {
    config.backdrop = true;
    config.keyboard = false;
    config.centered = true;
    this.getRight = this.rightService.getRight();
  }

  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params = {}) => {
      this.projectId = params['id'];
    })



    var order = [[0, 'desc']];
    this.dtOptions = this.helperService.setDtOptions(order);
    this.RightObj = this.getRight['__zone_symbol__value'];
    this.reloadData();
  }

  isDate7(date){
    var today = new Date();
    var date7 = new Date(today.getTime() - (6 * 24 * 60 * 60 * 1000));
    date = new Date(date)

    return date >= date7;
  }


  async reloadData() {
    (await this.ProjectApiService.getDailyReport(this.projectId)).subscribe((res) => {
      this.dailyReport = res as any;

      this.dtTrigger.next(null);
    });
  }

  async refreshData() {
    (await this.ProjectApiService.getDailyReport(this.projectId)).subscribe((res) => {
      this.dailyReport = res as any;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    });
  }

  async Add() {
    var logTypeDetailList = [];
    (await this.ProjectApiService.getConstructionLogTypes()).subscribe((res) => {
      var ConstructionLogTypes = res['_embedded']['constructionLogTypes'] as any;
      ConstructionLogTypes.forEach((element) => {
        var idArr = element['_links']['self']['href'].split('/');
        var id = idArr[idArr.length - 1];
        var _id = UUID.UUID();
        logTypeDetailList.push({ _id: _id, constructionLogTypeId: id, todayCount: 0, cumulativeCount: 0 });
      })

      let formData = {
        projectId: this.projectId,
        dailyDate: new Date(), //今日日期
        logTypeDetailList: logTypeDetailList,
        specialConstractionList: [{ itemName: "", unit: "", quantity: "", todayUse: "", cumulativeuse: "", remark: "" }],
        supplierContractList: [{ supplierId: "", workTypeId: "", workers: "", workStatus: "" }],
        materialManageList: [{ itemName: "", unit: "", quantity: "", todayUse: "", cumulativeuse: "", remark: "" }],
        documentList: [{ docType: true, docTitle: "", docPerson: "", docNumber: "", docDescription: "" }],
        actualComplete: 0,
        expectComplete: 0
      };
      (this.ProjectApiService.addDailyReport(formData)).subscribe((res) => {
        var reportId = res['_id'];
        location.href = '/#/DailyReportEdit/' + reportId;
      })
    });


  }



  open(type, dailyreport) {
    if (type == 'monthReport') {
      const modalRef = this.modalService.open(DailyReportMonthReportComponent, { size: 'md' });
      modalRef.closed.subscribe((result) => {
      });
    }
    else if (type == 'download') {
      const modalRef = this.modalService.open(null, { size: 'lg' });
      modalRef.closed.subscribe((result) => {
      });
    }
  }
}
