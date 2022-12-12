import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import { HelperService } from '@services/helper.service';
import { ProjectApiService } from '@services/projectapi.service';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.scss']
})
export class DocumentCardComponent implements OnInit {
  @Input() k4;
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
    $("#d_" + index).hide();
    (this.helperService.DelDataByColumn("dailyReport", this.reportId, "documentList", this.id)).subscribe((res) => { });
  }

}
