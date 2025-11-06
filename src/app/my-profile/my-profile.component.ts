import { Component, inject, OnInit } from '@angular/core';
import { FileExtended, User } from '../_shared/models';
import { AuthService, UserHttpService } from '../_shared/services';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MiscUtils, ObjectUtils } from '../_shared/utils';

@Component({
  selector: 'app-my-profile',
  standalone: false,
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent implements OnInit {
  user: User = {} as User;
  profileImageFile: FileExtended;
  tabIndex: number = 0;

  isLoading: boolean = false;
  isSaving: boolean = false;
  isSubmitted: boolean = false;
  showPasswordPanel: boolean = false;
  showEmailChangePanel: boolean = false;
  showProfilePanel: boolean = true;

  private authService = inject(AuthService);
  private userHttpService = inject(UserHttpService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadUser();
  }

  clearImageFile(): void {
    this.user.profilePictureUrl = null;
  }

  async save(valid: boolean): Promise<void> {
    this.isSubmitted = true;

    if (!valid)
      return;

    if (ObjectUtils.hasData(this.profileImageFile)) {
      const imageBase64: string = await MiscUtils.fileToBase64(this.profileImageFile) as string;
      this.user.profilePictureUrl = imageBase64;
    }

    this.saveUser();
  }

  openPasswordPanel(): void {
    this.showProfilePanel = false;
    this.showPasswordPanel = true;
  }

  openEmailPanel(): void {
    this.showProfilePanel = false;
    this.showEmailChangePanel = true;
  }

  closePasswordPanel(): void {
    this.showProfilePanel = true;
    this.showPasswordPanel = false;
  }

  closeEmailPanel(): void {
    this.showProfilePanel = true;
    this.showEmailChangePanel = false;
  }

  private loadUser(): void {
    const username: string = this.authService.getUser()?.username;

    this.isLoading = true;

    this.userHttpService.getUser(username)
      .pipe((take(1)))
      .subscribe((user: User) => {
        this.user = user;
      }).add(() => {
        this.isLoading = false;
      });
  }

  private saveUser(): void {
    this.isSaving = true;

    this.userHttpService.updateUser(this.user)
      .pipe((take(1)))
      .subscribe(() => {
        this.toastr.success("Profile successfully saved");
      }).add(() => {
        this.isSaving = false;
      });
  }
}
