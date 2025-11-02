import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabEventsService {
  public topTabNavigated: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }
}
