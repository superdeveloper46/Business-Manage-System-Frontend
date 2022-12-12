import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-supplier-location-area-list',
  templateUrl: './supplier-location-area-list.component.html',
  styleUrls: ['./supplier-location-area-list.component.scss']
})
export class SupplierLocationAreaListComponent implements OnInit {
  @Input() supplier;
  @Input() LocationObj;
  constructor(
    public apiService: ApiService,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    var LA = this.supplier['locationAreaList'];

    LA.forEach(element => {
      var filterLocation = this.LocationObj.filter(s => s.id == element['locationName'])[0];
      element['locationCName'] = filterLocation['locationName'];
    });
  }

}
