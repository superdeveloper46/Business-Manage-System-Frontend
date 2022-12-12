import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Subject } from 'rxjs';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import { PccesCodeAddComponent } from './pcces-code-add/pcces-code-add.component';
import { PccesCodeEditComponent } from './pcces-code-edit/pcces-code-edit.component';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { RightService } from '@services/right.service';
import { HelperService } from '@services/helper.service';
// import { createClient } from 'redis';


@Component({
  selector: 'app-pcces-code-manage',
  templateUrl: './pcces-code-manage.component.html',
  styleUrls: ['./pcces-code-manage.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class PccesCodeManageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getRight: any;
  RightObj: {};

  public pccesCodes;

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
    this.callRedis();
  }

  async reloadData() {
    (await this.apiService.getPccesCodes()).subscribe((res) => {
      this.pccesCodes = res as any;
      this.dtTrigger.next(null);
    });
  }

  async refreshData() {
    (await this.apiService.getPccesCodes()).subscribe((res) => {
      this.pccesCodes = res as any;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    });
  }

  async callRedis() {

    // const client = createClient();
    // const redis = new Redis();
//     redis.set("mykey", "value"); // Returns a promise which resolves to "OK" when the command succeeds.

// // ioredis supports the node.js callback style
// redis.get("mykey", (err, result) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(result); // Prints "value"
//   }
// });
  }

  open(type, pccesCode) {
    if (type == 'add') {
      const modalRef = this.modalService.open(PccesCodeAddComponent, { size: 'lg' });
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    } else if (type == 'edit') {
      const modalRef = this.modalService.open(PccesCodeEditComponent, { size: 'lg' });
      modalRef.componentInstance.pccesCode = pccesCode;
      modalRef.closed.subscribe((result) => {
        this.refreshData();
      });
    } else if (type == 'delete') {
      Swal.fire({
        title: '確定要刪除PCCES物料編碼?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '確定',
        confirmButtonColor: '#17A2B8',
        cancelButtonText: '取消',
        icon: 'question'
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.deletePccesCodes(pccesCode._id).subscribe((res) => {
            this.refreshData();
          });
        }
      });
    }
  }
}
