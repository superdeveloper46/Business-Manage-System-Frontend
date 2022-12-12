import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-modules-add',
  templateUrl: './job-modules-add.component.html',
  styleUrls: ['./job-modules-add.component.scss'],

})
export class JobModulesAddComponent implements OnInit {
  public result;
  public Parentgetjobs = new Array();
  public ParentgetfunctionModules = new Array();

  public CreateForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.CreateForm = new FormGroup({
      jobId: new FormControl('', Validators.required),
      moduleId: new FormControl('', Validators.required),
      insert: new FormControl(true, Validators.required),
      update: new FormControl(true),
      delete1: new FormControl(true, Validators.required),
      showInMenu: new FormControl(true, Validators.required),
      sort: new FormControl('0', Validators.required),
    });

    this.ddlJobs();
    this.ddlModules();
  }

  async ddlJobs() {
    (await this.apiService.getJobs()).subscribe((res) => {
      var Alljobs = res as any;
      Alljobs.forEach(element => {
        this.Parentgetjobs.push({ id: element._id, name: element.jobName });
      });
    });
  }

  async ddlModules() {
    (await this.apiService.getFunctionModules()).subscribe((res) => {
      var AllfunctionModules = res as any;
      AllfunctionModules.forEach(element => {
        var  moduleName = "";
        if(element.rootFunctionName != ""){
          moduleName = element.rootFunctionName + "-" + element.moduleName;
        }else{
          moduleName =element.moduleName;
        }
        this.ParentgetfunctionModules.push({ id: element._id, name: moduleName});
        this.ParentgetfunctionModules.sort((a, b) => a.name.localeCompare(b.name))
      });
    });
  }


  addJobModules(s) {
    if (this.CreateForm.valid) {
    this.apiService
      .addJobModuleses(
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
          this.activeModal.close(s);
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
