import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import { HelperService } from '@services/helper.service';
import { ProjectApiService } from '@services/projectapi.service';

@Component({
  selector: 'app-material-manage-card',
  templateUrl: './material-manage-card.component.html',
  styleUrls: ['./material-manage-card.component.scss']
})
export class MaterialManageCardComponent implements OnInit {
  @Input() k2;
  @Input() id;
  @Input() reportId;

  constructor(
    public apiService: ApiService,
    public ProjectApiService: ProjectApiService,
    public helperService: HelperService,
  ) { }

  options: any = {
    multiple: true
  };

  ngOnInit(): void {
  }


  del(index) {
    $("#m_" + index).hide();
    (this.helperService.DelDataByColumn("dailyReport", this.reportId, "materialManageList", this.id)).subscribe((res) => { });
  }

}
