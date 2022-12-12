import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Subject } from 'rxjs';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import { FunctionModuleAddComponent } from './function-module-add/function-module-add.component';
import { FunctionModuleEditComponent } from './function-module-edit/function-module-edit.component';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { RightService } from '@services/right.service';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-function-module-manage',
  templateUrl: './function-module-manage.component.html',
  styleUrls: ['./function-module-manage.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class FunctionModuleManageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getRight: any;
  RightObj: {};

  public functionModule;
  public ParentgetfunctionModules = new Array();
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(
    public apiService: ApiService,
    public rightService: RightService,
    public helperService: HelperService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = true;
    config.keyboard = false;
    config.centered = true;
    this.getRight = this.rightService.getRight();
  }
  ngOnInit(): void {
    var order =[[5, 'asc']];
    this.dtOptions = this.helperService.setDtOptions(order);
    this.RightObj = this.getRight['__zone_symbol__value'];

    this.reloadData();
    this.ddlFunctionModules();
  }

  async ddlFunctionModules() {
    (await this.apiService.getFunctionModules()).subscribe((res) => {
      var AllfunctionModules = res as any;
      AllfunctionModules.forEach(element => {
        this.ParentgetfunctionModules.push({ id:element._id, name:element.moduleName });
      });
    });
  }

  async reloadData() {
    (await this.apiService.getFunctionModules()).subscribe((res) => {
      this.functionModule = res as any;
      this.dtTrigger.next(null);
    });
  }

  async refreshData() {
    (await this.apiService.getFunctionModules()).subscribe((res) => {
      this.functionModule = res as any;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    });
  }

  open(type, functionModule) {
    if (type == 'add') {
      const modalRef = this.modalService.open(FunctionModuleAddComponent, { size: 'lg' });
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    } else if (type == 'edit') {
      const modalRef = this.modalService.open(FunctionModuleEditComponent, { size: 'lg' });
      modalRef.componentInstance.functionModule = functionModule;
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    } else if (type == 'delete') {
      Swal.fire({
        title: '確定要刪除選單?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '確定',
        confirmButtonColor:'#17A2B8',
        cancelButtonText: '取消',
        icon: 'question'
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.deleteFunctionModules(functionModule._id).subscribe((res) => {
            if (res['delete'] != null) {
              if (!res['delete']) {
                var msg = (res['msg'] == null) ? "已有關聯資料" : res['msg'];
                Swal.fire({
                  title: msg,
                  confirmButtonText: '確定',
                  confirmButtonColor: '#17A2B8',
                  icon: 'error'
                })
              }
            } else {
              this.refreshData();
            }
          });
        }
      });
    }
  }
}
