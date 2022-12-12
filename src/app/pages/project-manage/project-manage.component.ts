import { ProjectProgressComponent } from './project-progress/project-progress.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import { ProjectApiService } from '@services/projectapi.service';
import { Subject } from 'rxjs';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { RightService } from '@services/right.service';
import { ProjectStepComponent } from './project-step/project-step.component';
import { ProjectMaterialComponent } from './project-material/project-material.component';
import { ProjectDailyReportComponent } from './project-dailyreport/project-dailyreport.component';
import { ProjectReceiptComponent } from './project-receipt/project-receipt.component';
import { ProjectContractComponent } from './project-contract/project-contract.component';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html',
  styleUrls: ['./project-manage.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ProjectManageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getRight: any;
  RightObj: {};

  public projects;

  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(
    public apiService: ApiService,
    public ProjectApiService: ProjectApiService,
    public rightService: RightService,
    public helperService: HelperService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = true;
    config.keyboard = false;
    config.centered = true;
    this.getRight = this.rightService.getRight();

  }
  ngOnInit(): void {
    this.dtOptions = this.helperService.setDtOptions();
    this.RightObj = this.getRight['__zone_symbol__value'];

    this.reloadData();
  }

  async reloadData() {
    (await this.ProjectApiService.getAllProject()).subscribe((res) => {
        this.projects = res as any;
        this.dtTrigger.next(null);
    });

  }

  async refreshData() {
    (await this.ProjectApiService.getAllProject()).subscribe((res) => {
        this.projects = res as any;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next(null);
        });
    });
  }

  open(type, project) {
    if (type == 'add') {
      const modalRef = this.modalService.open(ProjectAddComponent, { size: 'lg' });
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    } else if (type == 'edit') {
      const modalRef = this.modalService.open(ProjectEditComponent, { size: 'lg' });
      modalRef.componentInstance.project = project;
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    } else if (type == 'step') {
      const modalRef = this.modalService.open(ProjectStepComponent, { size: 'lg' });
      modalRef.componentInstance.project = project;
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    }
    else if (type == 'material') {
      const modalRef = this.modalService.open(ProjectMaterialComponent, { size: 'xl' });
      modalRef.componentInstance.project = project;
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    }
    else if (type == 'DailyReportManage') {
      const modalRef = this.modalService.open(ProjectDailyReportComponent, { size: 'xl' });
      modalRef.componentInstance.project = project;
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    }
    else if (type == 'receipt') {
      const modalRef = this.modalService.open(ProjectReceiptComponent, { size: 'xl' });
      modalRef.componentInstance.project = project;
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    }
    else if (type == 'progress') {
      const modalRef = this.modalService.open(ProjectProgressComponent, { size: 'xl' });
      modalRef.componentInstance.project = project;
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    }
    else if (type == 'contract') {
      const modalRef = this.modalService.open(ProjectContractComponent, { size: 'xl' });
      modalRef.componentInstance.project = project;
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    }
  }
}
