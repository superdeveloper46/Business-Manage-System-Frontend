import {Component, ViewEncapsulation} from '@angular/core';
import {
    NgbModalConfig,
    NgbModal,
    NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-ngbd-modal-config',
    templateUrl: './modal-config.html',
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class NgbdModalConfigComponent {
    constructor(config: NgbModalConfig, private modalService: NgbModal) {
        // customize default values of modals used by this component tree
        config.backdrop = true;
        config.keyboard = false;
        config.centered = true;
    }

    open(content) {
        this.modalService.open(content);
    }
}
