import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { take } from 'rxjs';
import { AuthUser, User } from 'src/app/_shared/models';
import { ActiveService, AuthService, ComponentModalService } from 'src/app/_shared/services';
import { ObjectUtils } from 'src/app/_shared/utils';

@UntilDestroy()
@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
  standalone: false
})
export class UserMenuComponent implements OnInit {
   @Output() onClosed = new EventEmitter<void>();

  user: User = null;
  profileImgUrl: string = 'assets/images/no_user_img.png';

  private authService = inject(AuthService);

  constructor(
    private activeService: ActiveService,
    private modalService: ComponentModalService
  ) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(): void {
    this.user = this.activeService.activeUser;
    this.profileImgUrl = ObjectUtils.hasData(this.user?.profilePictureUrl) ? this.user?.profilePictureUrl : 'assets/images/no_user_img.png';
  }

  logout(): void {
    this.authService.logout();
  }

  getUserFullName(): string {
    return `${this.user?.firstName} ${this.user?.lastName}`;
  }

  goToProfile(): void {

  }

  invite(): void {
    this.onClosed.emit();
    this.modalService.showInvitationFormModal().then(() => {

    });
  }
}
