import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormtaskapiService } from '@services/formtaskapi.service';
import { FormTaskProcessApiService } from '@services/form-task-process-api.service';
import { ApiService } from '@services/api.service';
import { Subject, tap } from 'rxjs';
import { RightService } from '@services/right.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';

import { ScopeDescriptionComponent } from './scope-description/scope-description.component';
import { RuleDescriptionComponent } from './rule-description/rule-description.component';
import { InquiryDetailAddComponent } from './inquiry-detail-add/inquiry-detail-add.component';
import { ContractAddComponent } from './contract-add/contract-add.component';
import { __classPrivateFieldGet } from 'tslib';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-purchase-form-process',
  templateUrl: './purchase-form-process.component.html',
  styleUrls: ['./purchase-form-process.component.scss']
})
export class PurchaseFormProcessComponent implements OnInit {
  @Input() parentComp
  @Input() detailData
  @Input() formAndProjectData
  @Input() contractTypes
  @Input() scope
  @Input() rule

  @Input() formTaskId;
  @Input() taskStatusId;
  @Input() component;
  @Input() dtOptions;
  @Input() sectionRight;

  @Output() loadBasicData = new EventEmitter<object>();
  @Output() setInitComponent = new EventEmitter<object>();

  dtTrigger_pcces: Subject<any> = new Subject<any>();
  dtTrigger_inquiry: Subject<any> = new Subject<any>();
  illustration: any;
  calculation: any;

  formData = new FormData();

  result: any;
  remark: any;
  pccesData: any = [];
  inquiryData: any = [];
  quotation: string;

  loaded: any = 0;
  load_selected: any = 0;
  detail: any = "";

  constructor(
    public task_apiService: FormtaskapiService,
    public apiService: FormTaskProcessApiService,
    public master_apiService: ApiService,
    public rightService: RightService,
    public helperService: HelperService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
  }

  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;


  ngOnInit(): void {

    this.reloadFormTaskDetailData();
    this.loadBasicData.emit();
  }

  async reloadFormTaskDetailData() {
    (await this.apiService.getFormTaskDetailData(this.formTaskId, this.taskStatusId)).subscribe((res) => {
      this.detailData = res;
      this.setInitComponent.emit({ detailData: this.detailData });
      this.illustration = this.detailData?.formTaskContent?.purchaseForm?.illustration;
      this.calculation = this.detailData?.formTaskContent?.purchaseForm?.calculation;
      this.remark = this.detailData?.formTaskContent?.purchaseForm?.remark;
      this.pccesData = this.detailData?.formTaskContent?.purchaseForm?.pccesDataList;
      this.inquiryData = this.detailData?.formTaskContent?.purchaseForm?.inquiryDataList;
      setTimeout(() => {
        this.dtTrigger_pcces.next(null);
        this.dtTrigger_inquiry.next(null);
      }, 100);
    });
  }

