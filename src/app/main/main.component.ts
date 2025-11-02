import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';

import { fadeNoLeaveAnimation } from '../_shared/animations';
import { NavEventsService } from '../_shared/services/events';
import { filter, take } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TopNavComponent } from '../navs/top-nav/top-nav.component';
import { Auth, authState, User as FirebaseUser } from '@angular/fire/auth';
import { ObjectUtils } from '../_shared/utils';
import { ActiveService, AuthService, UserHttpService } from '../_shared/services';
import { AuthUser, User } from '../_shared/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [fadeNoLeaveAnimation],
  standalone: false
})
export class MainComponent implements OnInit {
  @ViewChild(TopNavComponent) topNav: TopNavComponent;
  isLoading: boolean = false;
  isNavbarShown = true;
  isNavbarCollapsed = false;
  isRouteFullPage: boolean = false;
  isAuthenticated: boolean = false;
  authUser: AuthUser;
  topNavHeaderText = 'Home';
  screenWidth = 0;
  previousWidth = 0;
  currentYear: number;

  private activatedRoute = inject(ActivatedRoute);
  private activeService = inject(ActiveService);
  private auth = inject(Auth);
  private authService = inject(AuthService);
  private router = inject(Router);
  private navEventsService = inject(NavEventsService);
  private userHttpService = inject(UserHttpService);

  constructor() {
    this.onResize();
    this.toggleNavbarListener();
    this.setupAuthStateSubscription();
    this.setupRouteSubscription();
  }

  ngOnInit(): void {
    this.authUser = this.authService.getUser();
    this.setUI();
    this.loadUser();
  }

  setUI(): void {
    this.currentYear = new Date().getFullYear();
  }

  setupRouteSubscription(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        let route = this.activatedRoute.firstChild;
        while (route?.firstChild) {
          route = route.firstChild;
        }
        this.isRouteFullPage = route?.snapshot.data['fullPage'] || false;
      });
  }

  /**
   * ! OnResize should only be used when there is a value in .ts
   * ! that relies on the screen size. An example is the number
   * ! of characters to truncate in a string if the screen size changes.
   * ! This should not be used to show or hide elements in view!
   * ! A better way is to utilize screen media queries in .scss.
   */
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.previousWidth = this.screenWidth;
    this.screenWidth = window.innerWidth;
    this.isNavbarShown = this.screenWidth > 991;
    // Increase in size
    if (this.previousWidth < this.screenWidth && this.isNavbarShown) {
      this.isNavbarCollapsed = false;
    }
    // Decrease in size
    else if (!this.isNavbarShown) {
      this.isNavbarCollapsed = true;
    }
  }

  toggleNavbarListener(): void {
    this.navEventsService.toggled.subscribe({
      next: () => {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
      },
      error: () => {

      }
    });
  }

  isOnAdminSide(): boolean {
    return this.router.url.startsWith("/admin");
  }

  private loadUser(): void {
    if (ObjectUtils.isEmpty(this.authUser))
      return;

    this.isLoading = true;

    this.userHttpService.getUser(this.authUser.username)
      .pipe(take(1))
      .subscribe((user: User) => {
        this.activeService.activeUser = user;
      }).add(() => {
        this.isLoading = false;
      });
  }

  private setupAuthStateSubscription(): void {
    authState(this.auth)
      .pipe(take(1))
      .subscribe((user: FirebaseUser) => {
        this.isAuthenticated = ObjectUtils.hasData(user);
      })
  }
}
