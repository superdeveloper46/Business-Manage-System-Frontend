import { Component, OnInit, Input,ViewChild } from '@angular/core';
import {Subject} from 'rxjs';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import {FormmngapiService} from '@services/formmngapi.service';
import {DataTableDirective} from 'angular-datatables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.scss']
})
export class FormSectionComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 5,
    stateSave: false,
    order: [[3, 'asc']],
  }
  @Input() form_id;
  @ViewChild(DataTableDirective, {static: true})
  dtElement: DataTableDirective;
  formSection = new FormGroup({
    formSectionNo : new FormControl({value:1, disabled: true}),
    formSectionName : new FormControl('', Validators.required),
    sort : new FormControl('', Validators.required)
  });
  original_formdata = null;
  public tableData = [];
  max_sectionNo = 1;
  defaultData = this.tableData;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: FormmngapiService
  ) { }
  ngOnInit(): void {
    this.reloadData();
  }
  async reloadData() {
    (await this.apiService.getFormSection(this.form_id)).subscribe((res) => {
        this.tableData = res as any;
        this.defaultData = this.tableData;
        this.dtTrigger.next(null);
        let max_val = Math.max.apply(Math,this.tableData.map(function(item){return item.formSectionNo;}));
        if(max_val != -Infinity){
          this.max_sectionNo = Number(max_val)+1;
        }
        this.formSection.get('formSectionNo').setValue(this.max_sectionNo);
    });
  }

  async refreshData() {
      (await this.apiService.getFormSection(this.form_id)).subscribe((res) => {
          this.tableData = res as any;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next(null);
              let max_val = Math.max.apply(Math,this.tableData.map(function(item){return item.formSectionNo;}));
              if(max_val != -Infinity){
                this.max_sectionNo = Number(max_val)+1;
              }
              this.formSection.get('formSectionNo').setValue(this.max_sectionNo);
              this.formSection.get('formSectionName').setValue('');
              this.formSection.get('sort').setValue('');
          });
      });
  }
  editFormSection(row_data){
    this.original_formdata = row_data;
    this.formSection.get('formSectionNo').setValue(row_data.formSectionNo);
    this.formSection.get('formSectionName').setValue(row_data.formSectionName);
    this.formSection.get('sort').setValue(row_data.sort);
  }
  saveFormSection(type:String){
    if(this.formSection.valid){
      let section_id = null;
      let postData = {
        formSectionNo:this.formSection.get('formSectionNo').value,
        formSectionName:this.formSection.get('formSectionName').value,
        sort:this.formSection.get('sort').value
      }
      if(type == 'add'){
        section_id = null;
      }
      else if(type == 'edit'){
        postData['_id'] = this.original_formdata._id;
      }
      this.apiService
          .addFormSection(this.form_id,postData,type)
          .subscribe((res) => {
              if (res.status == 1) {
                  Swal.fire({
                      title: res.message,
                      icon: 'error',
                      confirmButtonText: '確定',
                      confirmButtonColor: "#17a2b8",
                  });
              } else {
                this.refreshData();
                  // this.activeModal.close();
              }
          });
    }
    else{
      Swal.fire({
        title: "區塊名稱和排序不得為空白!",
        icon: 'error',
        confirmButtonColor: "#17a2b8",
      });
    }
  }
  deleteFormSection(row_data){
    Swal.fire({
      title: '確定要刪除表單區塊資料?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: "#17a2b8",
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      focusCancel: true
    }).then((result) => {
      if (result.value) {
        this.apiService.deleteFormSection(this.form_id,row_data).subscribe((res) => {
          this.refreshData();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log();
      }
    })
  }
}
