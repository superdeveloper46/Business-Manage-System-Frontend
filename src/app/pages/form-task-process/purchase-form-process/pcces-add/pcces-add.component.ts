import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';
import { FormTaskProcessApiService } from '@services/form-task-process-api.service';
import { ToastrService } from 'ngx-toastr';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-pcces-add',
  templateUrl: './pcces-add.component.html',
  styleUrls: ['./pcces-add.component.scss']
})
export class PccesAddComponent implements OnInit {
  createForm: any;
  result: any;
  pccesCodeData: any;
  @Input() parentComp;
  @Output() refreshFormTaskDetailData = new EventEmitter<object>();

  pccesId: any = "";
  description: any = "";
  viewMode: boolean = false;
  unit: any;
  itemKind: any;

  QueryPType = 1;
  s2PccesCodeF5: Select2OptionData[];
  s2PccesCode = new Array<Select2OptionData[]>;
  CodeSection: String;
  pccesCodeBys2 = new Array;
  pccesCodeBys2T = new Array;

  constructor(
    public activeModal: NgbActiveModal,
    public apiService: FormTaskProcessApiService,
    private toastr: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      pccesId: new FormControl('', Validators.required),
      diagramNo: new FormControl('', Validators.required),
      spec: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
    });

    this.ddlPccesF5();
  }

  savePcces() {
    if (!this.createForm.valid) {
      Swal.fire({
        title: "All Input Box should not be empty!",
        icon: 'warning',
        confirmButtonColor: "#17a2b8",
      });
      return;
    }

    let formData = {
      pccesId: this.pccesId,
      diagramNo: this.createForm.get("diagramNo").value,
      spec: this.createForm.get("spec").value,
      quantity: this.createForm.get("quantity").value,
      itemKind: this.itemKind,
      description: this.description,
      unit: this.unit
    }
    debugger
    this.apiService.addPccesData(formData, this.parentComp.formTaskId)
      .subscribe((res) => {
        this.result = res as any;
        if (this.result.status == false) {
          Swal.fire({
            title: this.result.message,
            icon: 'error'
          });
        } else {
          this.toastr.success("The data is saved succesfully");
          this.refreshFormTaskDetailData.emit();
          this.clear();
        }
      });
  }


  async valueChanged(event) {
    var value = event.target.value;
    var value = value.split("-")[0]
    this.viewMode = true;

    (await this.apiService.getPccesCodeData(value))
      .subscribe((res) => {
        this.result = res as any;
        if (this.result.status == false) {
          Swal.fire({
            title: this.result.message,
            icon: 'error'
          });
        } else {
          this.pccesCodeData = res;
        }
      });
  }

  selectPccesCode(data) {
    this.pccesId = data._id;
    this.description = data.description;
    this.itemKind = data.itemKind;
    this.description = data.description;
    this.unit = data.unit;
    this.createForm.get("pccesId").setValue(this.pccesId + "-" + this.description);
    setTimeout(() => {
      this.viewMode = false;
    }, 200);
  }

  focusOut() {
    this.createForm.get("pccesId").setValue(this.pccesId + "-" + this.description);
    setTimeout(() => {
      this.viewMode = false;
    }, 200);
  }

  async focusIn() {
    if (this.pccesId != "") {
      setTimeout(() => {
        this.viewMode = true;
      }, 200);
      (await this.apiService.getPccesCodeData(this.pccesId))
        .subscribe((res) => {
          this.result = res as any;
          if (this.result.status == false) {
            Swal.fire({
              title: this.result.message,
              icon: 'error'
            });
          } else {
            this.pccesCodeData = res;
          }
        });
    }
  }

  clear() {
    this.createForm.get('pccesId').reset();
    this.createForm.get('diagramNo').reset();
    this.createForm.get('spec').reset();
    this.createForm.get('quantity').reset();

    this.pccesId = '';
    this.itemKind = '';
    this.description = '';
    this.unit = '';
    this.CodeSection = '';

    for (var i = 0; i < this.s2PccesCode.length; i++) {
      this.s2PccesCode[i] = [];
    }
  }

  QueryPTypeFunc(t) {
    this.QueryPType = t;

    this.pccesId = '';
    this.itemKind = '';
    this.description = '';
    this.unit = '';
    this.CodeSection = '';
    for (var i = 0; i < this.s2PccesCode.length; i++) {
      this.s2PccesCode[i] = [];
    }
    this.createForm.controls['pccesId'].setValue('');
  }

  async ddlPccesF5() {
    (await this.apiService.getPccesF5())
      .subscribe((res) => {
        this.result = res as any;
        if (this.result.status == false) {
          Swal.fire({
            title: this.result.message,
            icon: 'error'
          });
        } else {
          var PccesCodeF5 = (res as any);
          var arr = [];
          var k = 0;
          PccesCodeF5.forEach(element => {
            arr.push({ id: element['itemCode'], text: element['itemCode'] + "-" + element['cname'] });
            k++;
            if (k == PccesCodeF5.length) {
              this.s2PccesCodeF5 = arr;
            }
          });
        }
      });
  }

  async ddlPccesChapCode(ChapCode, selfRowValue) {
    (await this.apiService.getPccesChapCode(this.CodeSection, ChapCode, selfRowValue))
      .subscribe((res) => {
        this.result = res as any;
        if (this.result.status == false) {
          Swal.fire({
            title: this.result.message,
            icon: 'error'
          });
        } else {
          var PccesCodeF5 = (res as any);
          var arr = [];
          var k = 0;
          PccesCodeF5.forEach(element => {
            arr.push({ id: element['selfRow'], text: element['code'] + "-" + element['content'] });
            k++;
            if (k == PccesCodeF5.length) {
              this.s2PccesCode[ChapCode - 6] = arr;
            }
          });

        }
      });
  }

  onChange_PccesCodeF5(val: String): void {
    this.CodeSection = val;
    this.pccesCodeBys2[0] = this.CodeSection;
    for (var i = 0; i < this.s2PccesCode.length; i++) {
      this.s2PccesCode[i] = [];
    }
    if (val != undefined) {
      this.pccesCodeBys2T[0] = this.s2PccesCodeF5.filter(w => w['id'] == val)[0]['text'].split('-')[1];
      this.ddlPccesChapCode(6, '');
    }
  }
  onChange_PccesCode(val: String, k): void {
    this.s2PccesCode[k] = [];
    if (val != undefined) {
      this.ddlPccesChapCode(k + 1, val);

      this.pccesCodeBys2[k - 5] = this.s2PccesCode[k - 6].filter(w => w['id'] == val)[0]['text'].split('-')[0];
      this.pccesCodeBys2T[k - 5] = this.s2PccesCode[k - 6].filter(w => w['id'] == val)[0]['text'].split('-')[1];
      if (k == 10) {
        this.pccesId = "";
        this.description = "";
        for (var i = 0; i < this.pccesCodeBys2.length; i++) {
          this.pccesId += this.pccesCodeBys2[i];
          if (this.pccesCodeBys2T[i] != "" && i != 5) {
            this.description += this.pccesCodeBys2T[i] + " ";
          }
        }
        this.unit = this.s2PccesCode[k - 6].filter(w => w['id'] == val)[0]['text'].split('-')[1];
        this.createForm.controls['pccesId'].setValue(this.pccesId);
      }
    }
  }

  async queryPcces() {
    const code = document.getElementById('queryPcces') as HTMLInputElement | null;
    if (code.value.length != 10) {
      Swal.fire({
        title: '請輸入完整10碼!',
        icon: 'error'
      });
    } else {
      (await this.apiService.getPccesById(code.value))
        .subscribe((res) => {
          this.result = res as any;
          const pccesResult = document.getElementById('pccesResult') as HTMLInputElement | null;
          if (this.result._id != "") {
            pccesResult.value = res['description'];
            this.pccesId = code.value;
            this.itemKind = res['itemKind'];
            this.description = res['description'];
            this.unit = res['unit'];
            this.createForm.controls['pccesId'].setValue(code.value);
          } else {
            pccesResult.value = '查無資料';
          }

        });
    }
  }
}
