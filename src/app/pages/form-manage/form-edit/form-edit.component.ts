import { Component, OnInit,Input } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import {FormmngapiService} from '@services/formmngapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss']
})
export class FormEditComponent implements OnInit {
  result;
  // projectStep : Number;
  @Input() projectStepList;
  @Input() data;
  editNewForm = new FormGroup({
    formCode : new FormControl(''),
    formName : new FormControl(''),
    projectStepId : new FormControl('')
  });
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: FormmngapiService
  ) { }

  ngOnInit(): void {
    this.editNewForm.get('formCode').setValue(this.data.formCode);
    this.editNewForm.get('formName').setValue(this.data.formName);
    this.editNewForm.get('projectStepId').setValue(this.data.projectStepId);
    
  }
  editFormData() {
    this.data.formCode = this.editNewForm.get('formCode').value;
    this.data.formName = this.editNewForm.get('formName').value;
    this.data.projectStepId = this.editNewForm.get('projectStepId').value;
    if(this.data.formCode=='' || this.data.formName == '' || this.data.projectStepId == ''){
      Swal.fire({
        title: "All Input Box should not be empty!",
        icon: 'warning',
        confirmButtonColor: "#17a2b8",
      });
      return;
    }
    this.apiService
        .editFormData(this.data._id,this.data)
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
  }

}
