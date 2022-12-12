import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Subject } from 'rxjs';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { RightService } from '@services/right.service';
import { Select2OptionData } from 'ng-select2';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-supplier-care-manage',
  templateUrl: './supplier-care-manage.component.html',
  styleUrls: ['./supplier-care-manage.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class SupplierCareManageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getRight: any;
  RightObj: {};
  options: any = {
    multiple: true
  };
  LocationObj = [];
  QuerylocationName: [];
  QueryemployeeId = new Array<string>;
  QuerysupplierId: [];
  public selected;

  public Suppliers;
  s2Employees: Select2OptionData[];
  s2Locations: Select2OptionData[];
  s2Suppliers: Select2OptionData[];
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
    var order = [[0, 'desc']];
    this.dtOptions = this.helperService.setDtOptions(order);
    this.RightObj = this.getRight['__zone_symbol__value'];

    this.ddlEmployees();
    this.ddlLocations();
    this.ddlSuppliers();
    this.selected = { startDate: new Date(), endDate: new Date() };

  }

  reloadData() {
    this.apiService.getSupplierCares(this.QuerylocationName, this.QueryemployeeId, this.QuerysupplierId).subscribe((res) => {
      this.Suppliers = (res as any).filter(w => w.employeeId != null && w.content != "")
      this.Suppliers.forEach(element => {
        var filterLocation = this.LocationObj.filter(s => s.id == element['locationName']);
        if (filterLocation.length == 1) {
          element['locationCName'] = filterLocation[0]['locationName'];
        }
      });
      this.dtTrigger.next(null);
    });
  }

  async refreshData() {
    var QueryDate = [];
    QueryDate[0]=this.selected['startDate'].toDate();
    QueryDate[1]=this.selected['endDate'].toDate();

    this.apiService.getSupplierCares(this.QuerylocationName, this.QueryemployeeId, this.QuerysupplierId).subscribe((res) => {
      this.Suppliers = (res as any).filter(w => w.employeeId != null && w.content != "")
      this.Suppliers.forEach(element => {
        var filterLocation = this.LocationObj.filter(s => s.id == element['locationName']);
        if (filterLocation.length == 1) {
          element['locationCName'] = filterLocation[0]['locationName'];
        }
      });
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    });
  }

  async ddlEmployees() {
    let arrEmployees = [];
    let k = 0;
    (await this.apiService.getEmployeesByDepartment("20221013105334116")).subscribe((res) => {
      var AllEmployees = (res as any);
      AllEmployees.forEach(element => {
        arrEmployees.push({ id: element['_id'], text: element['empName'] });
        k++;
        if (k == AllEmployees.length) {
          this.s2Employees = arrEmployees;
        }
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
          this.reloadData();
        }
      });
    });
  }

  async ddlSuppliers() {
    let arrSuppliers = [];
    let k = 0;
    (await this.apiService.getSuppliers()).subscribe((res) => {
      var AllSuppliers = (res as any);
      AllSuppliers.forEach(element => {
        arrSuppliers.push({ id: element['_id'], text: element['supplierName'] });
        k++;
        if (k == AllSuppliers.length) {
          this.s2Suppliers = arrSuppliers;
        }
      });
    });
  }

  onChange_Employees(val: string): void {
    if (val != undefined) {
      this.QueryemployeeId[0] = val;
    } else {
      this.QueryemployeeId = [];
    }
  }

  onChange_Locations(val: []): void {
    this.QuerylocationName = val;
  }

  onChange_Suppliers(val: []): void {
    this.QuerysupplierId = val;
  }



}
