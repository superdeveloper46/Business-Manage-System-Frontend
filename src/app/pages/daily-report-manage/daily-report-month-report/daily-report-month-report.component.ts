import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-daily-report-month-report',
  templateUrl: './daily-report-month-report.component.html',
  styleUrls: ['./daily-report-month-report.component.scss']
})
export class DailyReportMonthReportComponent implements OnInit {
  public result;
  searchYM = new FormControl('');
  public CreateForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService,

  ) { }

  ngOnInit(): void {

  }

  download(){
var a = this.searchYM.value
  }
}
