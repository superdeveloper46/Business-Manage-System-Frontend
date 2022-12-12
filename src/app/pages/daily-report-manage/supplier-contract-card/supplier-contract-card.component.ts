import { HelperService } from '@services/helper.service';
import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Select2OptionData } from 'ng-select2';
import { ProjectApiService } from '@services/projectapi.service';

@Component({
  selector: 'app-supplier-contract-card',
  templateUrl: './supplier-contract-card.component.html',
  styleUrls: ['./supplier-contract-card.component.scss']
})
export class SupplierContractCardComponent implements OnInit {
  @Input() k3;
  @Input() id;
  @Input() reportId;
  s2WorkTypes: Select2OptionData[];
  @Input() SupplierContract_WorkType;
  s2Suppliers: Select2OptionData[];
  @Input() SupplierContract_Supplier;

  constructor(
    public apiService: ApiService,
    public helperService: HelperService,
    public elementRef: ElementRef,
    public renderer: Renderer2,
    public ProjectApiService: ProjectApiService,
  ) { }

  options: any = {
    multiple: true
  };

  ngOnInit(): void {

    this.ddlWorkType();
    this.ddlSupplier();
  }


  async ddlWorkType() {
    let arrWorkType = [];
    let k = 0;
    (await this.apiService.getWorkTypes()).subscribe((res) => {
      var AllWorkType = (res as any).filter(w => w.enable);
      AllWorkType.forEach(element => {
        arrWorkType.push({ id: element['_id'], text: element['workTypeName'] });
        k++;
        if (k == AllWorkType.length) {
          this.s2WorkTypes = arrWorkType;
        }
      });
    });
  }

  async ddlSupplier() {
    let arrSupplier = [];
    let k = 0;
    (await this.apiService.getSuppliers()).subscribe((res) => {
      var AllSupplier = (res as any).filter(w => w.enable);
      AllSupplier.forEach(element => {
        arrSupplier.push({ id: element['_id'], text: element['supplierName'] });
        k++;
        if (k == AllSupplier.length) {
          this.s2Suppliers = arrSupplier;
        }
      });
    });
  }

  onChange_Suppliers(val: String, k, subdocId): void {
    if (val != "" && this.SupplierContract_Supplier[k] != val) {
      var whereObj = [{ key: "_id", value: this.reportId, subdocName: "" }, { key: "_id", value: subdocId, subdocName: "supplierContractList" }]
      this.helperService.callUpdate("dailyReport", whereObj, this.id, "supplierId", val, "廠商出工狀態清單" + (k + 1) + ".廠商", "String")
    }
    this.SupplierContract_Supplier[k] = val;
  }

  onChange_WorkTypes(val: String, k, subdocId): void {
    if (val != "" && this.SupplierContract_Supplier[k] != val) {
      var whereObj = [{ key: "_id", value: this.reportId, subdocName: "" }, { key: "_id", value: subdocId, subdocName: "supplierContractList" }]
      this.helperService.callUpdate("dailyReport", whereObj, this.id, "workTypeId", val, "廠商出工狀態清單" + (k + 1) + ".工項", "String")
    }
    this.SupplierContract_WorkType[k] = val;
  }


  del(index) {
    $("#s2_" + index).hide();
    (this.helperService.DelDataByColumn("dailyReport", this.reportId, "supplierContractList", this.id)).subscribe((res) => { });
  }

}
