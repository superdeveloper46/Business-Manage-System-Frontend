import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Subject } from 'rxjs';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import { WorkTypeAddComponent } from './work-type-add/work-type-add.component';
import { WorkTypeEditComponent } from './work-type-edit/work-type-edit.component';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { RightService } from '@services/right.service';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-work-type-manage',
  templateUrl: './work-type-manage.component.html',
  styleUrls: ['./work-type-manage.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class WorkTypeManageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getRight: any;
  RightObj ={"insert":false,"update":false,"delete":false};

  public workTypes;

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
    this.dtOptions = this.helperService.setDtOptions();
    this.RightObj = this.getRight['__zone_symbol__value'];

    this.reloadData();
  }

  async reloadData() {
    (await this.apiService.getWorkTypes()).subscribe((res) => {
      this.workTypes = res as any;
      this.dtTrigger.next(null);
    });
  }

  async refreshData() {
    (await this.apiService.getWorkTypes()).subscribe((res) => {
      this.workTypes = res as any;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    });
  }

  open(type, workType) {
    if (type == 'add') {
      const modalRef = this.modalService.open(WorkTypeAddComponent, { size: 'md' });
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    } else if (type == 'edit') {
      const modalRef = this.modalService.open(WorkTypeEditComponent, { size: 'md' });
      modalRef.componentInstance.workType = workType;
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
      // } else if (type == 'delete') {
      //   Swal.fire({
      //     title: '確定要刪除工項類型?',
      //     showConfirmButton: true,
      //     showCancelButton: true,
      //     confirmButtonText: '確定',
      //     confirmButtonColor: '#17A2B8',
      //     cancelButtonText: '取消',
      //     icon: 'question'
      //   }).then((result) => {
      //     if (result.isConfirmed) {
      //       this.apiService.deleteWorkTypes(workType._id).subscribe((res) => {
      //         this.refreshData();
      //       });
      //     }
      //   });
      // }
    } else if (type == 'disabled') {
      Swal.fire({
        title: '確定要停用工項類型?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '確定',
        confirmButtonColor: '#17A2B8',
        cancelButtonText: '取消',
        icon: 'question'
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.editWorkTypes(workType._id, { workTypeName: workType.workTypeName, enable: false }).subscribe((res) => {
            this.refreshData();
          });
        }
      });
    }
  }
}
