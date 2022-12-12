import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Subject } from 'rxjs';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import { PaymentTypeAddComponent } from './payment-type-add/payment-type-add.component';
import { PaymentTypeEditComponent } from './payment-type-edit/payment-type-edit.component';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { RightService } from '@services/right.service';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-payment-type-manage',
  templateUrl: './payment-type-manage.component.html',
  styleUrls: ['./payment-type-manage.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class PaymentTypeManageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getRight: any;
  RightObj: {};

  public paymentTypes;

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
    this.dtOptions = this.helperService.setDtOptions();
    this.RightObj = this.getRight['__zone_symbol__value'];
    this.reloadData();
  }

  async reloadData() {
    (await this.apiService.getPaymentTypes()).subscribe((res) => {
      this.paymentTypes = res as any;
      this.dtTrigger.next(null);
    });
  }

  async refreshData() {
    (await this.apiService.getPaymentTypes()).subscribe((res) => {
      this.paymentTypes = res as any;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    });
  }

  open(type, paymentType) {
    if (type == 'add') {
      const modalRef = this.modalService.open(PaymentTypeAddComponent, { size: 'md' });
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    } else if (type == 'edit') {
      const modalRef = this.modalService.open(PaymentTypeEditComponent, { size: 'md' });
      modalRef.componentInstance.paymentType = paymentType;
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    } else if (type == 'delete') {
      Swal.fire({
        title: '確定要刪除追加減款項?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '確定',
        confirmButtonColor: '#17A2B8',
        cancelButtonText: '取消',
        icon: 'question'
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.deletePaymentTypes(paymentType._id).subscribe((res) => {
            this.refreshData();
          });
        }
      });
    }
  }

}
