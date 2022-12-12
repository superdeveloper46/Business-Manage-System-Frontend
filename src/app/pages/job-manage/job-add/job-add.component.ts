import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.scss']
})
export class JobAddComponent implements OnInit {
  public result;
  public CreateForm: FormGroup;
  options: any = {
    multiple: true
  };

  s2JobModules: Select2OptionData[];

  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {

    this.CreateForm = new FormGroup({
      jobName: new FormControl('', Validators.required),
      jobCode: new FormControl('', Validators.required),
      rank: new FormControl('0', Validators.required),
      // modules: new FormControl('')
    });

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


  // onChange_Modules(val: FormControl): void {
  //   this.CreateForm.controls['modules'].setValue(val);
  // }

  addJob() {
    if (this.CreateForm.valid) {
      this.apiService
        .addJobs(
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
