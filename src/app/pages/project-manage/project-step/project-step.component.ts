import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { Subject } from 'rxjs';
import { RightService } from '@services/right.service';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-project-step',
  templateUrl: './project-step.component.html',
  styleUrls: ['./project-step.component.scss']
})
export class ProjectStepComponent implements OnInit {
  getRight: any;
  RightObj: {};
  dtOptions: DataTables.Settings = {};

  public result;
  public CreateForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public rightService: RightService,
    public helperService: HelperService,
    public apiService: ApiService
  ) {
    this.getRight = this.rightService.getRight();}

  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.dtOptions = this.helperService.setDtOptions();
    this.RightObj = this.getRight['__zone_symbol__value'];

    this.CreateForm = new FormGroup({
    });

  }


  addProject() {
    //   if (this.CreateForm.valid) {
    //     this.apiService
    //         .stepProjects(
    //           this.CreateForm.value
    //         )
    //         .subscribe((res) => {
    //             this.result = res as any;
    //             if (this.result.result_status == false) {
    //                 Swal.fire({
    //                     title: this.result.result_message,
    //                     icon: 'error'
    //                 });
    //             } else {
    //                 this.activeModal.close();
    //             }
    //         });
    //       } else {
    //         Swal.fire({
    //           title: '請填寫必填欄位',
    //           icon: 'error'
    //         });
    //       }
  }
}
