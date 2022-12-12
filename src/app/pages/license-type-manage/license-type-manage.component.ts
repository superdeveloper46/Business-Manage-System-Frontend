import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Subject} from 'rxjs';
import {
    NgbModalConfig,
    NgbModal,
    NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import {LicenseTypeAddComponent} from './license-type-add/license-type-add.component';
import {LicenseTypeEditComponent} from './license-type-edit/license-type-edit.component';
import Swal from 'sweetalert2';
import {DataTableDirective} from 'angular-datatables';
import { RightService } from '@services/right.service';
import { HelperService } from '@services/helper.service';

@Component({
    selector: 'app-license-type-manage',
    templateUrl: './license-type-manage.component.html',
    styleUrls: ['./license-type-manage.component.scss'],
    providers: [NgbModalConfig, NgbModal]
})
export class LicenseTypeManageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getRight: any;
  RightObj: {};

    public licenseTypes;

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
        (await this.apiService.getLicenseTypes()).subscribe((res) => {
            this.licenseTypes = res as any;
            this.dtTrigger.next(null);
        });
    }

    async refreshData() {
        (await this.apiService.getLicenseTypes()).subscribe((res) => {
            this.licenseTypes = res as any;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next(null);
            });
        });
    }

    open(type, licenseType) {
        if (type == 'add') {
            const modalRef = this.modalService.open(LicenseTypeAddComponent,  { size: 'md'});
            modalRef.closed.subscribe((result) => {
                this.refreshData();
            });
        } else if (type == 'edit') {
            const modalRef = this.modalService.open(LicenseTypeEditComponent,  { size: 'md'});
            modalRef.componentInstance.licenseType = licenseType;
            modalRef.closed.subscribe((result) => {
                this.refreshData();
            });
        } else if (type == 'delete') {
            Swal.fire({
                title: '確定要刪除證照類型?',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: '確定',
                confirmButtonColor:'#17A2B8',
                cancelButtonText: '取消',
                icon: 'question'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.apiService.deleteLicenseTypes(licenseType._id).subscribe((res) => {
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
