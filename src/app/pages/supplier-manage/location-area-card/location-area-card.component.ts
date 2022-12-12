import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Select2OptionData } from 'ng-select2';
@Component({
  selector: 'app-location-area',
  templateUrl: './location-area-card.component.html',
})
export class LocationAreaCardComponent implements OnInit {
  @Input() LocationObj;
  @Input() k;
  s2Locations_List: Select2OptionData[];
  s2Areas_List: Select2OptionData[];
  @Input() locationAreaList_locationName;
  @Input() locationAreaList_areaNameList;

  constructor(
    public apiService: ApiService
  ) { }

  options: any = {
    multiple: true
  };

  ngOnInit(): void {
    this.ddlLocations();
  }

  ddlLocations() {
    let arrLocations = [];
    let k = 0;
    this.LocationObj.forEach(element => {
      arrLocations.push({ id: element['id'], text: element['locationName'] });
      k++;
      if (k == this.LocationObj.length) {
        this.s2Locations_List = arrLocations;
      }
    });
    this.locationAreaList_locationName[this.k] = '';
  }

  async ddlAreas(locationId) {
    let arrAreas = [];
    let k = 0;
    var filterLocation = this.LocationObj.filter(s => s.id == locationId);
    if (filterLocation.length == 1) {
      var AllAreas = filterLocation[0]['areaNameList'];
      AllAreas.forEach(element => {
        arrAreas.push({ id: element, text: element });
        k++;
        if (k == AllAreas.length) {
            this.s2Areas_List = arrAreas;
        }
      });
    }
  }


  onChange_Locations(val: String,k): void {
    this.locationAreaList_locationName[k]=val;
    if (val != undefined) {
      this.ddlAreas(val);
    }
  }

  onChange_AreasList(val: [],k): void {
    this.locationAreaList_areaNameList[k]=val;
  }

  del(index) {
    this.locationAreaList_locationName[index]=null;
    this.locationAreaList_areaNameList[index]=null;

    $("#l_" + index).hide();
  }

}
