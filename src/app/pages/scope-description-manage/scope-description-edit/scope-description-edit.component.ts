import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-scope-description-edit',
  templateUrl: './scope-description-edit.component.html',
  styleUrls: ['./scope-description-edit.component.scss']
})
export class ScopeDescriptionEditComponent implements OnInit {
  public result;
  public EditForm: FormGroup;
  // fileName: string;
  // formData = new FormData();

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

  @Input() scopeDescription;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.EditForm = new FormGroup({
      scopeDescriptionTitle: new FormControl('', Validators.required),
      // fileUrl: new FormControl('', Validators.required),
      htmlCode: new FormControl(''),
    });
    this.EditForm.controls['scopeDescriptionTitle'].setValue(this.scopeDescription.scopeDescriptionTitle);
    this.EditForm.controls['htmlCode'].setValue(this.scopeDescription.htmlCode);

    // this.EditForm.controls['fileUrl'].setValue(this.scopeDescription.fileUrl);
    // this.fileName = this.scopeDescription.fileUrl;
  }

  // fileSelected(e) {
  //   const file: File = e.target.files[0];
  //   if (file) {
  //     this.fileName = file.name;
  //     var FileExtensionArr = ["docx", "doc"];
  //     if (FileExtensionArr.indexOf((this.fileName.split('.')[this.fileName.split('.').length - 1]).toLowerCase()) > -1) {
  //       this.formData.append('url', "ScopeDescription");
  //       this.formData.append('uploadFile', file);
  //     } else {
  //       this.fileName = "";
  //       Swal.fire({
  //         title: '檔案類型不正確!',
  //         icon: 'error'
  //       });
  //     }
  //   }
  // }

  editScopeDescription() {
    // if (this.fileName != undefined && this.fileName != this.EditForm.controls['fileUrl'].value) {
    //   this.apiService
    //     .uploadData(
    //       this.formData
    //     )
    //     .subscribe((res) => {
    //       this.result = res as any;
    //       if (this.result.result_status == false) {
    //         Swal.fire({
    //           title: this.result.result_message,
    //           icon: 'error'
    //         });
    //       }
    //       this.EditForm.controls['fileUrl'].setValue("ScopeDescription/" + res["name"]);

    //     })
    // }else{
    //   this.sendForm();
    // }

    this.sendForm();
  }

  sendForm(){
    if (this.EditForm.valid) {
      this.apiService
        .editScopeDescriptions(
          this.scopeDescription._id,
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
