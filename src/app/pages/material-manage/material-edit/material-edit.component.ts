import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { ProjectApiService } from '@services/projectapi.service';
import Swal from 'sweetalert2';
import { HelperService } from '@services/helper.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-material-edit',
  templateUrl: './material-edit.component.html',
  styleUrls: ['./material-edit.component.scss']
})
export class MaterialEditComponent implements OnInit {
  @Input() material;
  public result;
  public EditForm: FormGroup;

  fileName1: string;
  fileName2: string;
  fileName3: string;
  formData1 = new FormData;
  formData2 = new FormData;
  formData3 = new FormData;
  loaded: number;
  load_selected: string;


  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService,
    public ProjectApiService: ProjectApiService,
    public helperService: HelperService,

  ) { }

  ngOnInit(): void {
    this.EditForm = new FormGroup({
      materialItem: new FormControl(this.material.materialItem, Validators.required),
      materialName: new FormControl(this.material.materialName, Validators.required),
      projectId: new FormControl(this.material.projectId, Validators.required),

      materialExpectDate: new FormControl(this.material.materialExpectDate, Validators.required),
      materialActualDate: new FormControl(this.material.materialActualDate, Validators.required),
      materialQuantity: new FormControl(this.material.materialQuantity, Validators.required),
      getSampleTest: new FormControl(this.material.getSampleTest),
      haveSample: new FormControl(this.material.haveSample),
      materialCheckDate: new FormControl(this.material.materialCheckDate),
      materialOthers: new FormControl(this.material.materialOthers),
      materialReviewDate: new FormControl(this.material.materialReviewDate),
      pass: new FormControl(this.material.pass),
      materialRemark: new FormControl(this.material.materialRemark),

      supplierFile: new FormControl(this.material.supplierFile, Validators.required),
      coverFile: new FormControl(this.material.coverFile, Validators.required),
      testReport: new FormControl(this.material.testReport, Validators.required),
    });
  }

  fileSelected(e, type) {
    const file: File = e.target.files[0];
    switch (type) {
      case 1:
        if (file) {
          if (file.size > 104857600) {
            this.fileName1 = "";
            Swal.fire({
              title: '檔案不得超過100MB，請重新上傳',
              confirmButtonText: '確定',
              confirmButtonColor: '#17A2B8',
              icon: 'error'
            });
          } else {
            this.fileName1 = file.name;
            var FileExtensionArr = ["pdf"];
            if (FileExtensionArr.indexOf((this.fileName1.split('.')[this.fileName1.split('.').length - 1]).toLowerCase()) > -1) {
              this.formData1.append('url', "supplierFile");
              this.formData1.append('uploadFile', file);
            } else {
              this.fileName1 = "";
              Swal.fire({
                title: '檔案類型不正確!',
                icon: 'error'
              });
            }
            if (this.fileName1 != undefined) {
              this.apiService
                .uploadData1(
                  this.formData1
                ).subscribe({
                  next: (event: any) => {
                    if (event.type === HttpEventType.UploadProgress) {
                      this.load_selected = "supplierFile";
                      this.loaded = Math.round(100 * event.loaded / event.total);
                    } else if (event instanceof HttpResponse) {
                      setTimeout(() => {
                        this.loaded = 0;
                        this.EditForm.controls['supplierFile'].setValue("supplierFile/" + event.body.name);
                        this.helperService.callUpdate("material", null, this.material._id, "supplierFile", "supplierFile/" + event.body.name, "協力廠商資料", "String")
                      }, 200);
                    }
                  },
                  error: (err: any) => {
                    this.loaded = 0;
                    console.log(err);
                  }
                });
            }
          }
        }
        break;
      case 2:
        if (file) {
          if (file.size > 104857600) {
            this.fileName2 = "";
            Swal.fire({
              title: '檔案不得超過100MB，請重新上傳',
              confirmButtonText: '確定',
              confirmButtonColor: '#17A2B8',
              icon: 'error'
            });
          } else {
            this.fileName2 = file.name;
            var FileExtensionArr = ["pdf"];
            if (FileExtensionArr.indexOf((this.fileName2.split('.')[this.fileName2.split('.').length - 1]).toLowerCase()) > -1) {
              this.formData2.append('url', "coverFile");
              this.formData2.append('uploadFile', file);
            } else {
              this.fileName2 = "";
              Swal.fire({
                title: '檔案類型不正確!',
                icon: 'error'
              });
            }

            if (this.fileName2 != undefined) {
              this.apiService
                .uploadData1(
                  this.formData2
                ).subscribe({
                  next: (event: any) => {
                    if (event.type === HttpEventType.UploadProgress) {
                      this.load_selected = "coverFile";
                      this.loaded = Math.round(100 * event.loaded / event.total);
                    } else if (event instanceof HttpResponse) {
                      setTimeout(() => {
                        this.loaded = 0;
                        this.EditForm.controls['coverFile'].setValue("coverFile/" + event.body.name);
                        this.helperService.callUpdate("material", null, this.material._id, "coverFile", "coverFile/" + event.body.name, "型錄", "String")
                      }, 200);
                    }
                  },
                  error: (err: any) => {
                    this.loaded = 0;
                    console.log(err);
                  }
                });
            }
          }
        }
        break;
      case 3:
        if (file) {
          if (file.size > 104857600) {
            this.fileName3 = "";
            Swal.fire({
              title: '檔案不得超過100MB，請重新上傳',
              confirmButtonText: '確定',
              confirmButtonColor: '#17A2B8',
              icon: 'error'
            });
          } else {
            this.fileName3 = file.name;
            var FileExtensionArr = ["pdf"];
            if (FileExtensionArr.indexOf((this.fileName3.split('.')[this.fileName3.split('.').length - 1]).toLowerCase()) > -1) {
              this.formData3.append('url', "testReport");
              this.formData3.append('uploadFile', file);
            } else {
              this.fileName3 = "";
              Swal.fire({
                title: '檔案類型不正確!',
                icon: 'error'
              });
            }

            if (this.fileName3 != undefined) {
              this.apiService
                .uploadData1(
                  this.formData3
                ).subscribe({
                  next: (event: any) => {
                    if (event.type === HttpEventType.UploadProgress) {
                      this.load_selected = "testReport";
                      this.loaded = Math.round(100 * event.loaded / event.total);
                    } else if (event instanceof HttpResponse) {
                      setTimeout(() => {
                        this.loaded = 0;
                        this.EditForm.controls['testReport'].setValue("testReport/" + event.body.name);
                        this.helperService.callUpdate("material", null, this.material._id, "testReport", "testReport/" + event.body.name, "相關試驗報告", "String")
                      }, 200);
                    }
                  },
                  error: (err: any) => {
                    this.loaded = 0;
                    console.log(err);
                  }
                });
            }
          }
        }
        break;
    }
  }

  editMaterial() {
    if (this.EditForm.valid) {
      this.ProjectApiService
        .editMaterial(
          this.EditForm.value,
          this.material._id,

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
        icon: 'error'
      });
    }

  }
}
