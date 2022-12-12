import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import { ProjectApiService } from '@services/projectapi.service';
import { Subject } from 'rxjs';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import { MaterialEditComponent } from './material-edit/material-edit.component';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { RightService } from '@services/right.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-material-manage',
  templateUrl: './material-manage.component.html',
  styleUrls: ['./material-manage.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class MaterialManageComponent implements OnInit {
  public projectId;
  getRight: any;
  RightObj: {};
  dtOptions: DataTables.Settings = {};

  public materials;

  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(
    public apiService: ApiService,
    public ProjectApiService: ProjectApiService,
    public rightService: RightService,
    public helperService: HelperService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
  ) {
    config.backdrop = true;
    config.keyboard = false;
    config.centered = true;
    // this.getRight = this.rightService.getRight();

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params = {}) => {
      this.projectId = params['id'];
    })
    this.dtOptions = this.helperService.setDtOptions();
    // this.RightObj = this.getRight['__zone_symbol__value'];

    this.reloadData();
  }

  async reloadData() {
    (await this.ProjectApiService.getMaterial(this.projectId)).subscribe((res) => {
        this.materials = res as any;
        this.dtTrigger.next(null);
    });
  }

  async refreshData() {
    (await this.ProjectApiService.getMaterial(this.projectId)).subscribe((res) => {
        this.materials = res as any;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next(null);
        });
    });
  }

  download(url) {
    this.apiService.download(url).subscribe((res) => {
      if (url.indexOf('pdf') > -1) {
        this.apiService.downLoadFile(res, 'application/pdf');
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

  open(type, material) {
    if (type == 'edit') {
      const modalRef = this.modalService.open(MaterialEditComponent, { size: 'lg' });
      modalRef.componentInstance.material = material;
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    }
  }
}
