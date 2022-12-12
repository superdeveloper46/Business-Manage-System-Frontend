import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import { HelperService } from '@services/helper.service';
import { RightService } from '@services/right.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-supplier-contract',
  templateUrl: './supplier-contract.component.html',
  styleUrls: ['./supplier-contract.component.scss']
})
export class SupplierContractComponent implements OnInit {
  getRight: any;
  RightObj: {};
  @Input() supplier;
  supplierContractList : [];
  constructor(
    public apiService: ApiService,
    public rightService: RightService,
    public helperService: HelperService,
    public activeModal: NgbActiveModal,
  ) {
    this.getRight = this.rightService.getRight();}
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement: DataTableDirective;

  ngOnInit(): void {

    this.RightObj = this.getRight['__zone_symbol__value'];
    this.reloadData();
  }

  async reloadData() {
    (await this.apiService.getSupplierContract("","","",this.supplier._id)).subscribe((res) => {
      this.supplierContractList = res as any;
      this.dtTrigger.next(null);
    });
  }

  async refreshData() {

    (await this.apiService.getSupplierContract("","","",this.supplier._id)).subscribe((res) => {
      this.supplierContractList = res as any;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    });
  }



  toThousandNumber(param: number) {
    const paramStr = param.toString();
    if (paramStr.length > 3) {
      return paramStr.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    return paramStr;
  }

}
