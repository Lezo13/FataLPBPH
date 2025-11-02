import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AlertMessage, AlertMessageOptions } from '../models';
import { AlertMessageType } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {
  private messageShown: Observable<AlertMessage>;
  private messageSubject: Subject<AlertMessage> = new Subject<AlertMessage>();
  private defaultId = 'default-alert';

  constructor() {
    this.messageShown = this.messageSubject.asObservable();
  }

  onAlert(id: string = this.defaultId): Observable<AlertMessage> {
    return this.messageShown.pipe(filter(m => m && m.id === id));
  }

  success(message: string, options?: AlertMessageOptions): void {
    this.showAlertMessage(
      new AlertMessage({
        ...options,
        type: AlertMessageType.success,
        message
      }));
  }

  error(message: string, options?: AlertMessageOptions): void {
    this.showAlertMessage(
      new AlertMessage({
        ...options,
        type: AlertMessageType.error,
        message
      }));
  }

  info(message: string, options?: AlertMessageOptions): void {
    this.showAlertMessage(
      new AlertMessage({
        ...options,
        type: AlertMessageType.info,
        message
      }));
  }

  warn(message: string, options?: AlertMessageOptions): void {
    this.showAlertMessage(
      new AlertMessage({
        ...options,
        type: AlertMessageType.warning,
        message
      }));
  }

  replaceWithError(message: string, options?: AlertMessageOptions): void {
    this.clear();
    this.error(message, options);
  }

  clear(id: string = this.defaultId): void {
    this.messageSubject.next(new AlertMessage({ id }));
  }

  private showAlertMessage(alert: AlertMessage): void {
    alert.id = alert.id || this.defaultId;
    this.messageSubject.next(alert);
  }
}
