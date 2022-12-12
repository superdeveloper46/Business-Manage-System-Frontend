import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Subject } from 'rxjs';
import {
  NgbModalConfig,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';
import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';
import { SupplierLocationAreaListComponent } from './supplier-location-area-list/supplier-location-area-list.component';
import { SupplierBankDataComponent } from './supplier-bank-data/supplier-bank-data.component';
import { SupplierContractComponent } from './supplier-contract/supplier-contract.component';
import { SupplierCareListComponent } from './supplier-care-list/supplier-care-list.component';
import { SupplierDisabledComponent } from './supplier-disabled/supplier-disabled.component';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Select2OptionData } from 'ng-select2';
import { RightService } from '@services/right.service';
import { HelperService } from '@services/helper.service';


@Component({
  selector: 'app-supplier-manage',
  templateUrl: './supplier-manage.component.html',
  styleUrls: ['./supplier-manage.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class SupplierManageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getRight: any;
  RightObj: {};

  public suppliers;
  options: any = {
    multiple: true
  };

  QueryLocation: [];
  s2Locations: Select2OptionData[];
  LocationObj = [];
  QueryWorkType: [];
  s2WorkTypes: Select2OptionData[];

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
    this.ddlLocations();
    this.reloadData();
    this.ddlWorkType();
  }

  async reloadData() {
    this.apiService.getSuppliers('', '', '', this.QueryLocation, this.QueryWorkType).subscribe((res) => {
      this.suppliers = res as any;
      this.suppliers.forEach(element => {
        var filterLocation = this.LocationObj.filter(s => s.id == element['locationItem']['locationName']);
        if (filterLocation.length == 1) {
          element['locationItem']['locationCName'] = filterLocation[0]['locationName'];
        }
        var CareList = element['supplierCareList'];
        element['careEnable']  = false;

        if(CareList != null && CareList.length > 0) {
          CareList = CareList.slice().reverse();
          var lastCareDate = new Date(CareList[0]['contentDate']);
          var difference= Math.abs(new Date().getTime()-lastCareDate.getTime());
          var days = difference/(1000 * 3600 * 24)
          if(days > 182.5){
            element['careEnable'] = true;
          }
        }else{
          element['careEnable'] = true;
        }
        });
      this.dtTrigger.next(null);
    });
  }


  async refreshData() {
    this.apiService.getSuppliers('', '', '', this.QueryLocation, this.QueryWorkType).subscribe((res) => {
      this.suppliers = res as any;
      this.suppliers.forEach(element => {
        var filterLocation = this.LocationObj.filter(s => s.id == element['locationItem']['locationName']);
        if (filterLocation.length == 1) {
          element['locationItem']['locationCName'] = filterLocation[0]['locationName'];
        }

        var CareList = element['supplierCareList'];
        element['careEnable']  = false;
        if(CareList != null && CareList.length > 0) {
          CareList = CareList.slice().reverse();
          var lastCareDate = new Date(CareList[0]['contentDate']);
          var difference= Math.abs(new Date().getTime()- lastCareDate.getTime());
          var days = difference/(1000 * 3600 * 24)
          if(days > 182.5){
            element['careEnable'] = true;
          }
        }else{
          element['careEnable'] = true;
        }
        });
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    });
  }

  async ddlLocations() {
    let arrLocations = [];
    let k = 0;
    (await this.apiService.getLocations()).subscribe((res) => {
      this.LocationObj = res['_embedded']['locations'] as any;
      this.LocationObj.forEach((element, index) => {
        var idArr = element['_links']['self']['href'].split('/');
        var id = idArr[idArr.length - 1];
        this.LocationObj[index]['id'] = id;
        arrLocations.push({ id: id, text: element['locationName'] });
        k++;
        if (k == this.LocationObj.length) {
          this.s2Locations = arrLocations;
        }
      });
    });
  }

  async ddlWorkType() {
    let arrWorkType = [];
    let k = 0;
    (await this.apiService.getWorkTypes()).subscribe((res) => {
      var AllWorkType = (res as any);
      AllWorkType.forEach(element => {
        arrWorkType.push({ id: element._id, text: element['workTypeName'] });
        k++;
        if (k == AllWorkType.length) {
          this.s2WorkTypes = arrWorkType;
        }
      });
    });
  }

  onChange_Locations(val: []): void {
    this.QueryLocation = val;
  }


  onChange_WorkTypes(val: []): void {
    this.QueryWorkType = val;
  }


  open(type, supplier) {
    if (type == 'add') {
      const modalRef = this.modalService.open(SupplierAddComponent, { size: 'xl' });
      modalRef.componentInstance.LocationObj = this.LocationObj;
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    } else if (type == 'edit') {
      const modalRef = this.modalService.open(SupplierEditComponent, { size: 'xl' });
      modalRef.componentInstance.supplier = supplier;
      modalRef.componentInstance.LocationObj = this.LocationObj;
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    } else if (type == 'delete') {
      Swal.fire({
        title: '確定要刪除廠商合作模式?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '確定',
        confirmButtonColor: '#17A2B8',
        cancelButtonText: '取消',
        icon: 'question'
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.deleteSuppliers(supplier._id).subscribe((res) => {
            this.refreshData();
          });
        }
      });
    }
    else if (type == 'locationAreaList') {
      const modalRef = this.modalService.open(SupplierLocationAreaListComponent, { size: 'lg' });
      modalRef.componentInstance.supplier = supplier;
      modalRef.componentInstance.LocationObj = this.LocationObj;
      modalRef.closed.subscribe((result) => {
      });
    }
    else if (type == 'supplierBankData') {
      const modalRef = this.modalService.open(SupplierBankDataComponent, { size: 'xl' });
      modalRef.componentInstance.supplier = supplier;
      modalRef.closed.subscribe((result) => {
      });
    }
    else if (type == 'contract') {
      const modalRef = this.modalService.open(SupplierContractComponent, { size: 'xl' });
      modalRef.componentInstance.supplier = supplier;
      modalRef.closed.subscribe((result) => {
      });
    }
    else if (type == 'supplierCareList1' || type == 'supplierCareList2') {
      const modalRef = this.modalService.open(SupplierCareListComponent, { size: 'xl' });
      modalRef.componentInstance.supplier = supplier;
      var status = (type == 'supplierCareList1') ? "1" : "2";
      modalRef.componentInstance.status = status;
      modalRef.closed.subscribe((result) => {
        if(status == "2"){
          this.refreshData();
        }
      });
    }
    else if (type == 'disabled') {
      const modalRef = this.modalService.open(SupplierDisabledComponent, { size: 'sm' });
      modalRef.componentInstance.supplier = supplier;
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    }
  }
}
