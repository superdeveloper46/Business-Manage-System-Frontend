import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import { Select2OptionData } from 'ng-select2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-function-module-edit',
  templateUrl: './function-module-edit.component.html',
  styleUrls: ['./function-module-edit.component.scss']
})
export class FunctionModuleEditComponent implements OnInit {
  public result;
  public s2ParentgetfunctionModules: Select2OptionData[];
  ParentgetfunctionModule: String;
  public EditForm: FormGroup;

  @Input() functionModule;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.EditForm = new FormGroup({
      moduleName: new FormControl('', Validators.required),
      controllerName: new FormControl('/', Validators.required),
      parameter: new FormControl('', Validators.required),
      rootFunctionId: new FormControl(''),
      level: new FormControl('1', Validators.required),
      menuClass: new FormControl(''),
      // sort: new FormControl('0', Validators.required)
    });

    this.EditForm.controls['moduleName'].setValue(this.functionModule.moduleName);
    this.EditForm.controls['controllerName'].setValue(this.functionModule.controllerName);
    this.EditForm.controls['parameter'].setValue(JSON.stringify(this.functionModule.parameter));
    this.EditForm.controls['rootFunctionId'].setValue(this.functionModule.rootFunctionId);
    this.ParentgetfunctionModule = this.functionModule.rootFunctionId;
    this.EditForm.controls['level'].setValue(this.functionModule.level);
    this.EditForm.controls['menuClass'].setValue(this.functionModule.menuClass);
    // this.EditForm.controls['sort'].setValue(this.functionModule.sort);

    this.ddlFunctionModules();
  }

  async ddlFunctionModules() {
    let arrParentgetfunctionModules = [];
    let k = 0;
    (await this.apiService.getFunctionModules()).subscribe((res) => {
      var AllfunctionModules = res as any;
      AllfunctionModules.forEach(element => {
        k++;
        if (element['level'] == 1) {
          arrParentgetfunctionModules.push({ id: element._id, text: element.moduleName });
        }
        if (k == AllfunctionModules.length) {
          this.s2ParentgetfunctionModules = arrParentgetfunctionModules;
        }
      });
    });
  }


  onChange_ParentgetfunctionModules(val: String): void {
    if(val == null) val="";
    this.ParentgetfunctionModule = val;
  }


  editFunctionModule() {
    this.EditForm.controls['rootFunctionId'].setValue(this.ParentgetfunctionModule);
    if (this.EditForm.valid) {

      if (this.isJsonString(this.EditForm.controls['parameter'].value)) {
        this.apiService
          .editFunctionModules(
            this.functionModule._id,
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
          title: 'JSON格式錯誤!',
          confirmButtonText: '確定',
          confirmButtonColor: '#17A2B8',
          icon: 'error'
        });
      }
    } else {
      Swal.fire({
        title: '請填寫必填欄位',
        confirmButtonText: '確定',
        confirmButtonColor: '#17A2B8',
        icon: 'error'
      });
    }
  }

  isJsonString(str) {
    try {
      var o = JSON.parse(str);
      if (o && typeof o === "object") {
        return o;
      }
    }
    catch (e) { return false; }
  }
}
