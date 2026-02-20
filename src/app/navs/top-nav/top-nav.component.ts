import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
;
import { ADMIN_TOPNAV_ITEMS, CLIENT_TOPNAV_ITEMS, LOGIN_DEFAULT_LOGO } from 'src/app/_shared/constants';
import { RoleEnum } from 'src/app/_shared/enums';
import { Role, NavItem, User } from 'src/app/_shared/models';
import { ActiveService, AuthService } from 'src/app/_shared/services';
import { ObjectUtils } from 'src/app/_shared/utils';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  standalone: false
})
export class TopNavComponent implements OnInit {
  @Input() isAuthenticated!: boolean;
  @Input() isNavbarShown!: boolean;
  @Input() isNavbarCollapsed!: boolean;
  @Output() onPortalSwitched: EventEmitter<number> = new EventEmitter<number>();

  adminTabs: NavItem[] = ADMIN_TOPNAV_ITEMS;
  clientTabs: NavItem[] = CLIENT_TOPNAV_ITEMS;
  portalImgUrl: string = LOGIN_DEFAULT_LOGO;
  portalName: string = '';
  user: User;
  profileImgUrl: string = 'src/assets/images/no_user_img.png';
  selectedPortalId: number = 0;
  topNavHeaderText!: string;
  role: Role;
  title: string;
  hasAdminAccess: boolean = false;

  private activeService = inject(ActiveService);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.user = this.activeService.activeUser;
    this.profileImgUrl = ObjectUtils.hasData(this.user?.profilePictureUrl) ? this.user?.profilePictureUrl : 'assets/images/no_user_img.png';

    if (this.isAuthenticated)
      this.hasAdminAccess = this.authService.isInRoles([RoleEnum.Admin, RoleEnum.Moderator]);
  }

  isOnAdminSide(): boolean {
    return this.router.url.startsWith("/admin");
  }
}
