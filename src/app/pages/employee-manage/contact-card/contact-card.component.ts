import { HelperService } from '@services/helper.service';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact-card.component.html',
})
export class ContactCardComponent implements OnInit {
  @Input() k2;
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
    $("input[name='EmergencyContact[" + index + "].contactName']").val('')
    $("#e_" + index).hide();

    var cId =  $("input[name='EmergencyContact[" + index + "]._id']").attr("data-cId");
    var id =  $("input[name='EmergencyContact[" + index + "]._id']").val();

    this.helperService.DelDataByColumn(
      "employee",
      cId,
      "contactList",
      id
    )
      .subscribe((res) => {
        if (res['status'] === 'ok') {
        }
      });
  }

}
