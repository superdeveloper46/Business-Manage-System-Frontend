import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {
  public result;
  public CreateForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  options: any = {
    multiple: true
  };

  s2Locations: Select2OptionData[];
  s2Areas: Select2OptionData[];
  LocationObj = [];
  locationAreaList_locationName: String;
  locationAreaList_areaName: String[];

  DepartmentObj = [];
  EmployeeObj = [];
  s2Department1: Select2OptionData[];
  s2Department2: Select2OptionData[];
  s2Department3: Select2OptionData[];
  s2Employee1: Select2OptionData[];
  s2Employee2: Select2OptionData[];
  s2Employee3: Select2OptionData[];
  Department1: String;
  Department2: String;
  Department3: String;

  ngOnInit(): void {
    this.CreateForm = new FormGroup({
      formControlName: new FormControl('', Validators.required),
      projectShortName: new FormControl('', Validators.required),
      projectGovNo: new FormControl('', Validators.required),
      bidAmount: new FormControl('', Validators.required),
      locationAreaList: new FormControl(null, Validators.required),
      beginDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      projectManagerId: new FormControl('', Validators.required),
      engineerManagerId: new FormControl('', Validators.required),
      purchaseManagerId: new FormControl('', Validators.required)
    });

    this.ddlLocations();
    this.ddlDepartment();
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
      this.locationAreaList_locationName = '';
    })
  }


  async ddlAreas(locationId) {
    let arrAreas = [];
    let k = 0;
    var filterLocation = this.LocationObj.filter(s => s.id == locationId);
    if (filterLocation.length == 1) {
      var AllAreas = filterLocation[0]['areaNameList'];
      AllAreas.forEach(element => {
        arrAreas.push({ id: element, text: element });
        k++;
        if (k == AllAreas.length) {
          this.s2Areas = arrAreas;
        }
      });
    }
  }

  async ddlDepartment() {
    let arrDepartments = [];
    let k = 0;
    (await this.apiService.getDepartments()).subscribe((res) => {
      this.DepartmentObj = res as any;
      this.DepartmentObj.forEach((element, index) => {
        this.DepartmentObj[index]['id'] = element['_id'];
        arrDepartments.push({ id: element['_id'], text: element['depName'] });
        k++;
        if (k == this.DepartmentObj.length) {
          this.s2Department1 = arrDepartments;
          this.s2Department2 = arrDepartments;
          this.s2Department3 = arrDepartments;
        }
      });
    })
  }


  async ddlEmployees(depId, s) {
    let arrEmployees = [];
    let k = 0;
    (await this.apiService.getEmployees()).subscribe((res) => {
      this.EmployeeObj = (res['content'] as any).filter(w => !w.lock);
      this.EmployeeObj = this.EmployeeObj.filter(s => s.departmentId == depId);
      if(this.EmployeeObj.length == 0)
        {
          switch (s) {
            case 1:
              this.s2Employee1 = [];
              break;
            case 2:
              this.s2Employee2 = [];
              break;
            case 3:
              this.s2Employee3 = [];
              break;
          }
        }
      this.EmployeeObj.forEach((element, index) => {
        this.EmployeeObj[index]['id'] = element['_id'];
        arrEmployees.push({ id: element['_id'], text: element['empName'] });
        k++;
        if (k == this.EmployeeObj.length) {
          switch (s) {
            case 1:
              this.s2Employee1 = arrEmployees;
              break;
            case 2:
              this.s2Employee2 = arrEmployees;
              break;
            case 3:
              this.s2Employee3 = arrEmployees;
              break;
          }
        }

      });
    })
  }

  onChange_Locations(val: String): void {
    this.locationAreaList_locationName = val;
    if (val != undefined) {
      this.ddlAreas(val);
    }
  }


  onChange_Areas(val: []): void {
    this.locationAreaList_areaName = val;
  }

  onChange_Departments(val: String, s): void {
    switch (s) {
      case 1:
        this.Department1 = val;
        break;
      case 2:
        this.Department2 = val;
        break;
      case 3:
        this.Department3 = val;
        break;
    }

    if (val != undefined) {
      this.ddlEmployees(val, s);
    }
  }

  onChange_Employees(val: String, s): void {
    switch (s) {
      case 1:
        this.CreateForm.controls['projectManagerId'].setValue(val);
        break;
      case 2:
        this.CreateForm.controls['engineerManagerId'].setValue(val);
        break;
      case 3:
        this.CreateForm.controls['purchaseManagerId'].setValue(val);
        break;
    }
  }

  addProject() {
    var locationAreaListObj = { locationName: this.locationAreaList_locationName, areaName: this.locationAreaList_areaName };
    this.CreateForm.controls['locationAreaList'].setValue(locationAreaListObj);
    //   if (this.CreateForm.valid) {
    //     this.apiService
    //         .addProjects(
    //           this.CreateForm.value
    //         )
    //         .subscribe((res) => {
    //             this.result = res as any;
    //             if (this.result.result_status == false) {
    //                 Swal.fire({
    //                     title: this.result.result_message,
    //                     icon: 'error'
    //                 });
    //             } else {
    //                 this.activeModal.close();
    //             }
    //         });
    //       } else {
    //         Swal.fire({
    //           title: '請填寫必填欄位',
    //           icon: 'error'
    //         });
    //       }
  }
}
