import { element } from 'protractor';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RightService } from '@services/right.service';
import { ApiService } from '@services/api.service';
import { Subject } from 'rxjs';
import {
  NgbModalConfig,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeDisabledComponent } from './employee-disabled/employee-disabled.component';
import { DataTableDirective } from 'angular-datatables';
import { Select2OptionData } from 'ng-select2';
import { HelperService } from '@services/helper.service';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { throws } from 'assert';
declare var $: any;

@Component({
  selector: 'app-employee-manage',
  templateUrl: './employee-manage.component.html',
  styleUrls: ['./employee-manage.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class EmployeeManageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getRight: any;
  RightObj: {};

  public employees;
  options: any = {
    multiple: true
  };
  QueryLicenseType: string;
  s2LicenseType: Select2OptionData[];

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
  @ViewChild('jstree') jstree: ElementRef;

  public departmentList;
  ngOnInit(): void {
    this.dtOptions = this.helperService.setDtOptions();
    this.RightObj = this.getRight['__zone_symbol__value'];

    this.ddlLicenseType();

    this.getdepartmentList();
    this.reloadData();
    this.getDepartmentTree();

  }


  async reloadData() {

    (await this.apiService.getEmployees()).subscribe((res) => {
      this.employees = res['content'] as any;
      this.employees.forEach((element) => {
        element['LicenseCountObj'] = [];
        var LicenseList = element['licenseList'];
        if (LicenseList != null && LicenseList.length > 0) {
          //Select licenseTypeName and Distinct
          const filtered = LicenseList.reduce((a, o) => (a.push(o.licenseTypeId), a), []);
          var DistinctFiltered = filtered.map(item => item).filter((value, index, self) => self.indexOf(value) === index);

          var LicenseCountObj = [];
          DistinctFiltered.forEach((element2) => {
            if (element2 != null && this.s2LicenseType != null) {
              var LicenseCount = filtered.filter(w => w === element2).length;
              var ddlFilter =this.s2LicenseType.filter(w => w.id == element2);
              LicenseCountObj.push({ "LicenseTypeName": ddlFilter[0]['text'], "Count": LicenseCount });
            }
          })
          element['LicenseCountObj'] = LicenseCountObj;
        }
      })
      this.dtTrigger.next(null);
    });
  }

  async getdepartmentList() {
    (await this.apiService.getDepartments()).subscribe((res) => {
      this.departmentList = res as any;
    });
  }

  getDepartmentTreeList(DepartmentList, id) {
    if (DepartmentList.indexOf(id) == -1) {
      DepartmentList.push(id);
      this.departmentList.forEach((element) => {
        if (element['rootDepartmentId'] == id) {
          this.getDepartmentTreeList(DepartmentList, element['_id']);
        }
      })
    }
  }

  async refreshData(id) {
    $('#jstree').jstree('select_node', id);
    $("#jstree").jstree("open_node", id);

    var DepartmentList = [];
    this.getDepartmentTreeList(DepartmentList, id);

    (await this.apiService.getEmployeesAll('', '', '', this.QueryLicenseType)).subscribe((res) => {
      this.employees = res['content'] as any;
      this.employees = this.employees.filter(d => DepartmentList.indexOf(d.departmentId) > -1);
      this.employees.forEach((element) => {
        element['LicenseCountObj'] = [];
        var LicenseList = element['licenseList'];
        if (LicenseList != null && LicenseList.length > 0) {
          //Select licenseTypeName and Distinct
          const filtered = LicenseList.reduce((a, o) => (a.push(o.licenseTypeId), a), []);
          var DistinctFiltered = filtered.map(item => item).filter((value, index, self) => self.indexOf(value) === index);

          var LicenseCountObj = [];
          DistinctFiltered.forEach((element2) => {
            if (element2 != null) {
              var LicenseCount = filtered.filter(w => w === element2).length;
              var ddlFilter =this.s2LicenseType.filter(w => w.id == element2);
              LicenseCountObj.push({ "LicenseTypeName": ddlFilter[0]['text'], "Count": LicenseCount });
            }
          })
          element['LicenseCountObj'] = LicenseCountObj;
        }
      })
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    });
  }

  async getDepartmentTree() {
    var component = this;
    (await this.apiService.getDepartments()).subscribe((res) => {
      var AllDepartment = res as any;
      var TreeCode = "<ul>";
      AllDepartment.forEach(element => {

        if (element['level'] === 0) {
          var NodeName = element['depCode'] + "-" + element['depName'];
          TreeCode += "<li id='" + element['_id'] + "'  data-jstree='{\"icon\":\"fa fa-object-group\"}'>" + NodeName;
          var ChildObj = AllDepartment.filter((node) => node.rootDepartmentId == element['_id'])
          if (ChildObj.length > 0) {
            var ChildResult = this.ChildCode(AllDepartment, ChildObj, TreeCode);
            TreeCode = ChildResult;
          }
        }
        TreeCode += "</li>";
      })
      TreeCode += " <ul>";

      this.jstree.nativeElement.insertAdjacentHTML('beforeend', TreeCode);

      //初始化jstree
      $(function () {
        $('#jstree').jstree({ "core": { multiple: false } }).on('ready.jstree', function () { $(this).jstree('open_all') });
        $('#jstree').on("changed.jstree", function (e, data) {
          if (data.node !== undefined) {
            $("#selectDepartmentNode").val(data.node.id);
            component.refreshData(data.node.id);
          }
        });
      });
    });
  }

  ChildCode(AllDepartment, ChildObj, TreeCode) {
    ChildObj.forEach(element => {
      TreeCode += "<ul>";
      var NodeName = element['depCode'] + "-" + element['depName'];
      TreeCode += "<li id='" + element['_id'] + "'  data-jstree='{\"icon\":\"fas fa-user\"}'>" + NodeName;
      var ChildObj = AllDepartment.filter((node) => node.rootDepartmentId == element['_id']);
      if (ChildObj.length > 0) {
        var ChildResult = this.ChildCode(AllDepartment, ChildObj, TreeCode);
        TreeCode = ChildResult;
      }
      TreeCode += "</li>";
      TreeCode += "</ul>";
    });
    return TreeCode;
  }

  showAll() {
    $("#jstree").jstree("deselect_all");
    this.refreshData("20221020183346803");
  }


  async ddlLicenseType() {
    let arrLicenseType = [];
    let k = 0;
    (await this.apiService.getLicenseTypes()).subscribe((res) => {
      var AllLicenseType = res as any;
      AllLicenseType.forEach(element => {
        arrLicenseType.push({ id: element['_id'], text: element['licenseTypeName'] });
        k++;
        if (k == AllLicenseType.length) {
          this.s2LicenseType = arrLicenseType;
        }
      });
    });
  }


  onChange_LicenseType(val: string): void {
    if (val != undefined) {
      this.QueryLicenseType = val;
    } else {
      this.QueryLicenseType = "";
    }
  }

  query() {
    $("#jstree").jstree("deselect_all");
    this.refreshData('20221020183346803');
  }

  open(type, employee) {
    if (type == 'add') {
      const modalRef = this.modalService.open(EmployeeAddComponent, { size: 'lg' });
      modalRef.componentInstance.selectDepartmentNode = $("#selectDepartmentNode").val();
      modalRef.closed.subscribe((result) => {
        $("#jstree").jstree("deselect_all");
        this.refreshData(result);
      });
    } else if (type == 'edit') {
      const modalRef = this.modalService.open(EmployeeEditComponent, { size: 'xl' });
      modalRef.componentInstance.employee = employee;
      modalRef.closed.subscribe((result) => {
        $("#jstree").jstree("deselect_all");
        this.refreshData(result);
      });
    } else if (type == 'view') {
      const modalRef = this.modalService.open(EmployeeViewComponent, { size: 'xl' });
      modalRef.componentInstance.employee = employee;
      modalRef.closed.subscribe((result) => {
        $("#jstree").jstree("deselect_all");
      });
    }
    // else if (type == 'delete') {
    //   Swal.fire({
    //     title: '確定要刪除員工?',
    //     showConfirmButton: true,
    //     showCancelButton: true,
    //     confirmButtonText: '確定',
    //     cancelButtonText: '取消',
    //     icon: 'question'
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       var idArr = employee['_links']['self']['href'].split('/');
    //       var id = idArr[idArr.length - 1];
    //       this.apiService.deleteEmployees(id).subscribe((res) => {
    //         this.refreshData($("#selectDepartmentNode").val());
    //       });
    //     }
    //   });
    // }
    else if (type == 'disabled') {

      const modalRef = this.modalService.open(EmployeeDisabledComponent, { size: 'sm' });
      modalRef.componentInstance.employee = employee;
      modalRef.closed.subscribe((result) => {
        $("#jstree").jstree("deselect_all");
        this.refreshData(employee.departmentId);
      });
    }
  }
}
