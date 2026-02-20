import { Injectable } from '@angular/core';
import { ModalService } from './modal.service';
import { ConfirmationModalComponent, ContentWindowComponent, InvitationFormComponent, MapFormComponent, MatchFormComponent, PlayerFormComponent, SpawnPointFormComponent, StrategyFormComponent, UserFormComponent } from '../../components';
import { ConfirmationOptions, ContentWindowModalOptions, MapFormModalOptions, MatchFormModalOptions, ModalOptions, PlayerFormModalOptions, SpawnPointFormModalOptions, StrategyFormModalOptions, UserFormModalOptions } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ComponentModalService {
  constructor(private modalService: ModalService) { }

  showConfirmationModal(options: ConfirmationOptions = {}, darkTheme: boolean): Promise<boolean> {
    return this.modalService.open<ConfirmationOptions, boolean>(ConfirmationModalComponent,
      {
        keyboard: false,
        backdrop: 'static',
        size: 'lg',
        windowClass: `confirmation-modal__content ${darkTheme ? 'modal__content-dark' : ''}`
      },
      options);
  }

  showContentWindow(options: ContentWindowModalOptions = {}): Promise<void> {
    return this.modalService.open<ContentWindowModalOptions, void>(ContentWindowComponent,
      {
        keyboard: false,
        backdrop: 'static',
        size: 'md',
        windowClass: 'modal__content',
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

  showMapFormModal(options: MapFormModalOptions = {}): Promise<void> {
    return this.modalService.open<MapFormModalOptions, void>(MapFormComponent,
      {
        keyboard: false,
        backdrop: 'static',
        windowClass: 'modal__content',
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

  showUserFormModal(options: UserFormModalOptions = {}): Promise<void> {
    return this.modalService.open<UserFormModalOptions, void>(UserFormComponent,
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

  showStrategyFormModal(options: StrategyFormModalOptions = {}): Promise<void> {
    return this.modalService.open<StrategyFormModalOptions, void>(StrategyFormComponent,
      {
        keyboard: false,
        backdrop: 'static',
        windowClass: 'modal__content',
        size: 'lg'
      },
      options);
  }
}
