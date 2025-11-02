import { Injectable } from '@angular/core';
import { AUTH_TOKEN_KEY } from '../../constants';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthCookieService {
    constructor(
        private cookieService: CookieService
    ) { }

    getAuthToken(): string {
        return this.cookieService.get(AUTH_TOKEN_KEY);
    }

    setAuthToken(token: string, expiryDate: Date): void {
        this.cookieService.set(AUTH_TOKEN_KEY, token, expiryDate, '/', null, true, "None");
    }

    clearAuthToken(): void {
        this.cookieService.delete(AUTH_TOKEN_KEY, '/');
    }
}