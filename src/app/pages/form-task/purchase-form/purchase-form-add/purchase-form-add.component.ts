import { Component, Input, OnInit } from '@angular/core';

import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {FormControl,FormGroup,Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { FormtaskapiService } from '@services/formtaskapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-form-add',
  templateUrl: './purchase-form-add.component.html',
  styleUrls: ['./purchase-form-add.component.scss']
})
export class PurchaseFormAddComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    public apiService: FormtaskapiService,
    public router: Router,
  ) { }


  purchaseFormSection = new FormGroup({

    projectName : new FormControl({value: '', disabled: true}),
    purchaseDeadLine : new FormControl({value: '', disabled: true}),
    workTypeId : new FormControl(''),
    emergencyTypeId : new FormControl(''),
    workEndTime : new FormControl(''),
    workBeginTime : new FormControl(''),
    recommendSupplierId : new FormControl(''),
    supplierAmount : new FormControl('')
  });

  @Input() workTypeList;
  @Input() emergencyTypeList;
  @Input() recommendSupplierList
  @Input() formAndProjectData

  emergencyTypeId;

  savePurchaseForm(type:String){
    let max_purchaseNo = ('00'+localStorage.getItem('max_purchaseNo')).slice(-3);
    let formdata = {
      formId:this.formAndProjectData.formId,
      formTaskNo:this.formAndProjectData.projectNo+'-P'+max_purchaseNo,
      taskSiteList:null,
      emergencyTypeId:this.purchaseFormSection.get('emergencyTypeId').value,
      formTaskContent:{
        purchaseForm:{
          projectId:this.formAndProjectData.projectId,
          workTypeId:this.purchaseFormSection.get('workTypeId').value,
          purchaseNo:max_purchaseNo,
          workBeginTime:this.purchaseFormSection.get('workBeginTime').value,
          workEndTime:this.purchaseFormSection.get('workEndTime').value,
          purchaseDeadLine:this.purchaseFormSection.get('purchaseDeadLine').value,
          recommendSupplierId:this.purchaseFormSection.get('recommendSupplierId').value,
          supplierAmount:this.purchaseFormSection.get('supplierAmount').value,
          workers:0
        }
      }
    };
    if(formdata.emergencyTypeId=='' || formdata.formTaskContent.purchaseForm.workTypeId=='' || formdata.formTaskContent.purchaseForm.workBeginTime == '' || formdata.formTaskContent.purchaseForm.workEndTime == ''){
      Swal.fire({
        title: "All Input Box should not be empty!",
        icon: 'warning',
        confirmButtonColor: "#17a2b8",
      });
      return;
    }
    this.apiService
        .addFormTask(formdata)
        .subscribe((res) => {
            if (res.status == false) {
                Swal.fire({
                    title: res.message,
                    icon: 'error'
                });
            } else {
              this.activeModal.close();
              this.router.navigateByUrl('/formTask/'+this.formAndProjectData.formId+"/"+res._id+"/"+res.taskStatusId+"/"+"false");
            }
        });
  }

  purchaseDeadLineChange(value){
    this.emergencyTypeId =  value;
    let workBeginTime = this.purchaseFormSection.get("workBeginTime").value;
    let purchaseDeadLine;
    if(workBeginTime != ""){
      if(this.emergencyTypeId == "2022102810220001"){
        purchaseDeadLine = new Date(Date.parse(this.purchaseFormSection.get('workBeginTime').value));
        console.log("0", purchaseDeadLine);
        purchaseDeadLine.setDate(purchaseDeadLine.getDate()+30);
        console.log("1", purchaseDeadLine);
        purchaseDeadLine = purchaseDeadLine.toISOString().substring(0, 10);
        console.log("2", purchaseDeadLine);
        this.purchaseFormSection.get("purchaseDeadLine").setValue(purchaseDeadLine);
      }else if (this.emergencyTypeId == "2022102810230001"){
        purchaseDeadLine = new Date(Date.parse(this.purchaseFormSection.get('workBeginTime').value));
        purchaseDeadLine.setDate(purchaseDeadLine.getDate()+15);
        purchaseDeadLine = purchaseDeadLine.toISOString().substring(0, 10);
        this.purchaseFormSection.get("purchaseDeadLine").setValue(purchaseDeadLine);
      }else if (this.emergencyTypeId == "2022102810230002"){
        purchaseDeadLine = new Date(Date.parse(this.purchaseFormSection.get('workBeginTime').value));
        purchaseDeadLine.setDate(purchaseDeadLine.getDate()+7);
        purchaseDeadLine = purchaseDeadLine.toISOString().substring(0, 10);
        this.purchaseFormSection.get("purchaseDeadLine").setValue(purchaseDeadLine);
      }
    }
  }

  ngOnInit(): void {
    this.purchaseFormSection.get('projectName').setValue(this.formAndProjectData.projectName)
    // this.purchaseFormSection.get('purchaseDeadLine').setValue(this.formAndProjectData.purchaseDeadLine)
  }

  // private dateToString = (date) => {
  //   return date?date.year+"-"+('0'+date.month).slice(-2)+"-"+('0'+date.day).slice(-2):'';
  // };
}
