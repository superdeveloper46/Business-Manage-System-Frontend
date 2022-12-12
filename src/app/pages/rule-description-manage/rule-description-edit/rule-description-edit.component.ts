import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-rule-description-edit',
  templateUrl: './rule-description-edit.component.html',
  styleUrls: ['./rule-description-edit.component.scss']
})
export class RuleDescriptionEditComponent implements OnInit {
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

  @Input() ruleDescription;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.EditForm = new FormGroup({
      ruleDescriptionTitle: new FormControl('', Validators.required),
      // fileUrl: new FormControl('', Validators.required),
      htmlCode: new FormControl(''),
    });

    this.EditForm.controls['ruleDescriptionTitle'].setValue(this.ruleDescription.ruleDescriptionTitle);
    this.EditForm.controls['htmlCode'].setValue(this.ruleDescription.htmlCode);
    // this.EditForm.controls['fileUrl'].setValue(this.ruleDescription.fileUrl);
    // this.fileName = this.ruleDescription.fileUrl;
  }

  // fileSelected(e) {
  //   const file: File = e.target.files[0];
  //   if (file) {
  //     this.fileName = file.name;
  //     var FileExtensionArr = ["docx", "doc"];
  //     if (FileExtensionArr.indexOf((this.fileName.split('.')[this.fileName.split('.').length - 1]).toLowerCase()) > -1) {
  //       this.formData.append('url', "RuleDescription");
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

  editRuleDescription() {
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
    //       this.EditForm.controls['fileUrl'].setValue("RuleDescription/" + res["name"]);
    //       this.sendForm();
    //     })
    // }else{
    //   this.sendForm();
    // }

    this.sendForm();
  }

  sendForm(){
    if (this.EditForm.valid) {
      this.apiService
        .editRuleDescriptions(
          this.ruleDescription._id,
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
