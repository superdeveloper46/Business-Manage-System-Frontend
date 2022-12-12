import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-scope-description-add',
  templateUrl: './scope-description-add.component.html',
  styleUrls: ['./scope-description-add.component.scss']
})
export class ScopeDescriptionAddComponent implements OnInit {
  public result;
  public CreateForm: FormGroup;
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

  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.CreateForm = new FormGroup({
      scopeDescriptionTitle: new FormControl('', Validators.required),
      // fileUrl: new FormControl('', Validators.required),
      htmlCode: new FormControl(''),
    });
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

  addScopeDescription() {
    // if (this.fileName != undefined) {
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
    //       } else {
    //         this.CreateForm.controls['fileUrl'].setValue("ScopeDescription/" + res["name"]);

    //       }
    //     });
    // }else{
    //   Swal.fire({
    //     title: '請上傳檔案',
    //     icon: 'error'
    //   });
    // }
    if (this.CreateForm.valid) {
      this.apiService
        .addScopeDescriptions(
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
