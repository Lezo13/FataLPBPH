import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../_shared';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, InvitationCodeHttpService, UserHttpService } from '../_shared/services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvitationCode, User } from '../_shared/models';
import { concatMap, finalize, forkJoin, from, switchMap, take, tap } from 'rxjs';
import { ObjectUtils } from '../_shared/utils';
import { HttpErrorResponse } from '@angular/common/http';
import { ERROR_RESPONSES } from '../_shared/records';

@Component({
  selector: 'app-register',
  imports: [SharedModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  invitationCode: string = '';
  user: User;
  password: string = '';
  inviteErrorMsg: string = 'The invitation code is invalid.';
  isSubmitted: boolean = false;
  isValidatingEmail: boolean = false;
  emailExists: boolean = false;
  isValidatingUsername: boolean = false;
  usernameExists: boolean = false;
  isRegistering: boolean = false;
  registerFailed: boolean = false;
  isVerifyingCode: boolean = false;
  validInvitationCode: boolean = false;
  isValidatedCode: boolean = false;

  constructor() {

  }

  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private invitationCodeHttpService = inject(InvitationCodeHttpService);
  private userHttpService = inject(UserHttpService);

  ngOnInit(): void {
    this.initializeUser();
  }

  verifyInvitationCode(valid: boolean): void {
    if (!valid)
      return;

    this.isValidatedCode = false;
    this.isVerifyingCode = true;

    const today: Date = new Date();

    this.invitationCodeHttpService.getInvitationCode(this.invitationCode)
      .pipe(take(1))
      .subscribe((invite: InvitationCode) => {
        this.validInvitationCode = ObjectUtils.hasData(invite) && today <= invite.expirationDate && !invite.isUsed;

        if (ObjectUtils.isEmpty(invite))
          this.inviteErrorMsg = "The invitation code is invalid";
        else if (invite.isUsed)
          this.inviteErrorMsg = "The invitation code has already been used.";
        else if (today > invite.expirationDate)
          this.inviteErrorMsg = "The invitation code has already expired.";
        else this.inviteErrorMsg = "";
      }).add(() => {
        this.isVerifyingCode = false;
        this.isValidatedCode = true;
      });
  }

  register(valid: boolean): void {
    this.isSubmitted = true;

    if (!valid)
      return;

    this.isRegistering = true;

    from(this.authService.register(this.user.email, this.password)).pipe(
      concatMap(() => this.invitationCodeHttpService.setInviteCodeUsed(this.invitationCode)),
      concatMap(() => this.userHttpService.insertUser(this.user)),
      concatMap(() => from(this.authService.login(this.user.username, this.password))),
      finalize(() => this.isRegistering = false)
    ).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (error: any) => this.toastr.error(error?.message || 'Something went wrong')
    });

  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  validateUsername(valid: boolean): void {
    if (ObjectUtils.isEmpty(this.user.username) || !valid)
      return;

    this.usernameExists = false;
    this.isValidatingUsername = true;

    this.userHttpService.usernameExists(this.user.username)
      .pipe(take(1))
      .subscribe((exists: boolean) => {
        this.usernameExists = exists;
      }).add(() => {
        this.isValidatingUsername = false;
      });
  }

  validateEmail(valid: boolean): void {
    if (ObjectUtils.isEmpty(this.user.email) || !valid)
      return;

    this.emailExists = false;
    this.isValidatingEmail = true;

    this.userHttpService.emailExists(this.user.email)
      .pipe(take(1))
      .subscribe((exists: boolean) => {
        this.emailExists = exists;
      }).add(() => {
        this.isValidatingEmail = false;
      });
  }

  private initializeUser(): void {
    this.user = {
      username: null,
      firstName: '',
      lastName: '',
      email: null,
      ingameName: '',
      profilePictureUrl: '',
      roles: []
    };
  }
}
