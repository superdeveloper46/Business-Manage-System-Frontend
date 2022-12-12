import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Subject} from 'rxjs';
import {
    NgbModalConfig,
    NgbModal,
    NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import {ProjectTypeAddComponent} from './project-type-add/project-type-add.component';
import {ProjectTypeEditComponent} from './project-type-edit/project-type-edit.component';
import Swal from 'sweetalert2';
import {DataTableDirective} from 'angular-datatables';
import { RightService } from '@services/right.service';
import { HelperService } from '@services/helper.service';

@Component({
    selector: 'app-project-type-manage',
    templateUrl: './project-type-manage.component.html',
    styleUrls: ['./project-type-manage.component.scss'],
    providers: [NgbModalConfig, NgbModal]
})
export class ProjectTypeManageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getRight: any;
  RightObj: {};

    public projectTypes;

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
      this.dtOptions = this.helperService.setDtOptions();
      this.RightObj = this.getRight['__zone_symbol__value'];

        this.reloadData();
    }

    async reloadData() {
        (await this.apiService.getProjectTypes()).subscribe((res) => {
            this.projectTypes = res as any;
            this.dtTrigger.next(null);
        });
    }

    async refreshData() {
        (await this.apiService.getProjectTypes()).subscribe((res) => {
            this.projectTypes = res as any;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next(null);
            });
        });
    }

    open(type, projectType) {
        if (type == 'add') {
            const modalRef = this.modalService.open(ProjectTypeAddComponent,  { size: 'md'});
            modalRef.closed.subscribe((result) => {
                this.refreshData();
            });
        } else if (type == 'edit') {
            const modalRef = this.modalService.open(ProjectTypeEditComponent,  { size: 'md'});
            modalRef.componentInstance.projectType = projectType;
            modalRef.closed.subscribe((result) => {
                this.refreshData();
            });
        } else if (type == 'delete') {
            Swal.fire({
                title: '確定要刪除專案類型?',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: '確定',
                confirmButtonColor:'#17A2B8',
                cancelButtonText: '取消',
                icon: 'question'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.apiService.deleteProjectTypes(projectType._id).subscribe((res) => {
                        this.refreshData();
                    });
                }
            });
        }
    }
}
