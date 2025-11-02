import { AlertMessageType } from '../enums';

export interface AlertMessageOptions {
  id?: string;
  autoClose?: boolean;
  keepAfterRouteChange?: boolean;
  dismissible?: boolean;
}

export class AlertMessage {
  id = '';
  type = AlertMessageType.success;
  message = '';
  autoClose = false;
  keepAfterRouteChange? = false;
  fade = true;
  dismissible = false;

  constructor(init: Partial<AlertMessage>) {
    Object.assign(this, init);
  }
}
