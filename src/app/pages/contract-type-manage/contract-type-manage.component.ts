import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import { RightService } from '@services/right.service';
import { Subject } from 'rxjs';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import { ContractTypeAddComponent } from './contract-type-add/contract-type-add.component';
import { ContractTypeEditComponent } from './contract-type-edit/contract-type-edit.component';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-contract-type-manage',
  templateUrl: './contract-type-manage.component.html',
  styleUrls: ['./contract-type-manage.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ContractTypeManageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getRight:any
  RightObj: {};

  public contractTypes;

  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(
    public apiService: ApiService,
    public rightService: RightService,
    public helperService: HelperService,
    config: NgbModalConfig,
    private modalService: NgbModal,
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
    (await this.apiService.getContractTypes()).subscribe((res) => {
      this.contractTypes = res as any;
      this.dtTrigger.next(null);
    });
  }

  async refreshData() {
    (await this.apiService.getContractTypes()).subscribe((res) => {
      this.contractTypes = res as any;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    });
  }

  open(type, contractType) {
    if (type == 'add') {
      const modalRef = this.modalService.open(ContractTypeAddComponent, { size: 'md' });
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    } else if (type == 'edit') {
      const modalRef = this.modalService.open(ContractTypeEditComponent, { size: 'md' });
      modalRef.componentInstance.contractType = contractType;
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    } else if (type == 'delete') {
      Swal.fire({
        title: '確定要刪除合約類型?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '確定',
        confirmButtonColor: '#17A2B8',
        cancelButtonText: '取消',
        icon: 'question'
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.deleteContractTypes(contractType._id).subscribe((res) => {
            this.refreshData();
          });
        }
      });
    }
  }
}
