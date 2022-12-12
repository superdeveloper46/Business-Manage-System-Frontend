import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-supplier-bannk-data',
  templateUrl: './supplier-bank-data.component.html',
  styleUrls: ['./supplier-bank-data.component.scss']
})
export class SupplierBankDataComponent implements OnInit {
  @Input() supplier;

  imgsrc = "";

  constructor(
    public apiService: ApiService,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    if (this.supplier.supplierBankData.bookUrl != "" && this.supplier.supplierBankData.bookUrl != null) {
      this.apiService.download(this.supplier.supplierBankData.bookUrl).subscribe((res) => {
        this.imgsrc = this.apiService.downLoadFileToBase64(res);
      });
    }
  }

}
