import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import { FormTaskProcessApiService } from '@services/form-task-process-api.service';
import { HelperService } from '@services/helper.service';
import { RightService } from '@services/right.service';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contract-add',
  templateUrl: './contract-add.component.html',
  styleUrls: ['./contract-add.component.scss']
})
export class ContractAddComponent implements OnInit {

  createForm: any;
  @Input() contractTypes;
  @Input() pccesData;
  @Input() formTaskId;
  @Input() inquiryDataId;
  @Input() inquiryData;
  @Input() contract;
  @Input() actions;

  gridData: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  result: any;
  contractFileName: String;
  contractTypeId: String = "";

  formData = new FormData();

  loaded: any = 0;
  load_selected = '';

  constructor(
    public activeModal: NgbActiveModal,
    public apiService: FormTaskProcessApiService,
    public rightService: RightService,
    public helperService: HelperService,
    public master_apiService: ApiService,
    private toastr: ToastrService,
  ) { }

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  ngOnInit(): void {
    this.createForm = new FormGroup({
      contractDate: new FormControl('', Validators.required),
    });


    this.contractFileName = this.contract.contractFile;
    this.contractTypeId = this.contract.contractTypeId;
    this.createForm.get("contractDate").setValue(this.contract.contractDate?.substr(0,10));
    var order=[[0, 'asc']];
    this.dtOptions = this.helperService.setDtOptions(order);
    this.reloadContractDetailData();
  }

  async reloadContractDetailData() {
    var inquiryDetailData = this.inquiryData.inquiryDetailList;
    for(var i=0; i<this.pccesData.length; i++){
      if(inquiryDetailData != null){
        for(var j=0; j<inquiryDetailData.length; j++){
          if(this.pccesData[i]['pccesId'] == inquiryDetailData[j]['pccesId']){
            this.pccesData[i]['price'] = inquiryDetailData[j]['price']
          }
        }
      }
    }
    this.gridData = this.pccesData;

    this.gridData.map((item)=>{
        item['summary'] = Number(item.quantity)*Number(item.price?item.price:0);
        return item;
    });
    setTimeout(() => {
      this.dtTrigger.next(null);
    }, 10);
  }

  saveContractDetail(){
    let contractForm = {
      contractTypeId: this.contractTypeId,
      contractDate: this.createForm.get("contractDate").value,
      contractFile: this.contractFileName,
      contractDetailList: this.gridData
    }

    if (this.contractTypeId == "" || contractForm.contractDate == undefined || contractForm.contractFile == undefined || this.formData.get('url') == undefined) {
      Swal.fire({
        title: "All Input Box should not be empty!",
        icon: 'warning',
        confirmButtonColor: "#17a2b8",
      });
      return;
    }

    // contractfileupload
    this.apiService
      .uploadData(
        this.formData
      )
      .subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.load_selected = "contractFile";
              this.loaded = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {

              setTimeout(() => {
                this.loaded = 0;
                this.contractFileName = event.body.name;
                contractForm.contractFile = this.contractFileName;
                this.save(contractForm);
              }, 200);
            }
          },
          error: (err: any) => {
            this.loaded = 0;
            console.log(err);
          }
      });
  }

  viewPdf(url){
    this.master_apiService.download(url).subscribe((res) => {
      var blob = new Blob([res], {type: 'application/pdf'});
      window.open(window.URL.createObjectURL(blob), "_blank");
    },
    (err) => {
      Swal.fire({
        title: '系統找不到指定的檔案',
        icon: 'error'
      });
    });
  }

  save(contractForm){
    this.apiService.updateContractDetailData(contractForm, this.contract._id)
        .subscribe((res) => {
            this.result = res as any;
            if (this.result.status == false) {
              Swal.fire({
                  title: this.result.message,
                  icon: 'error'
              });
            } else {
              this.toastr.success("The data is saved succesfully");
              this.activeModal.close("Close click");
            }
        });
  }

  contractFileSelected(e){
    const file: File = e.target.files[0];
    if (file) {
      this.contractFileName = file.name;
      var FileExtensionArr = ["pdf"];
      if (FileExtensionArr.indexOf((this.contractFileName.split('.')[this.contractFileName.split('.').length - 1]).toLowerCase()) > -1) {
        this.formData.delete("url");
        this.formData.delete("uploadFile");
        this.formData.append('url', "formTask_contract");
        this.formData.append('uploadFile', file);
      } else {
        this.contractFileName = "";
        Swal.fire({
          title: '檔案類型不正確!',
          icon: 'error'
        });
      }
    }
  }

  valueChanged(val: String){
    this.contractTypeId = val;

  }
}
