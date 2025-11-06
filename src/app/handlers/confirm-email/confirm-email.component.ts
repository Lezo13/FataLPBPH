import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { ActionCodeInfo, applyActionCode, Auth, checkActionCode } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take, firstValueFrom } from 'rxjs';
import { SharedModule } from 'src/app/_shared';
import { UserHttpService } from 'src/app/_shared/services';
import { ObjectUtils } from 'src/app/_shared/utils';

@Component({
  selector: 'app-confirm-email',
  imports: [SharedModule, FormsModule, CommonModule],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss'
})
export class ConfirmEmailComponent implements OnInit {
  mode: string = '';
  oobCode: string = '';
  isLoading: boolean = true;
  isSuccess: boolean = false;
  errorMsg: string = 'An error occurred and we were unable to confirm your email. Please try again later.';

  private auth = inject(Auth);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userHttpService = inject(UserHttpService);

  ngOnInit(): void {
    this.mode = this.route.snapshot.queryParamMap.get('mode');
    this.oobCode = this.route.snapshot.queryParamMap.get('oobCode');

    if (ObjectUtils.hasData(this.oobCode))
      this.confirmEmail();
    else {
      this.isLoading = false;
      this.redirectToHome();
    }
  }

  private async confirmEmail(): Promise<void> {
    try {
      this.isLoading = true;

      const action: ActionCodeInfo = await checkActionCode(this.auth, this.oobCode);
      const oldEmail: string = action.data.previousEmail;
      const newEmail: string = action.data.email;

      await firstValueFrom(this.userHttpService.updateEmail(oldEmail, newEmail).pipe(take(1)));
      await applyActionCode(this.auth, this.oobCode);

      this.isLoading = false;
      this.isSuccess = true;

      this.redirectToHome();
    } catch (err) {
      const error = err as FirebaseError;
      this.errorMsg = this.getErrorMessage(error?.code);
      this.isLoading = false;
      this.isSuccess = false;
      this.redirectToHome();
    }
  }

  private redirectToHome(): void {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 5000);
  }

  private getErrorMessage(errorCode: string): string {
    let errorMessage: string = '';

    switch (this.mode) {
      case 'recoverEmail':
        if (errorCode === 'auth/email-already-in-use' || errorCode === 'auth/invalid-action-code') {
          errorMessage = 'Your email has already been updated to the new address. The undo link can no longer revert the change.';
        } else {
          errorMessage = 'An error occurred while processing your request. Please try again later.';
        }
        break;

      default:
      case 'verifyAndChangeEmail':
        errorMessage = 'An error occurred and we were unable to confirm your email. Please try again later.';
        break;
    }

    return errorMessage;
  }
}
