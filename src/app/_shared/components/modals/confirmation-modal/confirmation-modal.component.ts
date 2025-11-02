import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationOptions } from 'src/app/_shared/models';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss'],
    standalone: false
})
export class ConfirmationModalComponent {
  @Input() data!: ConfirmationOptions;

  constructor(
    public modalInstance: NgbActiveModal
  ) { }

}