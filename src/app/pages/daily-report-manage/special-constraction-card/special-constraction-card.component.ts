import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import { HelperService } from '@services/helper.service';
import { ProjectApiService } from '@services/projectapi.service';

@Component({
  selector: 'app-special-constraction-card',
  templateUrl: './special-constraction-card.component.html',
  styleUrls: ['./special-constraction-card.component.scss']
})
export class SpecialConstractionCardComponent implements OnInit {
  @Input() k1;
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
    $("#s_" + index).hide();
    (this.helperService.DelDataByColumn("dailyReport", this.reportId, "specialConstractionList", this.id)).subscribe((res) => { });
  }

}
