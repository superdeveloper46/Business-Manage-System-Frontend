import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import { Subject } from 'rxjs';
import { RightService } from '@services/right.service';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-project-material',
  templateUrl: './project-material.component.html',
  styleUrls: ['./project-material.component.scss']
})
export class ProjectMaterialComponent implements OnInit {
  getRight: any;
  RightObj: {};
  dtOptions: DataTables.Settings = {};

  public result;
  constructor(
    public activeModal: NgbActiveModal,
    public rightService: RightService,
    public helperService: HelperService,
    public apiService: ApiService,
    private modalService: NgbModal
  ) {
    this.getRight = this.rightService.getRight(); }

  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.dtOptions = this.helperService.setDtOptions();
    this.RightObj = this.getRight['__zone_symbol__value'];

  }

  open(type, project) {
    if (type == 'view1') {
      const modalRef = this.modalService.open('', { size: 'lg' });
      modalRef.closed.subscribe((result) => {

      });
    }
    else if (type == 'view2') {
      const modalRef = this.modalService.open('', { size: 'lg' });
      modalRef.closed.subscribe((result) => {

      });
    }
    else if (type == 'view3') {
      const modalRef = this.modalService.open('', { size: 'lg' });
      modalRef.closed.subscribe((result) => {

      });
    }
  }
}
