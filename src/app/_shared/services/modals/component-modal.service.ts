import { Injectable } from '@angular/core';
import { ModalService } from './modal.service';
import { ConfirmationModalComponent, InvitationFormComponent, MatchFormComponent, PlayerFormComponent, SpawnPointFormComponent } from '../../components';
import { ConfirmationOptions, MatchFormModalOptions, ModalOptions, PlayerFormModalOptions, SpawnPointFormModalOptions } from '../../models';

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

  showInvitationFormModal(options: ModalOptions = {}): Promise<void> {
    return this.modalService.open<ModalOptions, void>(InvitationFormComponent,
      {
        keyboard: false,
        backdrop: 'static',
        windowClass: 'modal__content modal__content-dark',
        size: 'lg'
      },
      options);
  }

  showMatchFormModal(options: MatchFormModalOptions = {}): Promise<void> {
    return this.modalService.open<MatchFormModalOptions, void>(MatchFormComponent,
      {
        keyboard: false,
        backdrop: 'static',
        windowClass: 'modal__content',
        size: 'lg'
      },
      options);
  }

  showPlayerFormModal(options: PlayerFormModalOptions = {}): Promise<void> {
    return this.modalService.open<PlayerFormModalOptions, void>(PlayerFormComponent,
      {
        keyboard: false,
        backdrop: 'static',
        windowClass: 'modal__content',
        size: 'lg'
      },
      options);
  }

  showSpawnPointFormModal(options: SpawnPointFormModalOptions = {}): Promise<void> {
    return this.modalService.open<SpawnPointFormModalOptions, void>(SpawnPointFormComponent,
      {
        keyboard: false,
        backdrop: 'static',
        windowClass: 'modal__content',
        size: 'lg'
      },
      options);
  }
}
