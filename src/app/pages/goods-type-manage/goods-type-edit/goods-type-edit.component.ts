import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '@services/api.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-goods-type-edit',
    templateUrl: './goods-type-edit.component.html',
    styleUrls: ['./goods-type-edit.component.scss']
})
export class GoodsTypeEditComponent implements OnInit {
    public result;
    GoodsTypeName = new FormControl('');
    @Input() goodType;
    constructor(
        public activeModal: NgbActiveModal,
        public apiService: ApiService
    ) {}

    ngOnInit(): void {
        this.GoodsTypeName.setValue(this.goodType.goodsTypeName);
    }

    editGood() {
        this.apiService
            .editGoodTypes(
                this.goodType.id,
                this.GoodsTypeName.value,
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
