import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Subject } from 'rxjs';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import { JobAddComponent } from './job-add/job-add.component';
import { JobEditComponent } from './job-edit/job-edit.component';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { RightService } from '@services/right.service';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-job-manage',
  templateUrl: './job-manage.component.html',
  styleUrls: ['./job-manage.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class JobManageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getRight: any;
  RightObj: {};


  public Jobs;

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
    var order = [[2, 'asc']];
    this.dtOptions = this.helperService.setDtOptions(order);
    this.RightObj = this.getRight['__zone_symbol__value'];

    this.reloadData();
  }

  async reloadData() {
    (await this.apiService.getJobs()).subscribe((res) => {
      this.Jobs = res as any;
      this.dtTrigger.next(null);
    });
  }

  async refreshData() {
    (await this.apiService.getJobs()).subscribe((res) => {
      this.Jobs = res as any;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    });
  }

  open(type, job) {
    if (type == 'add') {
      const modalRef = this.modalService.open(JobAddComponent, { size: 'lg' });
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    } else if (type == 'edit') {
      const modalRef = this.modalService.open(JobEditComponent, { size: 'lg' });
      modalRef.componentInstance.job = job;
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    } else if (type == 'delete') {
      Swal.fire({
        title: '確定要刪除職務?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '確定',
        confirmButtonColor: '#17A2B8',
        cancelButtonText: '取消',
        icon: 'question'
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.deleteJobs(job._id).subscribe((res) => {
            if (res['delete'] != null) {
              if (res['delete']) {
                var msg = (res['msg'] == null) ? "'已有關聯資料，是否強制刪除?'" : res['msg'] + "，是否強制刪除?";
                Swal.fire({
                  title: msg,
                  showConfirmButton: true,
                  showCancelButton: true,
                  confirmButtonText: '確定',
                  confirmButtonColor: '#17A2B8',
                  cancelButtonText: '取消',
                  icon: 'question'
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.apiService.deleteJobs(job._id, true).subscribe((res) => {
                      this.refreshData();
                    });
                  }
                });
              } else {
                msg = (res['msg'] == null) ? "已有關聯資料" : res['msg'];
                Swal.fire({
                  title: msg,
                  confirmButtonText: '確定',
                  confirmButtonColor: '#17A2B8',
                  icon: 'error'
                })
              }
            } else {
              this.refreshData();
            }
          });
        }
      });
    }
  }
}
