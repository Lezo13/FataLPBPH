/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(
    private modal: NgbModal
  ) { }

  open<T, V>(content: any, opts: NgbModalOptions = {}, data?: T): Promise<V> {
    const instance: NgbModalRef = this.modal.open(content, {
      centered: true,
      backdrop: 'static',
      ...opts
    });

    instance.componentInstance.data = data || null;
    return instance.result;
  }

  dismissAll(): void {
    this.modal.dismissAll();
  }
}