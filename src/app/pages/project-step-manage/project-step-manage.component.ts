import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Subject} from 'rxjs';
import {
    NgbModalConfig,
    NgbModal,
    NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import {ProjectStepAddComponent} from './project-step-add/project-step-add.component';
import {ProjectStepEditComponent} from './project-step-edit/project-step-edit.component';
import Swal from 'sweetalert2';
import {DataTableDirective} from 'angular-datatables';
import { RightService } from '@services/right.service';
import { HelperService } from '@services/helper.service';

@Component({
    selector: 'app-project-step-manage',
    templateUrl: './project-step-manage.component.html',
    styleUrls: ['./project-step-manage.component.scss'],
    providers: [NgbModalConfig, NgbModal]
})
export class ProjectStepManageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getRight: any;
  RightObj: {};


    public projectSteps;

    dtTrigger: Subject<any> = new Subject<any>();

    @ViewChild(DataTableDirective, {static: false})
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
      var order = [[1, 'asc']]
      this.dtOptions = this.helperService.setDtOptions(order);
      this.RightObj = this.getRight['__zone_symbol__value'];
        this.reloadData();
    }

    async reloadData() {
        (await this.apiService.getProjectSteps()).subscribe((res) => {
            this.projectSteps = res as any;
            this.dtTrigger.next(null);
        });
    }

    async refreshData() {
        (await this.apiService.getProjectSteps()).subscribe((res) => {
            this.projectSteps = res as any;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next(null);
            });
        });
    }

    open(type, projectStep) {
        if (type == 'add') {
            const modalRef = this.modalService.open(ProjectStepAddComponent,  { size: 'md'});
            modalRef.closed.subscribe((result) => {
                this.refreshData();
            });
        } else if (type == 'edit') {
            const modalRef = this.modalService.open(ProjectStepEditComponent,  { size: 'md'});
            modalRef.componentInstance.projectStep = projectStep;
            modalRef.closed.subscribe((result) => {
                this.refreshData();
            });
        } else if (type == 'delete') {
            Swal.fire({
                title: '確定要刪除專案階段?',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: '確定',
                confirmButtonColor:'#17A2B8',
                cancelButtonText: '取消',
                icon: 'question'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.apiService.deleteProjectSteps(projectStep._id).subscribe((res) => {
                      if (res['delete'] != null) {
                        if (!res['delete']) {
                          var msg = (res['msg'] == null) ? "已有關聯資料" : res['msg'];
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
