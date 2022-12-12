import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormTaskProcessApiService } from '@services/form-task-process-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-purchase-form-edit',
  templateUrl: './purchase-form-edit.component.html',
  styleUrls: ['./purchase-form-edit.component.scss']
})
export class PurchaseFormEditComponent implements OnInit {

  @Input() parentComp;
  @Output() refreshFormTaskDetailData = new EventEmitter<object>();

  purchaseForm: FormGroup;
  workTypeList: any;
  emergencyTypeList: any;
  recommendSupplierList: any;
  result: any;
  emergencyTypeId;

  constructor(
    public activeModal: NgbActiveModal,
    public apiService: FormTaskProcessApiService,
    private toastr: ToastrService,
  ) { }



  ngOnInit(): void {
    this.purchaseForm = new FormGroup({
      projectName : new FormControl({value: '', disabled: true}),
      purchaseDeadLine : new FormControl({value: '', disabled: true}),
      workTypeId : new FormControl(''),
      emergencyTypeId : new FormControl(''),
      workEndTime : new FormControl(''),
      workBeginTime : new FormControl(''),
      workers : new FormControl(''),
      recommendSupplierId : new FormControl(''),
    });

    this.workTypeList = this.parentComp.workTypes;
    this.emergencyTypeList = this.parentComp.emergencyTypes;
    this.recommendSupplierList = this.parentComp.suppliers

    this.purchaseForm.get("projectName").setValue(this.parentComp?.formAndProjectData?.projectName);
    this.purchaseForm.get("workTypeId").setValue(this.parentComp?.detailData?.formTaskContent?.purchaseForm?.workTypeId);
    this.purchaseForm.get("purchaseDeadLine").setValue(this.parentComp?.detailData?.formTaskContent?.purchaseForm?.purchaseDeadLine.substr(0,10));
    this.purchaseForm.get("emergencyTypeId").setValue(this.parentComp?.detailData?.emergencyTypeId);
    this.purchaseForm.get("workBeginTime").setValue(this.parentComp?.detailData?.formTaskContent?.purchaseForm?.workBeginTime.substr(0,10));
    this.purchaseForm.get("workEndTime").setValue(this.parentComp?.detailData?.formTaskContent?.purchaseForm?.workEndTime.substr(0,10));
    this.purchaseForm.get("recommendSupplierId").setValue(this.parentComp?.detailData?.formTaskContent?.purchaseForm?.recommendSupplierId);
    this.purchaseForm.get("workers").setValue(this.parentComp?.detailData?.formTaskContent?.purchaseForm?.workers);
  }

  editPurchaseForm(){

    if(!this.purchaseForm.valid){
      Swal.fire({
        title: "All Input Box should not be empty!",
        icon: 'warning',
        confirmButtonColor: "#17a2b8",
      });
      return;
    }

    let formdata = {
        workTypeId:this.purchaseForm.get('workTypeId').value,
        emergencyTypeId:this.purchaseForm.get('emergencyTypeId').value,
        workBeginTime: this.purchaseForm.get('workBeginTime').value,
        workEndTime:this.purchaseForm.get('workEndTime').value,
        purchaseDeadLine: this.purchaseForm.get('purchaseDeadLine').value,
        recommendSupplierId:this.purchaseForm.get('recommendSupplierId').value,
        workers:this.purchaseForm.get('workers').value,
    };


    this.apiService
        .editPurchaseForm(formdata, this.parentComp.formTaskId)
        .subscribe((res) => {
          this.result = res as any;
          if (this.result.status == false) {
            Swal.fire({
                title: this.result.message,
                icon: 'error'
            });
          } else {
            this.activeModal.close();
            this.toastr.success("The data is saved succesfully");
            this.refreshFormTaskDetailData.emit();
          }
        });
  }

  purchaseDeadLineChange(value){
    this.emergencyTypeId =  value;
    let workBeginTime = this.purchaseForm.get("workBeginTime").value;
    let purchaseDeadLine;
    if(workBeginTime != ""){
      if(this.emergencyTypeId == "2022102810220001"){
        purchaseDeadLine = new Date(Date.parse(this.purchaseForm.get('workBeginTime').value));
        console.log("0", purchaseDeadLine);
        purchaseDeadLine.setDate(purchaseDeadLine.getDate()+30);
        console.log("1", purchaseDeadLine);
        purchaseDeadLine = purchaseDeadLine.toISOString().substring(0, 10);
        console.log("2", purchaseDeadLine);
        this.purchaseForm.get("purchaseDeadLine").setValue(purchaseDeadLine);
      }else if (this.emergencyTypeId == "2022102810230001"){
        purchaseDeadLine = new Date(Date.parse(this.purchaseForm.get('workBeginTime').value));
        purchaseDeadLine.setDate(purchaseDeadLine.getDate()+15);
        purchaseDeadLine = purchaseDeadLine.toISOString().substring(0, 10);
        this.purchaseForm.get("purchaseDeadLine").setValue(purchaseDeadLine);
      }else if (this.emergencyTypeId == "2022102810230002"){
        purchaseDeadLine = new Date(Date.parse(this.purchaseForm.get('workBeginTime').value));
        purchaseDeadLine.setDate(purchaseDeadLine.getDate()+7);
        purchaseDeadLine = purchaseDeadLine.toISOString().substring(0, 10);
        this.purchaseForm.get("purchaseDeadLine").setValue(purchaseDeadLine);
      }
    }
  }

}
