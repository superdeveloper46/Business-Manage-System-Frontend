import { Component, OnInit,ViewChild } from '@angular/core';
import {Subject} from 'rxjs';
import {
  NgbModalConfig,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import {DataTableDirective} from 'angular-datatables';
import Swal from 'sweetalert2';

import {FormmngapiService} from '@services/formmngapi.service';
import {FormAddComponent} from './form-add/form-add.component';
import {FormEditComponent} from './form-edit/form-edit.component';
import { FormSectionComponent } from './form-section/form-section.component';
import { FormFlowComponent } from './form-flow/form-flow.component'
import { RightService } from '@services/right.service';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-form-manage',
  templateUrl: './form-manage.component.html',
  styleUrls: ['./form-manage.component.scss']
})
export class FormManageComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject<any>();
  projectStepList;
  dtOptions: DataTables.Settings = {};
  public tableData = [];

  defaultData = this.tableData;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  constructor(
    private modalService: NgbModal,
    public apiService: FormmngapiService,
    public rightService: RightService,
    public helperService: HelperService,
  ) { }

  ngOnInit(): void {
    // const modalRef = this.modalService.open(FormFlowComponent,{size: 'lg',windowClass: 'form-flow'});
    var order=[[0, 'asc']];
    this.dtOptions = this.helperService.setDtOptions(order);
    this.reloadData();
    this.getProjectSteps();
  }
  setDisable(checked: boolean,data){
    console.log(data);
    data.enable = !checked;
    this.apiService.editFormData(data._id,data).subscribe((res) => {
      this.refreshData();
    });
  }
  async reloadData() {
    (await this.apiService.getFormData()).subscribe((res) => {
        this.tableData = res as any;
        this.defaultData = this.tableData;
        this.dtTrigger.next(null);
    });
  }

  async refreshData() {
      (await this.apiService.getFormData()).subscribe((res) => {
          this.tableData = res as any;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next(null);
          });
      });
  }
  deleteRow(value : String) : void {
    Swal.fire({
      title: '確定要刪除表單資料?',
      // text: 'Really, Would you delete this record?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: "#17a2b8",
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      focusCancel: true
    }).then((result) => {
      if (result.value) {
        this.apiService.delete(value).subscribe((res) => {
          this.refreshData();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log();
      }
    })
  }
  openModal(type,data){
    if (type == 'add') {
      const modalRef = this.modalService.open(FormAddComponent,{windowClass: 'add-form'});
      modalRef.componentInstance.projectStepList = this.projectStepList;
      modalRef.closed.subscribe((result) => {
          this.refreshData();
      });
    }else if(type == 'edit'){
      const modalRef = this.modalService.open(FormEditComponent,{windowClass: 'edit-form'});
      modalRef.componentInstance.projectStepList = this.projectStepList;
      modalRef.componentInstance.data = data;
      modalRef.closed.subscribe((result) => {
          this.refreshData();
      });
    }else if(type == 'formsection'){
      const modalRef = this.modalService.open(FormSectionComponent,{windowClass: 'form-section'});
      modalRef.componentInstance.form_id = data;
      modalRef.closed.subscribe((result) => {
          // this.refreshData();
      });
    }else if(type == 'formflow'){
      const modalRef = this.modalService.open(FormFlowComponent,{size: 'lg',windowClass: 'form-flow'});
      modalRef.componentInstance.form_id = data;
      modalRef.closed.subscribe((result) => {
          // this.refreshData();
      });
    }
  }
  async getProjectSteps() {
    (await this.apiService.getProjectSteps()).subscribe((res) => {
        this.projectStepList = res as any;
    });
  }
}
