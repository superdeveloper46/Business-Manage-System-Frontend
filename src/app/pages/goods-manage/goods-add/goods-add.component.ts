import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-goods-add',
  templateUrl: './goods-add.component.html',
  styleUrls: ['./goods-add.component.scss']
})
export class GoodsAddComponent implements OnInit {

  public goodTypes;
  public result;
  GoodsName = new FormControl('');
  GoodsType = new FormControl('0');
  GoodsRemark = new FormControl('這是備註');
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.ddlGoodTypes();
  }

  async ddlGoodTypes() {
    (await this.apiService.getGoodTypes()).subscribe((res) => {
      this.goodTypes = res as any;
    });
  }

  addGood() {
    this.apiService
      .addGoods(
        this.GoodsName.value,
        this.GoodsType.value,
        this.GoodsRemark.value
      )
      .subscribe((res) => {
        this.result = res as any;
        if (this.result.result_status == false) {
          Swal.fire({
            title: this.result.result_message,
            icon: 'error'
          });
        } else {
          this.activeModal.close();
        }
      });
  }
}
