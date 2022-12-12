import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-modules-edit',
  templateUrl: './job-modules-edit.component.html',
  styleUrls: ['./job-modules-edit.component.scss']
})
export class JobModulesEditComponent implements OnInit {
  public result;
  public Parentgetjobs = new Array();
  public ParentgetfunctionModules = new Array();

  public EditForm: FormGroup;

  @Input() jobModules;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.EditForm = new FormGroup({
      jobId: new FormControl('', Validators.required),
      moduleId: new FormControl('', Validators.required),
      insert: new FormControl(true, Validators.required),
      update: new FormControl(true),
      delete1: new FormControl(true, Validators.required),
      showInMenu: new FormControl(true, Validators.required),
      sort: new FormControl('0', Validators.required),
    });

    this.EditForm.controls['jobId'].setValue(this.jobModules.jobId);
    this.EditForm.controls['moduleId'].setValue(this.jobModules.moduleId);
    this.EditForm.controls['insert'].setValue(this.jobModules.insert);
    this.EditForm.controls['update'].setValue(this.jobModules.update);
    this.EditForm.controls['delete1'].setValue(this.jobModules.delete);
    this.EditForm.controls['showInMenu'].setValue(this.jobModules.showInMenu);
    this.EditForm.controls['sort'].setValue(this.jobModules.sort);

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



  editJobModules() {
    if (this.EditForm.valid) {
    this.apiService
      .editJobModuleses(
        this.jobModules._id,
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
