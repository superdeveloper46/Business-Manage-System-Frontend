import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Select2OptionData } from 'ng-select2';
import { ProjectApiService } from '@services/projectapi.service';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-related-personnel-card',
  templateUrl: './related-personnel-card.component.html',
  styleUrls: ['./related-personnel-card.component.scss']
})
export class RelatedPersonnelCardComponent implements OnInit {
  @Input() k;
  @Input() id;
  @Input() projectId;
  @Input() RelatedPersonnelList_employees

  s2Situations: Select2OptionData[];
  RelatedPersonnelList_situation = new Array<String>;
  s2Departments: Select2OptionData[];
  RelatedPersonnelList_department = new Array<String>;
  s2Employees = new Array<Select2OptionData[]>;
  // RelatedPersonnelList_employees = new Array<String>;
  s2Employees2 = new Array<Select2OptionData[]>;
  RelatedPersonnelList_employees2 = new Array<String>;

  constructor(
    public apiService: ApiService,
    public ProjectApiService: ProjectApiService,
    public helperService: HelperService,

  ) {
  }


  ngOnInit(): void {
    this.RelatedPersonnelList_employees.push({
      _id: this.id,
      situationId: '',
      employeeId: '',
      rootEmployeeId: '',
    })
    this.ddlDepartment();
    this.ddlSituation();
  }


  async ddlSituation() {
    let arrSituations = [];
    let k = 0;
    (await this.apiService.getSituations()).subscribe((res) => {
      var AllSituations = res as any;
      AllSituations.forEach(element => {
        arrSituations.push({ id: element._id, text: element.situationName });
        k++;
        if (k == AllSituations.length) {
          this.s2Situations = arrSituations;
        }
      });
    });
  }

  async ddlDepartment() {
    let arrDepartments = [];
    let k = 0;
    (await this.apiService.getDepartments()).subscribe((res) => {
      var AllDepartments = res as any;
      AllDepartments.forEach(element => {
        arrDepartments.push({ id: element._id, text: element.depName });
        k++;
        if (k == AllDepartments.length) {
          this.s2Departments = arrDepartments;
        }
      });
    });
  }

  async ddlEmployees(depId, index) {
    let arrEmployees = [];
    let k = 0;
    (await this.apiService.getEmployeesByDepartment(depId)).subscribe((res) => {
      var AllEmployees = res as any;
      AllEmployees.forEach(element => {
        arrEmployees.push({ id: element._id, text: element.empName });
        k++;
        if (k == AllEmployees.length) {
          this.s2Employees[index] = arrEmployees;
        }
      });
    });
  }


  async ddlEmployees2(index) {
    var myEmpId = this.RelatedPersonnelList_employees[index];
    let arrEmployees = [];
    let k = 0;

    this.RelatedPersonnelList_employees.filter(w => w != myEmpId).forEach(element => {
      (this.apiService.getEmployee(element)).subscribe((res) => {
        var Employee = (res as any);
        if (Employee != null) {
          arrEmployees.push({ id: element, text: Employee.empName });

          k++;
          if (k == this.RelatedPersonnelList_employees.length - 1) {
            this.s2Employees2[index] = arrEmployees;
          }
        }
      })


    })
  }

  onChange_Situations(val: String, k, subdocId): void {
    if (val == null) val = "";
    if (val != undefined && this.RelatedPersonnelList_situation[k] != val) {
      var whereObj = [{ key: "_id", value: this.projectId, subdocName: "" }, { key: "_id", value: subdocId, subdocName: "employeeList" }]
      this.helperService.callUpdate("project", whereObj, this.projectId, "situationId", val, "相關人員" + (k + 1) + ":職稱", "String")
    }
  }

  onChange_Departments(val: String, k): void {
    if (val == null) val = "";
    if (val != "") {
      this.ddlEmployees(val, k);
    }
  }


  onChange_Employees(val: String, k, subdocId): void {
    if (val == null) val = "";
    if (val != undefined && this.RelatedPersonnelList_employees[k] != val) {
      var whereObj = [{ key: "_id", value: this.projectId, subdocName: "" }, { key: "_id", value: subdocId, subdocName: "employeeList" }]
      this.helperService.callUpdate("project", whereObj, this.projectId, "employeeId", val, "相關人員" + (k + 1) + ":人員", "String")
      this.ddlEmployees2(k);
    }
  }

  onChange_Employees2(val: String, k, subdocId): void {
    if (val == null) val = "";
    if (val != undefined && this.RelatedPersonnelList_employees2[k] != val) {
      var whereObj = [{ key: "_id", value: this.projectId, subdocName: "" }, { key: "_id", value: subdocId, subdocName: "employeeList" }]
      this.helperService.callUpdate("project", whereObj, this.projectId, "rootEmployeeId", val, "相關人員" + (k + 1) + ":上層主管", "String")
    }
  }



  del(index) {
    $("#r_" + index).hide();
    (this.helperService.DelDataByColumn("project", this.projectId, "employeeList",this.id)).subscribe((res) => { });
    this.RelatedPersonnelList_employees = this.RelatedPersonnelList_employees.filter(w => w !== this.id);
  }
}
