import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormTaskProcessApiService } from '@services/form-task-process-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inquiry-add',
  templateUrl: './inquiry-add.component.html',
  styleUrls: ['./inquiry-add.component.scss']
})
export class InquiryAddComponent implements OnInit {

  @Input() parentComp;
  @Output() refreshFormTaskDetailData = new EventEmitter<object>();

  createForm: any;
  suppliers: any;
  result: any;
  viewMode: boolean = false;
  supplierId: String = 'no';

  constructor(
    public activeModal: NgbActiveModal,
    public apiService: FormTaskProcessApiService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      supplierName: new FormControl('', Validators.required),
      businessNo: new FormControl('', Validators.required),
      contactName: new FormControl('', Validators.required),
      contactPhone: new FormControl('', Validators.required),
      remark: new FormControl('', Validators.required),
    });

    this.suppliers = this.parentComp.suppliers;
  }

  saveInquiry(){
    if (!this.createForm.valid) {
      Swal.fire({
        title: "All Input Box should not be empty!",
        icon: 'warning',
        confirmButtonColor: "#17a2b8",
      });
      return;
    }

    this.apiService.addInquiryData(this.createForm.value, this.parentComp.formTaskId, this.supplierId)
        .subscribe((res) => {
            this.result = res as any;
            if (this.result.status == false) {
              Swal.fire({
                  title: this.result.message,
                  icon: 'error'
              });
            } else {
              if(res['status'] == "ok"){
                this.toastr.success("The data is saved succesfully");
                this.refreshFormTaskDetailData.emit();
                this.activeModal.close("Close click");
              }else{
                Swal.fire({
                  title: "Data Already Exist",
                  icon: 'error'
                });
              }

            }
        });
  }

  async valueChanged(event){
    this.clear();
    var value = event.target.value;
    this.viewMode = true;
    this.suppliers = this.parentComp.suppliers.filter((item)=>item.supplierName.search(value) != -1);
  }

  onKeydown(event){
    if (event.key === "Enter") {
      setTimeout(() => {
        this.viewMode = false;
      }, 100);
    }
  }

  focusOut(){
    setTimeout(() => {
      this.viewMode = false;
    }, 200);
  }

  async focusIn(){
    if(this.createForm.get('supplierName').value != ""){
      setTimeout(() => {
        this.viewMode = true;
      }, 200);
      this.suppliers = this.parentComp.suppliers.filter((item)=>item.supplierName.search(this.createForm.get('supplierName').value) != -1);
    }
  }

  selectSupplier(data){
    var data = this.parentComp.suppliers.filter((item)=>item._id==data._id);

    this.supplierId = data[0]._id;
    this.createForm.get('supplierName').setValue(data[0].supplierName);
    this.createForm.get('businessNo').disable();
    this.createForm.get('contactName').disable();
    this.createForm.get('contactPhone').disable();
    this.createForm.get('remark').disable();
    this.createForm.get('businessNo').disable();
    this.createForm.get('contactName').disable();
    this.createForm.get('contactPhone').disable();
    this.createForm.get('remark').disable();

    this.createForm.get('businessNo').setValue(data[0].businessNo);
    this.createForm.get('contactName').setValue(data[0].contactName);
    this.createForm.get('contactPhone').setValue(data[0].contactPhone);
    this.createForm.get('remark').setValue(data[0].remark);
  }

  clear(){
    this.supplierId = 'no';
    this.createForm.get('businessNo').reset();
    this.createForm.get('contactName').reset();
    this.createForm.get('contactPhone').reset();
    this.createForm.get('remark').reset();


    this.createForm.get('businessNo').enable();
    this.createForm.get('contactName').enable();
    this.createForm.get('contactPhone').enable();
    this.createForm.get('remark').enable();


    this.createForm.get('businessNo').enable();
    this.createForm.get('contactName').enable();
    this.createForm.get('contactPhone').enable();
    this.createForm.get('remark').enable();

  }

}
