import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormTaskProcessApiService } from '@services/form-task-process-api.service';
import Swal from 'sweetalert2';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-scope-description',
  templateUrl: './scope-description.component.html',
  styleUrls: ['./scope-description.component.scss']
})
export class ScopeDescriptionComponent implements OnInit {

  @Input() scope;
  @Input() formTaskId;
  @Input() engineeringScope;
  @Input() actions;

  selectedScope: any;
  htmlCode: any;
  result: any;
  createForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: FormTaskProcessApiService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      htmlCode: new FormControl('', Validators.required),
    });

    this.htmlCode = this.engineeringScope;
    if(!this.htmlCode || this.htmlCode == null){
      this.createForm.get("htmlCode").setValue(this.scope[0]?.htmlCode);
    }else{
      this.createForm.get("htmlCode").setValue(this.htmlCode);
    }

    this.config.editable = this.actions.allowEdit;
  }

  valueChanged(val: String){
    this.selectedScope = val;
    this.createForm.get("htmlCode").setValue(this.scope.filter((item)=>item._id == this.selectedScope)[0]?.htmlCode);
  }

  saveScopeDescription(){
    if (!this.createForm.valid) {
      return;
    }

    let formData = {
      scopeDescription: this.createForm.get('htmlCode').value,
      formTaskId: this.formTaskId
    }
    this.apiService.addScopeDescription(formData)
        .subscribe((res) => {
            this.result = res as any;
            if (this.result.status == false) {
              Swal.fire({
                  title: this.result.message,
                  icon: 'error'
              });
            } else {
              this.toastr.success("The data is saved succesfully");
              this.activeModal.close();
            }
        });
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: '輸入說明內容...',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    sanitize: false,
  };


}
