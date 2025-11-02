import { Injectable } from '@angular/core';
import { encode, decode } from 'base-64';
import { CURRENT_STATE_EXPIRATION_DAYS, CURRENT_STATE_TOKEN_KEY } from '../../constants';
import { CookieService } from 'ngx-cookie-service';
import { CurrentStateData, DashboardStateData } from '../../models';
import { DateUtils, ObjectUtils } from '../../utils';

@Injectable({
    providedIn: 'root'
})
export class CurrentStateCookieService {
    set portalId(portalId: number) {
        const currentStateData: CurrentStateData = this.getCurrentStateData();
        currentStateData.portalId = portalId;
        this.setCurrentStateData(currentStateData);
    }

    get portalId(): number {
        const currentStateData: CurrentStateData = this.getCurrentStateData();
        return currentStateData.portalId;
    }

    set dashboard(dashboard: DashboardStateData) {
        const currentStateData: CurrentStateData = this.getCurrentStateData();
        currentStateData.dashboard = dashboard;
        this.setCurrentStateData(currentStateData);
    }

    get dashboard(): DashboardStateData {
        const currentStateData: CurrentStateData = this.getCurrentStateData();
        return currentStateData.dashboard;
    }

    constructor(
        private cookieService: CookieService
    ) { }


    clearCurrentStateData(): void {
        this.cookieService.delete(CURRENT_STATE_TOKEN_KEY, '/');
    }

    private getCurrentStateData(): CurrentStateData {
        const jsonString: string = this.cookieService.get(CURRENT_STATE_TOKEN_KEY);
        const decodedString: string = decode(jsonString);
        const data: CurrentStateData = ObjectUtils.hasData(decodedString) ? JSON.parse(decodedString) : {};
        return data;
    }

    private setCurrentStateData(data: CurrentStateData): void {
        const jsonString: string = JSON.stringify(data);
        const encodedString: string = encode(jsonString);
        const dateToday: Date = new Date();
        const expirationDate: Date = DateUtils.addDays(dateToday, CURRENT_STATE_EXPIRATION_DAYS);
        this.cookieService.set(CURRENT_STATE_TOKEN_KEY, encodedString, expirationDate, '/', null, true, "None");
    }
}