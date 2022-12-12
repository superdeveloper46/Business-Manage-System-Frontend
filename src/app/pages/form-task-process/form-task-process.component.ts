import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormtaskapiService } from '@services/formtaskapi.service';
import { FormTaskProcessApiService } from '@services/form-task-process-api.service';
import { ApiService } from '@services/api.service';
import { ActivatedRoute } from '@angular/router';
import { RightService } from '@services/right.service';
import { DataTableDirective } from 'angular-datatables';
import { __classPrivateFieldGet } from 'tslib';
import { HelperService } from '@services/helper.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-form-task-process',
  templateUrl: './form-task-process.component.html',
  styleUrls: ['./form-task-process.component.scss']
})
export class FormTaskProcessComponent implements OnInit {
  formId: any;
  formTaskId: any;
  formName = "";
  formEName = "";
  taskStatusId: any;
  detailData: any;
  dtOptions: DataTables.Settings = {};

  sectionRight: any = [];

  formAndProjectData: any;
  scope: any;
  rule: any;
  contractTypes: any;
  siteResult: any;
  workTypes: any;
  emergencyTypes: any;
  suppliers: any;
  taskStatus: any;

  component: any;

  formFlowList: any = [];
  nextFormFlowId: any = '';
  currentFormFlowId: any;
  previousFormTaskSiteId: any;
  hasNextSigner: any = true;

  detail: any = "";

  constructor(
    public task_apiService: FormtaskapiService,
    public apiService: FormTaskProcessApiService,
    public master_apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public rightService: RightService,
    public helperService: HelperService,
  ) {
    this.subscribeRouteChange();
  }

  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;

  subscribeRouteChange() {
    this.activatedRoute.params.subscribe((params = {}) => {
      this.formId = params.id;
      this.formTaskId = params.formTaskId;
      this.taskStatusId = params.taskStatusId;
      this.detail = params.detail;
    });
  }

  ngOnInit(): void {
    var order = [[0, 'asc']];
    this.dtOptions = this.helperService.setDtOptions(order);
    this.component =
      [
        {
          btns: [
            {
              'name': "退回/Back",
              'icon': 'fas fa-arrow-left',
              'action': 'back'
            },
            {
              'name': "同意/Agree",
              'icon': 'fa fa-check',
              'action': 'agree'
            },
            {
              'name': "否決/Reject",
              'icon': 'fa fa-times',
              'action': 'reject'
            },
          ],
          actions: {
            'allowEdit': true,
            'allowShow': true,
          },
          title: ''
        }
      ];

    this.reloadFormTaskDetailData();
    this.loadBasicData();
  }

  async loadBasicData() {
    const param = {
      formId: this.formId
    };
    (await this.task_apiService.getBasicData(param)).subscribe((res) => {
      this.formAndProjectData = res.formAndProjectData
      this.workTypes = res.workTypes;
      this.emergencyTypes = res.emergencyTypes;
      this.suppliers = res.suppliers;
      this.taskStatus = res.taskStatus;
      this.scope = res.scope;
      this.rule = res.rule;
      this.contractTypes = res.contractTypes;
      this.siteResult = res.siteResult;
    });

    (await this.task_apiService.getForm(param)).subscribe((res) => {
      this.formName = res['formName'];
      switch (this.formId) {
        case "20221027173636377":
          this.formEName = 'purchaseForm';
          this.component.push(
            {
              btns: [
                {
                  'name': "編輯",
                  'icon': 'fas fa-edit',
                  'action': '1_1',
                },
              ],
              actions: {
                'allowEdit': true,
                'allowShow': true,
              },
              title: '請採編號'
            },

            {
              btns: [
                {
                  'name': "新增",
                  'icon': 'fas fa-plus',
                  'action': '2_1',
                },
              ],
              actions: {
                'allowEdit': false,
                'allowShow': true,
              },
              title: '物料編碼'
            },

            {
              btns: [
              ],
              actions: {
                'allowEdit': false,
                'allowShow': true,
              },
              title: '工地參考資料'
            },

            {
              btns: [
                {
                  'name': "新增",
                  'icon': 'fas fa-plus',
                  'action': '4_1',
                },
              ],
              actions: {
                'allowEdit': true,
                'allowShow': true,
              },
              title: '廠商詢價'
            },

            {
              btns: [
              ],
              actions: {
                'allowEdit': true,
                'allowShow': true,
              },
              title: '廠商詢價'
            },

            {
              btns: [
              ],
              actions: {
                'allowEdit': false,
                'allowShow': true,
              },
              title: '廠商詢價'
            },
          );
          break;
      }
    });
  }


