import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Subject } from 'rxjs';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import { ScopeDescriptionAddComponent } from './scope-description-add/scope-description-add.component';
import { ScopeDescriptionEditComponent } from './scope-description-edit/scope-description-edit.component';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { RightService } from '@services/right.service';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-scope-description-manage',
  templateUrl: './scope-description-manage.component.html',
  styleUrls: ['./scope-description-manage.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ScopeDescriptionManageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getRight: any;
  RightObj: {};

  public scopeDescriptions;

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
    (await this.apiService.getScopeDescriptions()).subscribe((res) => {
      this.scopeDescriptions = res as any;
      this.dtTrigger.next(null);
    });
  }

  async refreshData() {
    (await this.apiService.getScopeDescriptions()).subscribe((res) => {
      this.scopeDescriptions = res as any;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    });
  }

  download(url) {
    this.apiService.download(url).subscribe((res) => {
      if (url.indexOf('docx') > -1) {
        this.apiService.downLoadFile(res, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      } else if (url.indexOf('doc') > -1) {
        this.apiService.downLoadFile(res, 'application/msword');
      }
    },
      (err) => {
        Swal.fire({
          title: '系統找不到指定的檔案',
          confirmButtonText: '確定',
          confirmButtonColor: '#17A2B8',
          icon: 'error'
        });
      });
  }

  open(type, scopeDescription) {
    if (type == 'add') {
      const modalRef = this.modalService.open(ScopeDescriptionAddComponent, { size: 'xl' });
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    } else if (type == 'edit') {
      const modalRef = this.modalService.open(ScopeDescriptionEditComponent, { size: 'xl' });
      modalRef.componentInstance.scopeDescription = scopeDescription;
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    } else if (type == 'delete') {
      Swal.fire({
        title: '確定要刪除工程範圍說明?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '確定',
        confirmButtonColor: '#17A2B8',
        cancelButtonText: '取消',
        icon: 'question'
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.deleteScopeDescriptions(scopeDescription._id).subscribe((res) => {
            this.refreshData();
          });
        }
      });
    }
  }
}
