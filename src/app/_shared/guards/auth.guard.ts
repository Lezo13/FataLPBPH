import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Auth, authState, User } from '@angular/fire/auth';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services';
import { ObjectUtils } from '../utils';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private auth: Auth, private authService: AuthService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkUser(route);
    }

    canLoad(state: Route): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkUser();
    }

    private checkUser(route?: ActivatedRouteSnapshot): Observable<boolean> {
        return authState(this.auth).pipe(
            map(user => {
                const isAuthorized: boolean = ObjectUtils.hasData(user);

                if (!isAuthorized) {
                    this.router.navigate(['/login']);
                    return false;
                }

                const containsRoute: boolean = ObjectUtils.hasData(route)
                const containsRouteRoles: boolean = ObjectUtils.hasData(route?.data['roles']);

                if (containsRoute && containsRouteRoles)
                    return this.checkRoles(route);

                return true;
            }));
    }

    private checkRoles(route: ActivatedRouteSnapshot): boolean {
        const allowedRoleIds: number[] = route.data['roles'];
        const userRoleIds: number[] = this.authService.getUser().roles;
        const isAllowed: boolean = allowedRoleIds.some(id => userRoleIds.includes(id))

        if (!isAllowed) {
            this.router.navigate(['not-found']);

            return false;
        }

        return true;
    }
}