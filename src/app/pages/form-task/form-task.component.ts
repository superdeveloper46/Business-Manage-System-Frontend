import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ActivatedRoute, Router } from '@angular/router';
import { FormtaskapiService } from '@services/formtaskapi.service';
import { RightService } from '@services/right.service';
import { data } from 'jquery';
import { HelperService } from '@services/helper.service';
import { PurchaseFormAddComponent } from './purchase-form/purchase-form-add/purchase-form-add.component';

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.scss']
})

export class FormTaskComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  formId = null;
  formName = "";
  formEName = "";
  options: any = {
    multiple: true
  }
  expandColList = [];
  taskStatusId = 'all';
  public tableData = [];
  workTypes = [];
  emergencyTypes = [];
  suppliers = [];
  taskStatus = [
    {
      _id: 'all',
      taskStatusName: 'All'
    }
  ];
  initFlag = false;
  formAndProjectData = {
    formId: '',
    projectId: '',
    projectName: '',
    purchaseDeadLine: ''
  }

  loginUserId;

  constructor(
    private modalService: NgbModal,
    public apiService: FormtaskapiService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public rightService: RightService,
    public helperService: HelperService,
  ) {
    this.subscribeRouteChange();
  }
  subscribeRouteChange() {
    this.activatedRoute.params.subscribe((params = {}) => {
      this.taskStatusId = 'all';
      this.formId = params.id;
      this.formAndProjectData.formId = params.id;

      if (this.initFlag) {
        this.refreshData();
      }
      else {
        this.reloadData();
      }
      this.reloadBasicData();
    });
  }
  @ViewChild(DataTableDirective, { static: true })
  dtElement: DataTableDirective;

  ngOnInit(): void {

    this.loginUserId = JSON.parse(localStorage.getItem('auth-user'))['id'];

    this.dtOptions = this.helperService.setDtOptions();
  }


  async reloadData() {
    const param = {
      formId: this.formId,
      taskStatusId: this.taskStatusId
    };
    (await this.apiService.getFormTask(param)).subscribe(async (res) => {
      this.tableData = res as any;

      var l = 0, m = 0;;
      for (var k = 0; k < this.tableData.length; k++) {
        var tmp = this.tableData[k]?.taskSiteList;
        this.tableData[k]['status'] = '';
        this.tableData[k]['signer'] = '';
        this.tableData[k]['comment1'] = '';
        this.tableData[k]['status1'] = '';
        if (tmp == null || tmp.length == 1) {
          this.tableData[k]['comment1'] = this.tableData[k].comment;
        }
        if (tmp != null) {
          for (var j = 0; j < tmp.length; j++) {
            if (tmp[j].current) {
              l = k;
              this.tableData[l]['signer'] = tmp[j].signer;
              (await (this.apiService.getEmployeeById(tmp[j].signer))).subscribe((res) => {
                this.tableData[l]['status'] = res.department.depName + "-" + res.empName;
              });
            }
            if (j == tmp.length - 2) {
              m = k;
              this.tableData[m]['comment1'] = tmp[j].resultComment;
              (await (this.apiService.getEmployeeById(tmp[j].signer))).subscribe((res) => {
                this.tableData[m]['status1'] = res.department.depName + "-" + res.empName;
              });
            }
          }
        }
        this.calculateDataNo('max_purchaseNo');
        setTimeout(() => {
          this.dtTrigger.next(null);
        }, 1000);
       
        this.initFlag = true;
      }
     
    });
  }

  async refreshData() {
    const param = {
      formId: this.formId,
      taskStatusId: this.taskStatusId
    };
    (await this.apiService.getFormTask(param)).subscribe(async (res) => {
      this.tableData = res as any;

      var l = 0;
      for (var k = 0; k < this.tableData.length; k++) {
        var tmp = this.tableData[k]?.taskSiteList;
        this.tableData[k]['status'] = '';
        this.tableData[k]['signer'] = '';
        if (tmp != null) {
          for (var j = 0; j < tmp.length; j++) {
            if (tmp[j].current) {
              this.tableData[l]['signer'] = tmp[j].signer;
              (await (this.apiService.getEmployeeById(tmp[j].signer))).subscribe((res) => {
                this.tableData[l]['status'] = res.department.depName + "-" + res.empName;
                l++
              });
            }
          }
        }
      }

      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    });
  }

  async reloadBasicData() {
    const param = {
      formId: this.formId
    };
    (await this.apiService.getBasicData(param)).subscribe((res) => {
      if (res.formAndProjectData) {
        this.formAndProjectData = res.formAndProjectData
      }
      this.taskStatus = [
        {
          _id: 'all',
          taskStatusName: 'All'
        },
      ];
      this.workTypes = res.workTypes;
      this.emergencyTypes = res.emergencyTypes;
      this.suppliers = res.suppliers;
      this.taskStatus = this.taskStatus.concat(res.taskStatus);
    });
    (await this.apiService.getForm(param)).subscribe((res) => {
      this.formName = res['formName'];
      switch (this.formId) {
        case "20221027173636377":
          this.formEName = 'purchaseForm';
          break;
      }
    });
  }


  openModal(type) {
    if (type == 'add') {
      var modalRef;
      switch (this.formEName) {
        case 'purchaseForm':
          modalRef = this.modalService.open(PurchaseFormAddComponent, { windowClass: 'add-form' });
          break;
      }
      modalRef.componentInstance.formAndProjectData = this.formAndProjectData;
      modalRef.componentInstance.workTypeList = this.workTypes;
      modalRef.componentInstance.emergencyTypeList = this.emergencyTypes;
      modalRef.componentInstance.recommendSupplierList = this.suppliers;
      modalRef.closed.subscribe((result) => {
      });
    }
  }

  onChange(val): void {
    this.taskStatusId = val;
    this.refreshData()
  }

  go(data, detail) {
    this.router.navigateByUrl('/formTask/' + this.formId + "/" + data._id + "/" + data.taskStatusId + "/" + detail);
  }

  calculateDataNo(setItem) {
    let max_val = Math.max.apply(Math, this.tableData.map(function (item) { return parseInt(item.formTaskNo.substr(-3)); }));
    if (max_val == -Infinity) {
      localStorage.setItem(setItem, '1')
    }
    else {
      localStorage.setItem(setItem, (Number(max_val) + 1) + '')
    }
  }
}
