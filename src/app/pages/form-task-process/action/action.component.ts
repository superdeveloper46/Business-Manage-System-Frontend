import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTaskProcessApiService } from '@services/form-task-process-api.service';
import { RightService } from '@services/right.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  createForm: any;
  @Input() parentComp;
  @Input() action;

  employee: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  nextSigner: any='';
  result: any;


  constructor(
    public activeModal: NgbActiveModal,
    public router: Router,
    public apiService: FormTaskProcessApiService,
    public rightService: RightService,
    public helperService: HelperService,
    private toastr: ToastrService,
  ) {

  }

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;


  ngOnInit(): void {
    var order=[[0, 'asc']];
    this.dtOptions = this.helperService.setDtOptions(order);
    this.createForm = new FormGroup({
      formTaskId: new FormControl('', Validators.required),
      previousFormTaskSiteId: new FormControl('', Validators.required),
      nextFormFlowId: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required),
      nextSigner: new FormControl('', Validators.required),
      action: new FormControl('', Validators.required),
    });

    this.createForm.get('formTaskId').setValue(this.parentComp.formTaskId);
    this.createForm.get('previousFormTaskSiteId').setValue(this.parentComp.previousFormTaskSiteId);
    this.createForm.get('nextFormFlowId').setValue(this.parentComp.nextFormFlowId);
    this.createForm.get('action').setValue(this.action);

    if(this.action == "agree" || this.action == "send"){
      this.loadNextSingers()
    }else if(this.action == "back"){
      this.loadAlreadySingers()
    }

  }

  async loadNextSingers() {
    if(this.parentComp.hasNextSigner){
      let flowType = this.getNextFormFlow(this.parentComp.nextFormFlowId).flowType;
      let targetId = this.getNextFormFlow(this.parentComp.nextFormFlowId).targetId;
      let creatorId = this.parentComp.detailData.creatorId;
      targetId = targetId==''?'no':targetId;
      (await this.apiService.getNextSingers(this.parentComp.formTaskId, flowType, targetId, creatorId)).subscribe((res) => {
        this.employee = res;
        if(this.employee.length != 0){
          this.nextSigner = this.employee[0]._id;
          if(this.action == "back"){
            this.createForm.get('nextFormFlowId').setValue(this.employee[0].formFlowId);
          }
        }
        this.dtTrigger.next(null);
      });
    }
  }

  async loadAlreadySingers() {
    (await this.apiService.getAlreadySingers(this.parentComp.formTaskId, this.parentComp.detailData.creatorId)).subscribe((res) => {
      this.employee = res;
      this.dtTrigger.next(null);
    });
  }


  getNextFormFlow(nextFormFlowId){
    let flowlist = this.parentComp.formFlowList;
    for(var i=0; i<flowlist.length; i++){
      if(flowlist[i]._id == nextFormFlowId){
        return flowlist[i];
      }
    }
  }

  selectNextSinger(id, formFlowId){
    this.nextSigner = id;
    if(this.action == "back"){
      this.createForm.get('nextFormFlowId').setValue(formFlowId);
    }
  }

  save(){
    this.createForm.get('nextSigner').setValue(this.nextSigner);
    if(this.parentComp.hasNextSigner){
      if(this.action != "reject"){
        if(this.nextSigner == ''){
          Swal.fire({
            title: "Please select Signer",
            icon: 'error'
          });
          return;
        }
      }
    }

    if(this.createForm.get('comment').value == ''){
      Swal.fire({
        title: "Please write 填寫原因",
        icon: 'error'
      });
      return;
    }

    Swal.fire({
      title: 'Really, Would you '+this.action+' this data?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: "#17a2b8",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      focusCancel: true
    }).then((result) => {
      if (result.value) {
        this.apiService.formAction(this.createForm.value).subscribe((res) => {
          this.result = res;
          if (this.result.status == false) {
            Swal.fire({
                title: this.result.message,
                icon: 'error'
            });
          } else {
            this.activeModal.close();
            this.toastr.success("The data is saved succesfully");
            setTimeout(() => {
              this.router.navigateByUrl('/formTask/'+this.parentComp.formId);
            }, 1000);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log();
      }
    })
  }

}
