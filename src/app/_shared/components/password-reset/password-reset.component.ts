import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services';
import { FirebaseError } from '@angular/fire/app';
import { FirebaseErrorCode } from '../../enums';

@Component({
  selector: 'app-password-reset',
  standalone: false,
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent implements OnInit {
  @Output() onClosed: EventEmitter<void> = new EventEmitter<void>();

  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  isUpdating: boolean = false;
  isSubmitted: boolean = false;
  passwordMatch: boolean = true;
  validCurrentPassword: boolean = true;
  showResult: boolean = false;

  private authService = inject(AuthService);

  ngOnInit(): void {

  }

  update(valid: boolean): void {
    this.isSubmitted = true;
    this.validCurrentPassword = true;

    this.passwordMatch = this.newPassword === this.confirmNewPassword;

    if (!valid || !this.passwordMatch)
      return;


    this.isUpdating = true;

    this.authService.updatePassword(this.currentPassword, this.newPassword).then(() => {
      this.showResult = true;
      this.newPassword = null;
      this.confirmNewPassword = null;
    }).catch((error: FirebaseError) => {
      if (error.code === FirebaseErrorCode.invalidCredential)
        this.validCurrentPassword = false;
    })
      .finally(() => {
        this.isUpdating = false;
      });
  }

  cancel(): void {
    this.onClosed.emit();
  }
}
