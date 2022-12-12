import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Subject } from 'rxjs';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import { JobModulesAddComponent } from './job-modules-add/job-modules-add.component';
import { JobModulesEditComponent } from './job-modules-edit/job-modules-edit.component';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { RightService } from '@services/right.service';
import { Select2OptionData } from 'ng-select2';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-job-modules-manage',
  templateUrl: './job-modules-manage.component.html',
  styleUrls: ['./job-modules-manage.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class JobModulesManageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getRight: any;
  RightObj: {};

  public jobModuleses;
  QueryJobs: string
  s2Jobs: Select2OptionData[];
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(
    public apiService: ApiService,
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
    var order = [[7, 'asc']];
    this.dtOptions = this.helperService.setDtOptions(order);
    this.RightObj = this.getRight['__zone_symbol__value'];

    this.reloadData();
    this.ddlJobs();
  }

  async reloadData() {
    (await this.apiService.getJobModuleses('', '', '', this.QueryJobs)).subscribe((res) => {
      this.jobModuleses = res as any;
      this.dtTrigger.next(null);
    });
  }

  async refreshData() {
    (await this.apiService.getJobModuleses('', '', '', this.QueryJobs)).subscribe((res) => {
      this.jobModuleses = res as any;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    });
  }

  async ddlJobs() {
    let arrJobs = [];
    let k = 0;
    (await this.apiService.getJobs()).subscribe((res) => {
      var AllJobs = res as any;
      AllJobs.forEach(element => {
        arrJobs.push({ id: element['_id'], text: element['jobName'] });
        k++;
        if (k == AllJobs.length) {
          this.s2Jobs = arrJobs;
        }
      });
    });
  }
  onChange_Jobs(val: string): void {
    this.QueryJobs = val;
  }

  open(type, jobModules) {
    if (type == 'add') {
      const modalRef = this.modalService.open(JobModulesAddComponent, { size: 'lg' });
      modalRef.closed.subscribe((result) => {
        this.refreshData();
        if(result == 1){
          this.open('add',jobModules);
        }
      });
    } else if (type == 'edit') {
      const modalRef = this.modalService.open(JobModulesEditComponent, { size: 'lg' });
      modalRef.componentInstance.jobModules = jobModules;
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    } else if (type == 'delete') {
      Swal.fire({
        title: '確定要刪除職務權限?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '確定',
        confirmButtonColor: '#17A2B8',
        cancelButtonText: '取消',
        icon: 'question'
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.deleteJobModuleses(jobModules._id).subscribe((res) => {
            this.refreshData();
          });
        }
      });
    }
  }
}
