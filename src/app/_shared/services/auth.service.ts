import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { User, UserRole, AuthUser } from '../models';
import { Auth, signInWithEmailAndPassword, User as FirebaseUser, authState } from '@angular/fire/auth';
import { Firestore, collection, query, where, getDocs, collectionData } from '@angular/fire/firestore';
import { RoleEnum } from '../enums';
import { DateUtils, ObjectUtils, RoleUtils } from '../utils';
import { AuthCookieService } from './cookies/auth-cookie.service';
import { CurrentStateCookieService } from './cookies';
import { UserHttpService } from './http';
import { firstValueFrom } from 'rxjs';
import { JwtUtils } from '../utils/jwt.utils';
import { AUTH_TOKEN_EXPIRATION_DAYS } from '../constants';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private auth: Auth,
        private firestore: Firestore,
        private userHttpService: UserHttpService,
        private router: Router,
        private authCookieService: AuthCookieService,
        private currentStateCookieService: CurrentStateCookieService
    ) { }


    async login(username: string, password: string): Promise<void> {
        let user: User = null;

        try {
            user = await firstValueFrom(this.userHttpService.getUser(username));
        } catch (ex) {
               throw new Error("Invalid login");
        }


        if (ObjectUtils.isEmpty(user))
            throw new Error("Invalid login");

        return signInWithEmailAndPassword(this.auth, user.email, password)
            .then((userCredential) => {

                const authUser: AuthUser = {
                    username: user.username,
                    email: user.email,
                    roles: user.roles
                };

                const dateToday: Date = new Date();
                const accessToken: string = JwtUtils.encode(authUser);
                const accessTokenExpiry: Date = DateUtils.addDays(dateToday, AUTH_TOKEN_EXPIRATION_DAYS);
                this.authCookieService.setAuthToken(accessToken, accessTokenExpiry);
            })
            .catch((error) => {
                // Optionally handle/log the error before rethrowing
                throw new Error(error.message || 'Login failed');
            });
    }

    logout(): void {
        this.auth.signOut();
        this.authCookieService.clearAuthToken();
        this.currentStateCookieService.clearCurrentStateData();
        this.router.navigate(['/login']);
    }

    getAccessToken(): string {
        return this.authCookieService.getAuthToken();
    }
    getUser(): AuthUser {
        const token: string = this.getAccessToken();

        if (ObjectUtils.isEmpty(token))
            return null;

        const jwt: JwtHelperService = new JwtHelperService();
        const decoded: Object = jwt.decodeToken(token);

        const result: AuthUser = {
            username: decoded['username'],
            email: decoded['email'],
            roles: decoded['roles']
        };

        return result;
    }

    getRoles(): number[] {
        return this.getUser().roles;
    }

    getMaxRole(): number {
        const currentRoles: number[] = this.getRoles();
        const maxRole: number = RoleUtils.getMaxRole(currentRoles);
        return maxRole;
    }

    isMaxRole(roleEnum: RoleEnum): boolean {
        const roleId: number = roleEnum as number;
        const currentRoles: number[] = this.getRoles();
        const maxRole: number = RoleUtils.getMaxRole(currentRoles);
        return roleId == maxRole;
    }

    isMaxRoles(roleEnum: RoleEnum[]): boolean {
        const roleIds: number[] = roleEnum.map(x => x as number);
        const currentRoles: number[] = this.getRoles();
        const maxRole: number = RoleUtils.getMaxRole(currentRoles);
        return roleIds.some(r => r == maxRole);
    }

    isInRole(roleEnum: RoleEnum): boolean {
        const currentRoles: number[] = this.getRoles();

        if (!ObjectUtils.hasData(currentRoles))
            return false;

        const roleId: number = roleEnum as number;
        const roleExists: boolean = currentRoles.some(role => role == roleId);
        return roleExists
    }

    isInRoles(roleEnums: RoleEnum[]): boolean {
        const currentRoles: number[] = this.getRoles();

        if (!ObjectUtils.hasData(currentRoles))
            return false;

        const roleIds: number[] = roleEnums.map(r => r as number);
        return currentRoles.some(role => roleIds.includes(role));
    }
}
