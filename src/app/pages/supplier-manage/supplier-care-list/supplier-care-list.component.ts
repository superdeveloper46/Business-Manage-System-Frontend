import { filter } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import { RightService } from '@services/right.service';
import { Select2OptionData } from 'ng-select2';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-supplier-care-list',
  templateUrl: './supplier-care-list.component.html',
  styleUrls: ['./supplier-care-list.component.scss']
})
export class SupplierCareListComponent implements OnInit {
  getRight: any;
  RightObj: {};
  public result;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @Input() supplier;
  @Input() status;

  s2Employees: Select2OptionData[];
  Employee: String;
  supplierCareList : [];
  lastCareDate:String;

  public CreateForm: FormGroup;
  public EditForm: FormGroup;
  constructor(
    public apiService: ApiService,
    public rightService: RightService,
    public helperService: HelperService,
    public activeModal: NgbActiveModal,
  ) {
    this.getRight = this.rightService.getRight(); }

  ngOnInit(): void {
    this.dtOptions = this.helperService.setDtOptions();
    this.RightObj = this.getRight['__zone_symbol__value'];
    this.CreateForm = new FormGroup({
      employeeId: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    })
    this.EditForm = new FormGroup({
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

      disableDay: new FormControl(),
      disableRemark: new FormControl(),
      supplierCareList: new FormControl(),
      enable: new FormControl(),
    });
    this.supplierCareList = this.supplier.supplierCareList.slice().reverse().filter(w => w.employeeId != null && w.content != "");
    if(this.supplier.supplierCareList.length > 0){
      this.lastCareDate = this.formatDate(this.supplier.supplierCareList[0].contentDate);
    }
    this.lastCareDate = "";

    this.EditForm.controls['supplierName'].setValue(this.supplier.supplierName);
    this.EditForm.controls['businessNo'].setValue(this.supplier.businessNo);
    this.EditForm.controls['codeName'].setValue(this.supplier.codeName);
    this.EditForm.controls['contactName'].setValue(this.supplier.contactName);
    this.EditForm.controls['contactPhone'].setValue(this.supplier.contactPhone);
    this.EditForm.controls['badRecord'].setValue(this.supplier.badRecord);
    this.EditForm.controls['email'].setValue(this.supplier.email);
    this.EditForm.controls['supplierTypeId'].setValue(this.supplier.supplierTypeId);
    this.EditForm.controls['workersNum'].setValue(this.supplier.workersNum);
    this.EditForm.controls['locationItem'].setValue(this.supplier.locationItem);
    this.EditForm.controls['address'].setValue(this.supplier.address);
    this.EditForm.controls['employeeId'].setValue(this.supplier.employeeId);
    this.EditForm.controls['remark'].setValue(this.supplier.remark);
    this.EditForm.controls['disableDay'].setValue(this.supplier.disableDay);
    this.EditForm.controls['disableRemark'].setValue(this.supplier.disableRemark);
    this.EditForm.controls['supplierCareList'].setValue(this.supplier.supplierCareList);
    this.EditForm.controls['enable'].setValue(this.supplier.enable);

    this.EditForm.controls['workTypeIdList'].setValue(this.supplier.workTypeIdList);
    this.EditForm.controls['locationAreaList'].setValue(this.supplier.locationAreaList);
    this.EditForm.controls['supplierBankData'].setValue(this.supplier.supplierBankData);
    this.ddlEmployee();
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


  onChange_Employees(val: String): void {
    this.Employee = val;
  }

  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }


  addSupplierCareList() {

    this.CreateForm.controls['employeeId'].setValue(this.Employee);

    if (this.CreateForm.valid) {
      var supplierCareObj= this.supplier.supplierCareList.filter(w => w.employeeId != null && w.content != "");
      supplierCareObj.push({'employeeId':this.CreateForm.controls['employeeId'].value,'content':this.CreateForm.controls['content'].value,'contentDate':new Date()})
      this.EditForm.controls['supplierCareList'].setValue(supplierCareObj);

      this.apiService
        .editSuppliers(
          this.supplier._id,
          this.EditForm.value
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
