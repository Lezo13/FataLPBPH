import { Injectable } from '@angular/core';
import { ModalService } from './modal.service';
import { ConfirmationModalComponent, PlayerFormComponent } from '../../components';
import { ConfirmationOptions, PlayerFormModalOptions } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ComponentModalService {
  constructor(private modalService: ModalService) { }

  showConfirmationModal(options: ConfirmationOptions = {}): Promise<boolean> {
    return this.modalService.open<ConfirmationOptions, boolean>(ConfirmationModalComponent,
      {
        keyboard: false,
        backdrop: 'static',
        size: 'lg',
        windowClass: 'confirmation-modal__content'
      },
      options);
  }

  showPlayerFormModal(options: PlayerFormModalOptions = {}): Promise<void> {
    return this.modalService.open<PlayerFormModalOptions, void>(PlayerFormComponent,
      {
        keyboard: false,
        backdrop: 'static',
        windowClass: 'modal__content',
        size: 'lg',
        centered: true
      },
      options);
  }
}
