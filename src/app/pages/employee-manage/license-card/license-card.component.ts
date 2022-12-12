import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import { HelperService } from '@services/helper.service';
@Component({
  selector: 'app-license',
  templateUrl: './license-card.component.html',
})
export class LicenseCardComponent implements OnInit {
  @Input() k;
  public ParentgetlicenseTypes = new Array();
  constructor(
    public apiService: ApiService,
    public helperService: HelperService,
  ) { }

  options: any = {
    multiple: true
  };

  ngOnInit(): void {
    this.ddlLicenseTypes();
  }


  async ddlLicenseTypes() {
    (await this.apiService.getLicenseTypes()).subscribe((res) => {
      var AlllicenseTypes = res as any;
      AlllicenseTypes.forEach(element => {
        this.ParentgetlicenseTypes.push({ id: element._id, name: element.licenseTypeName });
      });
    });
  }

  del(index) {
    $("input[name='License[" + index + "].licenseName']").val('')
    $("#l_" + index).hide();

    var cId =  $("input[name='License[" + index + "]._id']").attr("data-cId");
    var id =  $("input[name='License[" + index + "]._id']").val();

    this.helperService.DelDataByColumn(
      "employee",
      cId,
      "licenseList",
      id
    )
      .subscribe((res) => {
        if (res['status'] === 'ok') {
        }
      });

  }

}
