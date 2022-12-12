import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import { Subject } from 'rxjs';
import { RightService } from '@services/right.service';
import { ProjectDailyReportContentComponent } from './project-dailyreport-content/project-dailyreport-content.component';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-project-dailyreport',
  templateUrl: './project-dailyreport.component.html',
  styleUrls: ['./project-dailyreport.component.scss']
})
export class ProjectDailyReportComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getRight: any;
  RightObj: {};

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
    if (type == 'contact') {
      const modalRef = this.modalService.open(ProjectDailyReportContentComponent, { size: 'lg' });
      modalRef.closed.subscribe((result) => {

      });
    }
  }
}
