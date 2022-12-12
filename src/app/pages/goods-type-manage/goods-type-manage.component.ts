import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Subject} from 'rxjs';
import {
    NgbModalConfig,
    NgbModal,
    NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import {GoodsTypeAddComponent} from './goods-type-add/goods-type-add.component';
import {GoodsTypeEditComponent} from './goods-type-edit/goods-type-edit.component';
import Swal from 'sweetalert2';
import {DataTableDirective} from 'angular-datatables';

@Component({
    selector: 'app-goods-type-manage',
    templateUrl: './goods-type-manage.component.html',
    styleUrls: ['./goods-type-manage.component.scss'],
    providers: [NgbModalConfig, NgbModal]
})
export class GoodsTypeManageComponent implements OnInit {
    dtOptions: DataTables.Settings = {
        pagingType: 'full_numbers',
        pageLength: 10,
        stateSave: true
    };

    public goodsTypes;

    dtTrigger: Subject<any> = new Subject<any>();

    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;

    constructor(
        public apiService: ApiService,
        config: NgbModalConfig,
        private modalService: NgbModal
    ) {
        config.backdrop = true;
        config.keyboard = false;
        config.centered = true;
    }
    ngOnInit(): void {
        this.reloadData();
    }

    async reloadData() {
        (await this.apiService.getGoodTypes()).subscribe((res) => {
            this.goodsTypes = res as any;
            this.dtTrigger.next(null);
        });
    }

    async refreshData() {
        (await this.apiService.getGoodTypes()).subscribe((res) => {
            this.goodsTypes = res as any;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next(null);
            });
        });
    }

    open(type, goodType) {
        if (type == 'add') {
            const modalRef = this.modalService.open(GoodsTypeAddComponent,  { size: 'lg'});
            modalRef.closed.subscribe((result) => {
                this.refreshData();
            });
        } else if (type == 'edit') {
            const modalRef = this.modalService.open(GoodsTypeEditComponent,  { size: 'lg'});
            modalRef.componentInstance.goodType = goodType;
            modalRef.closed.subscribe((result) => {
                this.refreshData();
            });
        } else if (type == 'delete') {
            Swal.fire({
                title: '確定要刪除貨品類別?',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: '確定',
                confirmButtonColor:'#17A2B8',
                cancelButtonText: '取消',
                icon: 'question'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.apiService
                        .deleteGoodTypes(goodType.id)
                        .subscribe((res) => {
                            if ((res as any).result_status == true) {
                                this.refreshData();
                            } else {
                                Swal.fire({
                                    title: (res as any).result_message,
                                    icon: 'error'
                                });
                            }
                        });
                }
            });
        }
    }
}
