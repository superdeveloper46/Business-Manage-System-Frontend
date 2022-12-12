import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTaskProcessApiService } from '@services/form-task-process-api.service';
import { HelperService } from '@services/helper.service';
import { RightService } from '@services/right.service';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inquiry-detail-add',
  templateUrl: './inquiry-detail-add.component.html',
  styleUrls: ['./inquiry-detail-add.component.scss']
})
export class InquiryDetailAddComponent implements OnInit {

  createForm: any;
  @Input() pccesData;
  @Input() formTaskId;
  @Input() inquiryDataId;
  @Input() inquiryData;
  @Input() parentComp;
  @Input() actions;

  gridData: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  result: any;


  constructor(
    public activeModal: NgbActiveModal,
    public apiService: FormTaskProcessApiService,
    public rightService: RightService,
    public helperService: HelperService,
    private toastr: ToastrService,
  ) { }

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  ngOnInit(): void {
    this.createForm = new FormGroup({
      prepayMoney: new FormControl('', Validators.required),
      subtotal: new FormControl('', Validators.required),
    });

    this.createForm.get("prepayMoney").setValue(this.inquiryData.prepayMoney);
    this.createForm.get("subtotal").setValue(this.inquiryData.subtotal);

    var order = [[0, 'asc']];
    this.dtOptions = this.helperService.setDtOptions(order);
    this.reloadInquiryDetailData();
  }

  async reloadInquiryDetailData() {
    var inquiryDetailData = this.inquiryData.inquiryDetailList;
    for (var i = 0; i < this.pccesData.length; i++) {
      this.pccesData[i]['price'] = '';
      if (inquiryDetailData != null) {
        for (var j = 0; j < inquiryDetailData.length; j++) {
          if (this.pccesData[i]['pccesId'] == inquiryDetailData[j]['pccesId']) {
            this.pccesData[i]['price'] = inquiryDetailData[j]['price']
          }
        }
      }
    }
    this.gridData = this.pccesData;
    this.gridData.map((item) => {
      item['total'] = (Number(item.quantity) * Number(item.price ? item.price : 0)).toFixed(2);
      return item;
    });
    setTimeout(() => {
      this.dtTrigger.next(null);
    }, 10);
  }

  saveInquiryDetail() {
    if (!this.createForm.valid) {
      Swal.fire({
        title: "All Input Box should not be empty!",
        icon: 'warning',
        confirmButtonColor: "#17a2b8",
      });
      return;
    }

    this.apiService.addInquiryDetailData(this.createForm.value, this.formTaskId, this.inquiryDataId)
      .subscribe((res) => {
        this.result = res as any;
        if (this.result.status == false) {
          Swal.fire({
            title: this.result.message,
            icon: 'error'
          });
        } else {
          this.activeModal.close("Close click");
        }
      });
  }

  priceChange(event, _id) {

    let price = event.target.value;
    this.gridData.map((item) => {
      if (item.pccesId == _id) {
        item['total'] = (Number(item.quantity) * Number(price)).toFixed(2);
        return item;
      }
    });

    var subtotal = 0;
    for (var i = 0; i < this.gridData.length; i++) {
      subtotal += Number(this.gridData[i].total ? this.gridData[i].total : 0);
    }
    subtotal = Math.round(subtotal);
    this.createForm.get("subtotal").setValue(subtotal);

    this.apiService.addInquiryDetailPriceData(price, this.formTaskId, this.inquiryDataId, _id)
      .subscribe((res) => {
        this.result = res as any;
        if (this.result.status == false) {
          Swal.fire({
            title: this.result.message,
            icon: 'error'
          });
        } else {
          this.apiService.addInquiryDetailData(this.createForm.value, this.formTaskId, this.inquiryDataId)
            .subscribe((res) => {
              this.result = res as any;
              if (this.result.status == false) {
                Swal.fire({
                  title: this.result.message,
                  icon: 'error'
                });
              } else {
                this.parentComp.refreshFormTaskDetailData();
                this.toastr.success("The data is saved succesfully");
              }
            });
        }
      });


  }

}
