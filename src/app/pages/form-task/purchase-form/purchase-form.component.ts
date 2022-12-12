import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ActivatedRoute, Router } from '@angular/router';


import { PurchaseFormAddComponent } from './purchase-form-add/purchase-form-add.component';
import { FormtaskapiService } from '@services/formtaskapi.service';
import { RightService } from '@services/right.service';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss']
})

export class PurchaseFormComponent implements OnInit {
  @Input() tableData;
  @Input() loginUserId;
  @Output() reloadData = new EventEmitter<object>();
  @Output() go = new EventEmitter<object>();

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    public apiService: FormtaskapiService,
    public router: Router,
    public rightService: RightService,
    public helperService: HelperService,
  ) {
  }

  @ViewChild(DataTableDirective, { static: true })
  dtElement: DataTableDirective;

  ngOnInit(): void {
    this.reloadData.emit();
  }

  sgo(data, detail) {
    this.go.emit({ data: data, detail: detail });
  }


}
