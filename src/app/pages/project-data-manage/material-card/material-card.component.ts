import { HelperService } from '@services/helper.service';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './material-card.component.html',
})
export class MaterialCardComponent implements OnInit {
  @Input() k2;
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
    $("#m_" + index).hide();
    (this.helperService.DelDataByColumn("material", this.id, "", "")).subscribe((res) => { });
  }

}
