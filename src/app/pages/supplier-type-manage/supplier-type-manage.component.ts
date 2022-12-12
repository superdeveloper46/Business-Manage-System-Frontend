import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Subject} from 'rxjs';
import {
    NgbModalConfig,
    NgbModal,
    NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import {SupplierTypeAddComponent} from './supplier-type-add/supplier-type-add.component';
import {SupplierTypeEditComponent} from './supplier-type-edit/supplier-type-edit.component';
import Swal from 'sweetalert2';
import {DataTableDirective} from 'angular-datatables';
import { RightService } from '@services/right.service';
import { HelperService } from '@services/helper.service';

@Component({
    selector: 'app-supplier-type-manage',
    templateUrl: './supplier-type-manage.component.html',
    styleUrls: ['./supplier-type-manage.component.scss'],
    providers: [NgbModalConfig, NgbModal]
})
export class SupplierTypeManageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getRight: any;
  RightObj: {};

    public supplierTypes;

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
        (await this.apiService.getSupplierTypes()).subscribe((res) => {
            this.supplierTypes = res as any;
            this.dtTrigger.next(null);
        });
    }

    async refreshData() {
        (await this.apiService.getSupplierTypes()).subscribe((res) => {
            this.supplierTypes = res as any;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next(null);
            });
        });
    }

    open(type, supplierType) {
        if (type == 'add') {
            const modalRef = this.modalService.open(SupplierTypeAddComponent,  { size: 'md'});
            modalRef.closed.subscribe((result) => {
                this.refreshData();
            });
        } else if (type == 'edit') {
            const modalRef = this.modalService.open(SupplierTypeEditComponent,  { size: 'md'});
            modalRef.componentInstance.supplierType = supplierType;
            modalRef.closed.subscribe((result) => {
                this.refreshData();
            });
        } else if (type == 'delete') {
            Swal.fire({
                title: '確定要刪除廠商合作模式?',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: '確定',
                confirmButtonColor:'#17A2B8',
                cancelButtonText: '取消',
                icon: 'question'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.apiService.deleteSupplierTypes(supplierType._id).subscribe((res) => {
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
