import { Component, OnInit,Input } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import {FormmngapiService} from '@services/formmngapi.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss']
})
export class FormAddComponent implements OnInit {
  result;
  projectStepId
  // formControlName="projectStepId"
  addNewForm = new FormGroup({
    formCode : new FormControl(''),
    formName : new FormControl(''),
    projectStepId : new FormControl('')
  });
  @Input() projectStepList;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: FormmngapiService
  ) { }
  ngOnInit(): void {
  }
  addFormData() {
    let formdata = {
      formCode:this.addNewForm.get('formCode').value,
      formName:this.addNewForm.get('formName').value,
      projectStepId:this.addNewForm.get('projectStepId').value,
      enable:true
    };
    if(formdata.formCode=='' || formdata.formName == '' || formdata.projectStepId == ''){
      Swal.fire({
        title: "All Input Box should not be empty!",
        icon: 'warning',
        confirmButtonColor: "#17a2b8",
      });
      return;
    }
    this.apiService
        .addFormData(formdata)
        .subscribe((res) => {
            this.result = res as any;
            if (this.result.status == false) {
                Swal.fire({
                    title: this.result.message,
                    icon: 'error'
                });
            } else {
                this.activeModal.close();
            }
        });
  }
}
