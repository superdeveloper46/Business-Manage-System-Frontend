import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {openCloseAnimation,rotateAnimation} from './detail-section.animations'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {PccesAddComponent} from '../purchase-form-process/pcces-add/pcces-add.component';
import {PurchaseFormEditComponent} from '../purchase-form-process/purchase-form-edit/purchase-form-edit.component';
import {InquiryAddComponent} from '../purchase-form-process/inquiry-add/inquiry-add.component';
import {ActionComponent} from '../action/action.component';

@Component({
  selector: 'app-detail-section',
  templateUrl: './detail-section.component.html',
  styleUrls: ['./detail-section.component.scss'],
  animations: [openCloseAnimation, rotateAnimation]
})
export class DetailSectionComponent implements OnInit {

  public isExpandable: boolean = false;
  public isMainActive: boolean = false;
  public isOneOfChildrenActive: boolean = false;
  @Input() title;
  @Input() action;
  @Input() expand;
  @Input() isMenuExtended;
  @Input() component;
  @Input() parentComp;
  @Output() refreshFormTaskDetailData = new EventEmitter<object>();

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.isExpandable = true;
    this.calculateIsActive();
  }
  public handleMainMenuAction() {
      if (this.isExpandable) {
          this.toggleMenu();
          return;
      }
  }
  public toggleMenu() {
    this.isMenuExtended = !this.isMenuExtended;
  }
  public calculateIsActive() {
      this.isMainActive = true;
      this.isOneOfChildrenActive = true;
      if (!this.isMainActive && !this.isOneOfChildrenActive) {
          this.isMenuExtended = false;
      }
  }

  openModal(action){
    let modalRef = null;
    if(action == '1_1'){
      modalRef = this.modalService.open(PurchaseFormEditComponent,{windowClass: 'purchase-form-edit'});
      modalRef.componentInstance.parentComp = this.parentComp;
      modalRef.componentInstance.refreshFormTaskDetailData.subscribe(($e) => {
        this.refreshFormTaskDetailData.emit();
      })
    }else if(action == '2_1'){
      modalRef = this.modalService.open(PccesAddComponent,{windowClass: 'pcces-add'});
      modalRef.componentInstance.parentComp = this.parentComp;
      modalRef.componentInstance.refreshFormTaskDetailData.subscribe(($e) => {
        this.refreshFormTaskDetailData.emit();
      })
    }else if(action == '4_1'){
      modalRef = this.modalService.open(InquiryAddComponent,{windowClass: 'inquiry-add'});
      modalRef.componentInstance.parentComp = this.parentComp;
      modalRef.componentInstance.refreshFormTaskDetailData.subscribe(($e) => {
        this.refreshFormTaskDetailData.emit();
      })
    }else{
      modalRef = this.modalService.open(ActionComponent,{windowClass: 'action-form'});
      modalRef.componentInstance.parentComp = this.parentComp;
      modalRef.componentInstance.action = action;
    }
  }
}
