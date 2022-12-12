import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-contact',
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent implements OnInit {
  @Input() k3;
  @Input() id;

  constructor(
    public apiService: ApiService,
    public helperService: HelperService,

  ) { }

  options: any = {
    multiple: true
  };

  ngOnInit(): void {
  }


  del(index) {
    $("#p_" + index).hide();
    (this.helperService.DelDataByColumn("proposal", this.id, "", "")).subscribe((res) => { });
  }

}
