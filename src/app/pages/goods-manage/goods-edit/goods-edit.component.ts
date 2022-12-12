import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-goods-edit',
  templateUrl: './goods-edit.component.html',
  styleUrls: ['./goods-edit.component.scss']
})
export class GoodsEditComponent implements OnInit {
  public goodTypes;
  public result;
  GoodsName = new FormControl('');
  GoodsType = new FormControl('0');
  GoodsRemark = new FormControl('');
  @Input() goods;


  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.ddlGoodTypes();

    this.GoodsName.setValue(this.goods.goodsName);
    this.GoodsRemark.setValue(this.goods.goodsRemark);
  }

  async ddlGoodTypes() {
    (await this.apiService.getGoodTypes()).subscribe((res) => {
      this.goodTypes = res as any;
      this.GoodsType.setValue(this.goods.goodsTypeId);
    });
  }


  editGood() {
    this.apiService
      .editGoods(
        this.goods.id,
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