  async reloadFormTaskDetailData() {
    (await this.apiService.getFormTaskDetailData(this.formTaskId, this.taskStatusId)).subscribe((res) => {
      this.detailData = res;
      this.setInitComponent(this.detailData);
    });
  }

  setInitComponent(detailData) {
    this.detailData = detailData;
    let t = this.detailData.form.formSectionList;
    for (var i = 0; i < t.length; i++) {
      this.component[i + 1]['title'] = t[i]['formSectionName'];
    }
    this.formFlowList = this.detailData.form.formFlowList.sort((a, b) => a.sort - b.sort);

    if (this.detailData?.taskSiteList != undefined && this.detailData?.taskSiteList != null && this.detailData?.taskSiteList.length != 0) {
      let taskSiteList = this.detailData.taskSiteList;
      for (var i = 0; i < taskSiteList.length; i++) {
        if (taskSiteList[i].current == true) {
          this.currentFormFlowId = taskSiteList[i].formFlowId;
          this.previousFormTaskSiteId = taskSiteList[i]._id;
          this.setNextFormFlowId(this.currentFormFlowId);
          this.sectionRight = this.getSectionRight();
        }
      }
    } else {
      this.setNextFormFlowId('');
      this.previousFormTaskSiteId = '';
      this.currentFormFlowId = '';
    }

    if (this.currentFormFlowId == "") {
      this.component[0].btns =
        [
          {
            'name': "送出簽核",
            'icon': 'fas fa-check',
            'action': 'send'
          },

        ];

      for (var i = 0; i < 6; i++) {
        if (this.sectionRight[i] == undefined) {
          this.sectionRight[i] = {};
        }
        this.sectionRight[i]['allowEdit'] = i < 3 ? true : false;
        this.sectionRight[i]['allowShow'] = i < 3 ? true : false;
      }
    }

    for (var i = 0; i < this.sectionRight.length; i++) {
      this.component[i + 1]['actions']['allowEdit'] = this.sectionRight[i]['allowEdit'];
      this.component[i + 1]['actions']['allowShow'] = this.sectionRight[i]['allowShow'];
    }

    if (this.detail == "true") {
      for (var i = 0; i < 6; i++) {
        if (this.sectionRight[i] == undefined) {
          this.sectionRight[i] = {};
        }
      }
      for (var i = 0; i < this.sectionRight.length; i++) {
        this.component[i + 1]['actions']['allowEdit'] = false;
        if (i == 4 || i == 5)
          this.component[i + 1]['actions']['allowShow'] = false;
        else
          this.component[i + 1]['actions']['allowShow'] = true;
      }
      console.log(this.component);
    }
  }

  setNextFormFlowId(currentFormFlowId) {
    let flowlist = this.formFlowList;
    if (currentFormFlowId == '') {
      this.nextFormFlowId = flowlist[0]._id;
    } else {
      for (var i = 0; i < flowlist.length; i++) {
        if (flowlist[i]._id == currentFormFlowId) {
          if (i + 1 == flowlist.length) {
            this.hasNextSigner = false;
          }
          if (this.hasNextSigner)
            this.nextFormFlowId = flowlist[i + 1]._id;
        }
      }
    }
  }

  getSectionRight() {
    let data = this.formFlowList.filter((item) => item._id == this.currentFormFlowId);
    if (data.length != 0)
      return data[0].sectionRightList;
    return [];
  }

}
