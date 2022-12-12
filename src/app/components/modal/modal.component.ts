import { Component, OnInit,Inject, Input, ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ModalConfig} from './modal.config';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  closeResult = '';
  @Input() public modalConfig: ModalConfig
  @ViewChild('modal') private modalContent: TemplateRef<ModalComponent>
  private modalRef: NgbModalRef

  @Input() show: boolean;
  constructor(private modalService: NgbModal) { }
  
  open(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent)
      this.modalRef.result.then(resolve, resolve)
    })
  }
  close() {
    this.modalRef.close()
  }
  dismiss() {
    this.modalRef.dismiss()
  }
  ngOnInit() {
    
  }

}

