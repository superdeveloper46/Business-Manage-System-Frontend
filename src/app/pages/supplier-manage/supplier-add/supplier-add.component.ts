import { LocationAreaCardComponent } from '../location-area-card/location-area-card.component';
import { Component, OnInit, Input, ElementRef, ViewChild, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';
import { Select2OptionData } from 'ng-select2';
@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.scss']
})
export class SupplierAddComponent implements OnInit {
  @Input() LocationObj;
  public result;
  public supplierTypes;
  k = 0;
  s2Locations: Select2OptionData[];
  s2Locations_List: Select2OptionData[];
  s2Areas: Select2OptionData[];
  s2Areas_List: Select2OptionData[];
  locationItem_locationName: String;
  locationItem_areaName: String;
  locationAreaList_locationName = new Array<String>;
  locationAreaList_areaNameList = new Array<String[]>;

  @ViewChild('locationAreaList', { static: false, read: ViewContainerRef }) target: ViewContainerRef;
  private componentRef: ComponentRef<any>;

  s2WorkTypes: Select2OptionData[];
  WorkType: Array<string>;
  s2Employees: Select2OptionData[];
  Employee: String;

  s2Banks: Select2OptionData[];
  supplierBankData_bankId: String;
  supplierBankData_branchName = new FormControl('');;
  supplierBankData_accountNo = new FormControl('');;;
  supplierBankData_userName = new FormControl('');;;
  supplierBankData_bookUrl: String;

  fileName: string;
  formData = new FormData();

