import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pcces-code-add',
  templateUrl: './pcces-code-add.component.html',
  styleUrls: ['./pcces-code-add.component.scss']
})
export class PccesCodeAddComponent implements OnInit {
  public result;
  public CreateForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.CreateForm = new FormGroup({
      _id: new FormControl('', Validators.required),
      itemKind: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required)
    });
  }

  addPccesCode() {
    if (this.CreateForm.valid) {
      this.apiService
        .addPccesCodes(
          this.CreateForm.value
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
    } else {
      Swal.fire({
        title: '請填寫必填欄位',
        confirmButtonText: '確定',
        confirmButtonColor: '#17A2B8',
        icon: 'error'
      });
    }


  }
}
