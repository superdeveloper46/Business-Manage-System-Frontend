import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-step-edit',
  templateUrl: './project-step-edit.component.html',
  styleUrls: ['./project-step-edit.component.scss']
})
export class ProjectStepEditComponent implements OnInit {
  public result;
  public EditForm: FormGroup;

  @Input() projectStep;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.EditForm = new FormGroup({
      stepNo: new FormControl('0', Validators.required),
      stepName: new FormControl('', Validators.required),
      stepClass: new FormControl(''),
    });
    this.EditForm.controls['stepNo'].setValue(this.projectStep.stepNo);
    this.EditForm.controls['stepName'].setValue(this.projectStep.stepName);
    this.EditForm.controls['stepClass'].setValue(this.projectStep.stepClass);
  }

  editProjectStep() {
    if (this.EditForm.valid) {
      this.apiService
        .editProjectSteps(
          this.projectStep._id,
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
