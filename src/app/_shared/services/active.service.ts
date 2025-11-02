import { Injectable } from '@angular/core';
import { User } from '../models';

@Injectable({
    providedIn: 'root'
})
export class ActiveService {
    private _activeUser: User = null;

    set activeUser(user: User) {
        this._activeUser = user;
    }

    get activeUser(): User {
        return this._activeUser;
    }

    clearData(): void {
        this.activeUser = null;
    }
}