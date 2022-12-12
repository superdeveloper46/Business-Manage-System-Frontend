import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-function-module-add',
  templateUrl: './function-module-add.component.html',
  styleUrls: ['./function-module-add.component.scss']
})
export class FunctionModuleAddComponent implements OnInit {
  public result;
  public s2ParentgetfunctionModules: Select2OptionData[];
  ParentgetfunctionModule: String;
  public CreateForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.CreateForm = new FormGroup({
      moduleName: new FormControl('', Validators.required),
      controllerName: new FormControl('/', Validators.required),
      parameter: new FormControl('', Validators.required),
      rootFunctionId: new FormControl(''),
      level: new FormControl('1', Validators.required),
      menuClass: new FormControl(''),
      // sort: new FormControl('0', Validators.required)
    });

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
    this.ParentgetfunctionModule = val;
  }

  addFunctionModule() {
    this.CreateForm.controls['rootFunctionId'].setValue(this.ParentgetfunctionModule);
    if (this.CreateForm.valid) {
      if (this.isJsonString(this.CreateForm.controls['parameter'].value)) {
        this.apiService
          .addFunctionModules(
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
