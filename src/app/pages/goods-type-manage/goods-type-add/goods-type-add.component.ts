import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {ApiService} from '@services/api.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-goods-type-add',
    templateUrl: './goods-type-add.component.html',
    styleUrls: ['./goods-type-add.component.scss']
})
export class GoodsTypeAddComponent implements OnInit {
    public result;
    GoodsTypeName = new FormControl('');
    constructor(
        public activeModal: NgbActiveModal,
        public apiService: ApiService
    ) {}

    ngOnInit(): void {
    }

    addGoodsType() {
        this.apiService
            .addGoodTypes(
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