  public CreateForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService,
    private resolver: ComponentFactoryResolver
  ) { }

  options: any = {
    multiple: true
  };

  ngOnInit(): void {

    var emptySupplierCareList =[{"contentDate":null,"content":"","employeeId":null}];
    this.CreateForm = new FormGroup({
      supplierName: new FormControl('', Validators.required),
      businessNo: new FormControl('', Validators.required),
      codeName: new FormControl('', Validators.required),
      contactName: new FormControl('', Validators.required),
      contactPhone: new FormControl('', Validators.required),
      badRecord: new FormControl(false, Validators.required),
      email: new FormControl('', Validators.required),
      supplierTypeId: new FormControl('0', Validators.required),
      workersNum: new FormControl(0, Validators.required),
      locationItem: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      workTypeIdList: new FormControl(null, Validators.required),
      locationAreaList: new FormControl(null),
      employeeId: new FormControl(null, Validators.required),
      remark: new FormControl(''),
      supplierBankData: new FormControl(''),
      supplierCareList: new FormControl(emptySupplierCareList),
    });
    this.ddlSupplierType();
    this.ddlLocations();
    this.ddlWorkType();
    this.ddlEmployee();
    this.ddlBank();
  }

  async ddlSupplierType() {
    (await this.apiService.getSupplierTypes()).subscribe((res) => {
      this.supplierTypes = res as any;
    });
  }

  ddlLocations() {
    let arrLocations = [];
    let k = 0;
    this.LocationObj.forEach(element => {
      arrLocations.push({ id: element['id'], text: element['locationName'] });
      k++;
      if (k == this.LocationObj.length) {
        this.s2Locations = arrLocations;
        this.s2Locations_List = arrLocations;
      }
    });
    this.locationItem_locationName = '';
    this.locationAreaList_locationName[0] = '';
  }


  async ddlAreas(locationId, type) {
    let arrAreas = [];
    let k = 0;
    var filterLocation = this.LocationObj.filter(s => s.id == locationId);
    if (filterLocation.length == 1) {
      var AllAreas = filterLocation[0]['areaNameList'];
      AllAreas.forEach(element => {
        arrAreas.push({ id: element, text: element });
        k++;
        if (k == AllAreas.length) {
          if (type == 'List') {
            this.s2Areas_List = arrAreas;
          } else {
            this.s2Areas = arrAreas;
          }
        }
      });
    }
  }

  async ddlWorkType() {
    let arrWorkType = [];
    let k = 0;
    (await this.apiService.getWorkTypes()).subscribe((res) => {
      var AllWorkType =(res as any).filter(w => w.enable);
      AllWorkType.forEach(element => {
        arrWorkType.push({ id: element['_id'], text: element['workTypeName'] });
        k++;
        if (k == AllWorkType.length) {
          this.s2WorkTypes = arrWorkType;
        }
      });
    });
  }

  async ddlEmployee() {
    let arrEmployee = [];
    let k = 0;
    (await this.apiService.getEmployeesByDepartment("20221013105334116")).subscribe((res) => {
      var AllEmployee = (res as any).filter(w => !w.lock);
      AllEmployee.forEach(element => {
        k++;
        arrEmployee.push({ id: element['_id'], text: element['empName'] });
        if (k == AllEmployee.length) {
          this.s2Employees = arrEmployee;
        }
      });
    });
  }

  async ddlBank() {
    let arrBank = [];
    let k = 0;
    (await this.apiService.getBanks()).subscribe((res) => {
      var AllBank = res['_embedded']['banks'] as any;
      AllBank.forEach(element => {
        var idArr = element['_links']['self']['href'].split('/');
        var id = idArr[idArr.length - 1];
        arrBank.push({ id: id, text: element['bankName'] });
        k++;
        if (k == AllBank.length) {
          this.s2Banks = arrBank;
        }
      });
    });
  }

  onChange_Locations(val: String, type, k): void {
    if (type == 'List') {
      this.locationAreaList_locationName[k] = val;
    } else {
      this.locationItem_locationName = val;
    }
    if (val != undefined) {
      this.ddlAreas(val, type);
    }
  }


  onChange_Areas(val: String): void {
    this.locationItem_areaName = val;
  }

  onChange_AreasList(val: [], k): void {
    this.locationAreaList_areaNameList[k] = val;
  }

  onChange_WorkTypes(val: []): void {
    this.WorkType = val;
  }

  onChange_Employees(val: String): void {
    this.Employee = val;
  }

  onChange_Banks(val: String): void {
    this.supplierBankData_bankId = val;
  }


  addlocationAreaList() {
    this.k++;

    let childComponent = this.resolver.resolveComponentFactory(LocationAreaCardComponent);
    this.componentRef = this.target.createComponent(childComponent);
    this.componentRef.instance.k = this.k;
    this.componentRef.instance.locationAreaList_locationName = this.locationAreaList_locationName;
    this.componentRef.instance.locationAreaList_areaNameList = this.locationAreaList_areaNameList;
    this.componentRef.instance.LocationObj = this.LocationObj;

  }

  del(index) {
    this.locationAreaList_locationName[index] = null;
    this.locationAreaList_areaNameList[index] = null;

    $("#l_" + index).hide();
  }


  fileSelected(e) {
    const file: File = e.target.files[0];
    if (file) {
      if (file.size > 104857600) {
        this.fileName = "";
        Swal.fire({
          title: '檔案不得超過100MB!',
          confirmButtonText: '確定',
          confirmButtonColor: '#17A2B8',
          icon: 'error'
        });
      } else {
        this.fileName = file.name;
        var FileExtensionArr = ["jpg", "png"];
        if (FileExtensionArr.indexOf((this.fileName.split('.')[this.fileName.split('.').length - 1]).toLowerCase()) > -1) {
          this.formData.append('url', "bank_data");
          this.formData.append('uploadFile', file);
        } else {
          this.fileName = "";
          Swal.fire({
            title: '檔案類型不正確!',
            confirmButtonText: '確定',
            confirmButtonColor: '#17A2B8',
            icon: 'error'
          });
        }
      }
    }
  }


  addSupplier() {
    if (this.fileName != undefined) {
      this.apiService
        .uploadData(
          this.formData
        )
        .subscribe((res) => {
          this.result = res as any;
          if (this.result.result_status == false) {
            Swal.fire({
              title: this.result.result_message,
              icon: 'error'
            });
          } else {
            this.callEdit(res["name"]);
          }
        });
    } else {
      this.callEdit("");
    }
  }

  callEdit(fileName) {
    if (fileName != "") {
      fileName = "bank_data/" + fileName;
    }

    var locationItemObj = { locationName: this.locationItem_locationName, areaName: this.locationItem_areaName };
    this.CreateForm.controls['locationItem'].setValue(locationItemObj);


    var supplierBankData = {
      bankId: this.supplierBankData_bankId,
      branchName: this.supplierBankData_branchName.value || "",
      accountNo: this.supplierBankData_accountNo.value || "",
      userName: this.supplierBankData_userName.value || "",
      bookUrl: fileName
    };

    this.CreateForm.controls['supplierBankData'].setValue(supplierBankData);
    this.CreateForm.controls['workTypeIdList'].setValue(this.WorkType);
    this.CreateForm.controls['employeeId'].setValue(this.Employee);

    var locationAreaList = new Array();
    this.locationAreaList_locationName.forEach((element, index) => {
      if (element != null) {
        locationAreaList.push({ locationName: element, areaNameList: this.locationAreaList_areaNameList[index] })
      }
    });
    this.CreateForm.controls['locationAreaList'].setValue(locationAreaList);

    if (this.CreateForm.valid) {
      this.apiService
        .addSuppliers(
          this.CreateForm.value
        )
        .subscribe((res) => {
          this.result = res as any;
          if (this.result.result_status == false) {
            Swal.fire({
              title: this.result.result_message,
              icon: 'error'
            });
          } else {
            this.activeModal.close();
          }
        });
    } else {
      Swal.fire({
        title: '請填寫必填欄位',
        confirmButtonText: '確定',
        confirmButtonColor: '#17A2B8',
        icon: 'error'
      });
    }
  }
}
