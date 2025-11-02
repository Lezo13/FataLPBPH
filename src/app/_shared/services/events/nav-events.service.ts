import { EventEmitter, Injectable } from '@angular/core';
import { AuthUser } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class NavEventsService {
  // Toggle for collapse/Expand
  public toggled: EventEmitter<void> = new EventEmitter<void>();
  // User! has been initialized, pass the observable so main.component.html can async pipe the value
  //  This event will only be emitted when the user logs in
  public userInitialized: EventEmitter<AuthUser> = new EventEmitter<AuthUser>();
  public portalUpdated: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

}