  async refreshFormTaskDetailData() {
    (await this.apiService.getFormTaskDetailData(this.formTaskId, this.taskStatusId)).subscribe((res) => {
      this.detailData = res;
      this.setInitComponent.emit();
      this.illustration = this.detailData?.formTaskContent?.purchaseForm?.illustration;
      this.calculation = this.detailData?.formTaskContent?.purchaseForm?.calculation;
      this.remark = this.detailData?.formTaskContent?.purchaseForm?.remark;
      this.pccesData = this.detailData?.formTaskContent?.purchaseForm?.pccesDataList;
      this.inquiryData = this.detailData?.formTaskContent?.purchaseForm?.inquiryDataList;
      this.dtElements.forEach((dtElement: DataTableDirective) => {
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          dtElement.dtTrigger.next(null);
        });
      });
    });
  }

  illustrationFileSelected(e) {
    const file: File = e.target.files[0];
    if (file) {
      this.illustration = file.name;
      var FileExtensionArr = ["pdf"];
      if (FileExtensionArr.indexOf((this.illustration.split('.')[this.illustration.split('.').length - 1]).toLowerCase()) > -1) {
        var FileExtensionArr = ["pdf"];
        this.formData.delete("url");
        this.formData.delete("uploadFile");
        this.formData.append('url', "formTask_illustration");
        this.formData.append('uploadFile', file);

        this.apiService
          .uploadData(
            this.formData
          )
          .subscribe({
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.load_selected = "illustration";
                this.loaded = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                setTimeout(() => {
                  this.loaded = 0;
                }, 200);

                let formData = {
                  illustration: event.body.name,
                  formTaskId: this.formTaskId
                }
                this.apiService.addIllustration(formData)
                  .subscribe((res1) => {
                    this.result = res1 as any;
                    if (this.result.status == false) {
                      Swal.fire({
                        title: this.result.message,
                        icon: 'error'
                      });
                    } else {
                      this.toastr.success("The data is saved succesfully");
                      this.illustration = event.body.name;
                    }
                  });
              }
            },
            error: (err: any) => {

              this.loaded = 0;
              console.log(err);
            }
          });
      }
    }
    else {
      this.illustration = "";
      Swal.fire({
        title: '檔案類型不正確!',
        icon: 'error'
      });
    }
  }


  calculationFileSelected(e) {
    const file: File = e.target.files[0];
    if (file) {
      this.calculation = file.name;
      var FileExtensionArr = ["pdf"];
      if (FileExtensionArr.indexOf((this.calculation.split('.')[this.calculation.split('.').length - 1]).toLowerCase()) > -1) {
        this.formData.delete("url");
        this.formData.delete("uploadFile");
        this.formData.append('url', "formTask_calculation");
        this.formData.append('uploadFile', file);

        this.apiService
          .uploadData(
            this.formData
          )
          .subscribe({

            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.load_selected = "calculation";
                this.loaded = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {

                setTimeout(() => {
                  this.loaded = 0;
                }, 200);

                let formData = {
                  calculation: event.body.name,
                  formTaskId: this.formTaskId
                }
                this.apiService.addCalculation(formData)
                  .subscribe((res1) => {
                    this.result = res1 as any;
                    if (this.result.status == false) {
                      Swal.fire({
                        title: this.result.message,
                        icon: 'error'
                      });
                    } else {
                      this.toastr.success("The data is saved succesfully");
                      this.calculation = event.body.name;
                    }
                  });
              }
            },
            error: (err: any) => {
              this.loaded = 0;
              console.log(err);
            }
          });

      } else {
        this.calculation = "";
        Swal.fire({
          title: '檔案類型不正確!',
          icon: 'error'
        });
      }
    }
  }

  remarkChange(event) {
    const value = (event.target as any).value;
    this.remark = value;
  }

  addRemark() {
    let formData = {
      remark: this.remark,
      formTaskId: this.formTaskId
    }
    this.apiService.addRemark(formData)
      .subscribe((res) => {
        this.result = res as any;
        if (this.result.status == false) {
          Swal.fire({
            title: this.result.message,
            icon: 'error'
          });
        } else {
          this.toastr.success("The data is saved succesfully");
        }
      });
  }

  deletePccesData(id: any) {
    let formData = {
      id: id,
      formTaskId: this.formTaskId
    }
    this.apiService.deletePccesData(formData)
      .subscribe((res) => {
        this.result = res as any;
        if (this.result.status == false) {
          Swal.fire({
            title: this.result.message,
            icon: 'error'
          });
        } else {
          this.toastr.success("Successfully Deleted!");
          this.refreshFormTaskDetailData();
        }
      });
  }

  quantityChange(event, id) {
    var value = event.target.value;
    let formData = {
      quantity: value,
      formTaskId: this.formTaskId,
      id: id
    }
    this.apiService.updatePccesDataQuantity(formData)
      .subscribe((res) => {
        this.result = res as any;
        if (this.result.status == false) {
          Swal.fire({
            title: this.result.message,
            icon: 'error'
          });
        } else {
          this.toastr.success("The data is saved succesfully");
        }
      });

  }

  deleteInquiryData(id: any) {
    let formData = {
      id: id,
      formTaskId: this.formTaskId
    }
    this.apiService.deleteInquiryData(formData)
      .subscribe((res) => {
        this.result = res as any;
        if (this.result.status == false) {
          Swal.fire({
            title: this.result.message,
            icon: 'error'
          });
        } else {
          this.toastr.success("Successfully Deleted!");
          this.refreshFormTaskDetailData();
        }
      });
  }

  quotationUpload(e, _id) {
    const file: File = e.target.files[0];
    if (file) {
      this.quotation = file.name;
      var FileExtensionArr = ["pdf"];
      if (FileExtensionArr.indexOf((this.quotation.split('.')[this.quotation.split('.').length - 1]).toLowerCase()) > -1) {
        this.formData.delete("url");
        this.formData.delete("uploadFile");
        this.formData.append('url', "formTask_inquiry_quotation");
        this.formData.append('uploadFile', file);

        this.apiService
          .uploadData(
            this.formData
          )
          .subscribe({
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.load_selected = "quotation";
                this.loaded = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {

                setTimeout(() => {
                  this.loaded = 0;
                }, 200);

                let formData = {
                  quotation: event.body.name,
                  formTaskId: this.formTaskId,
                  inquiryDataId: _id
                }
                this.apiService.addInquiryQuotation(formData)
                  .subscribe((res1) => {
                    this.result = res1 as any;
                    if (this.result.status == false) {
                      Swal.fire({
                        title: this.result.message,
                        icon: 'error'
                      });
                    } else {
                      this.quotation = event.body.name;
                      this.toastr.success("The data is saved succesfully");
                    }
                  });
              }
            },
            error: (err: any) => {
              this.loaded = 0;
              console.log(err);
            }
          });

      } else {
        this.quotation = "";
        Swal.fire({
          title: '檔案類型不正確!',
          icon: 'error'
        });
      }
    }
  }

  viewPdf(url) {
    this.master_apiService.download(url).subscribe((res) => {
      var blob = new Blob([res], { type: 'application/pdf' });
      window.open(window.URL.createObjectURL(blob), "_blank");
    },
      (err) => {
        Swal.fire({
          title: '系統找不到指定的檔案',
          icon: 'error'
        });
      });
  }

  choosePriority(event, value, id){
    console.log(event);
    let checked  = event.target.checked
    console.log(checked);
    for(var i=0; i<this.inquiryData.length; i++){
      if(this.inquiryData[i].choosePriority == value && checked){
        event.preventDefault();
        return;
      }
    }
    if (!checked) {
      value = "0"
    }
    let formData = {
      priority: value,
      formTaskId: this.formTaskId,
      inquiryDataId: id
    }
    this.apiService.updateInquiryDataPriority(formData)
      .subscribe((res) => {
        this.result = res as any;
        if (this.result.status == false) {
          Swal.fire({
            title: this.result.message,
            icon: 'error'
          });
        } else {
          this.toastr.success("The data is saved succesfully");
          this.refreshFormTaskDetailData();
        }
      });
  }

  createContractNo(supplierId, codeName, inquiryDataId) {

    Swal.fire({
      title: '確定取得合約編號?',
      // text: 'Really, Would you delete this record?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: "#17a2b8",
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      focusCancel: true
    }).then((result) => {
      if (result.value) {
        let formData = {
          supplierId: supplierId,
          inquiryDataId: inquiryDataId,
          purchaseFormId: this.detailData?.formTaskContent?.purchaseForm?._id,
          contractNo: this.formAndProjectData.depChineseCode + codeName + this.formAndProjectData?.projectNo + "P" + new Date().toISOString().substring(0, 10).replace("-", "").replace("-", "") + "01"
        }
        this.apiService.createContractNo(formData)
          .subscribe((res) => {
            this.result = res as any;
            if (this.result.status == false) {
              Swal.fire({
                title: this.result.message,
                icon: 'error'
              });
            } else {
              this.refreshFormTaskDetailData();
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log();
      }
    })


  }

  openModal(type, id: any, actions) {
    if (type == 'scope') {
      const modalRef = this.modalService.open(ScopeDescriptionComponent, { windowClass: 'scope' });
      modalRef.componentInstance.scope = this.scope;
      modalRef.componentInstance.formTaskId = this.formTaskId;
      modalRef.componentInstance.engineeringScope = this.detailData?.formTaskContent?.purchaseForm?.engineeringScope;
      modalRef.componentInstance.actions = actions;
      modalRef.closed.subscribe((result) => {
        this.refreshFormTaskDetailData();
      });
    } else if (type == 'rule') {
      const modalRef = this.modalService.open(RuleDescriptionComponent, { windowClass: 'rule' });
      modalRef.componentInstance.rule = this.rule;
      modalRef.componentInstance.formTaskId = this.formTaskId;
      modalRef.componentInstance.engineeringSpec = this.detailData?.formTaskContent?.purchaseForm?.engineeringSpec;
      modalRef.componentInstance.actions = actions;
      modalRef.closed.subscribe((result) => {
        this.refreshFormTaskDetailData();
      });
    } else if (type == 'inquiry-detail-add') {
      const modalRef = this.modalService.open(InquiryDetailAddComponent, { windowClass: 'inquiry-detail-add' });
      modalRef.componentInstance.pccesData = this.pccesData;
      modalRef.componentInstance.inquiryData = this.inquiryData.filter((item) => item._id == id)[0];
      modalRef.componentInstance.formTaskId = this.formTaskId;
      modalRef.componentInstance.inquiryDataId = id;
      modalRef.componentInstance.actions = actions;
      modalRef.componentInstance.parentComp = this;
      modalRef.closed.subscribe((result) => {
        this.refreshFormTaskDetailData();
      });
    } else if (type == 'contract-add') {

    }
  }

  openContractDetailAddModal(inquiryDataId: any, contract, actions) {
    const modalRef = this.modalService.open(ContractAddComponent, { windowClass: 'contract' });
    modalRef.componentInstance.contractTypes = this.contractTypes;
    modalRef.componentInstance.pccesData = this.pccesData;
    modalRef.componentInstance.inquiryData = this.inquiryData.filter((item) => item._id == inquiryDataId)[0];
    modalRef.componentInstance.formTaskId = this.formTaskId;
    modalRef.componentInstance.inquiryDataId = inquiryDataId;
    modalRef.componentInstance.contract = contract;
    modalRef.componentInstance.actions = actions;
    modalRef.closed.subscribe((result) => {
      this.refreshFormTaskDetailData();
    });
  }
}
