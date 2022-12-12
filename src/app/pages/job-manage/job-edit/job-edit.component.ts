import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss']
})
export class JobEditComponent implements OnInit {
  public result;
  public EditForm: FormGroup;
  public modulesv = [];
  options: any = {
    multiple: true
  };

  @Input() job;
  s2JobModules: Select2OptionData[];

  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.EditForm = new FormGroup({
      jobName: new FormControl('', Validators.required),
      jobCode: new FormControl('', Validators.required),
      rank: new FormControl('0', Validators.required),
      //modules: new FormControl('')
    });

    this.EditForm.controls['jobName'].setValue(this.job.jobName);
    this.EditForm.controls['jobCode'].setValue(this.job.jobCode);
    this.EditForm.controls['rank'].setValue(this.job.rank);
    // if (this.job.modules != null) {
    //   this.EditForm.controls['modules'].setValue(this.job.modules.map(String));
    //   this.modulesv = this.job.modules.map(String);
    // }
   // this.ddlJobModules();
  }

  // async ddlJobModules() {
  //   let arrJobModules = [];
  //   let k = 0;
  //   (await this.apiService.getJobModuleses()).subscribe((res) => {
  //     var AllJobModules = res as any;

  //     AllJobModules.forEach(element => {
  //       k++;
  //       if(element.moduleName != ""){
  //       arrJobModules.push({ id: element._id, text: element.moduleName });
  //       if (k == AllJobModules.length) {
  //         this.s2JobModules = arrJobModules;
  //       }
  //     }
  //     });

  //   });
  // }


  onChange_Modules(val: []): void {
    this.EditForm.controls['modules'].setValue(val);
  }

  editJob() {
    // if (this.EditForm.controls['modules'].value == "") {
    //   this.EditForm.controls['modules'].setValue([]);
    // }
    if (this.EditForm.valid) {
      this.apiService
        .editJobs(
          this.job._id,
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
