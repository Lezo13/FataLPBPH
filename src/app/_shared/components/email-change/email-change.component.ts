import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AuthService, ComponentModalService } from '../../services';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationOptions } from '../../models';
import { FirebaseError } from '@angular/fire/app';
import { FirebaseErrorCode } from '../../enums';


@Component({
  selector: 'app-email-change',
  standalone: false,
  templateUrl: './email-change.component.html',
  styleUrl: './email-change.component.scss'
})
export class EmailChangeComponent implements OnInit {
  @Output() onClosed: EventEmitter<void> = new EventEmitter<void>();

  newEmail: string = '';
  currentPassword: string = '';

  isChanging: boolean = false;
  isSubmitted: boolean = false;
  validCurrentPassword: boolean = true;
  showResult: boolean = false;

  private authService = inject(AuthService);
  private modalService = inject(ComponentModalService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {

  }

  update(valid: boolean): void {
    this.isSubmitted = true;
    this.validCurrentPassword = true;
    
    if (!valid)
      return;

    this.isChanging = true;

    this.authService.verifyNewEmail(this.currentPassword, this.newEmail).then(() => {
      this.newEmail = null;
      this.showResult = true;
    }).catch((error: FirebaseError) => {
      if (error.code === FirebaseErrorCode.invalidCredential)
        this.validCurrentPassword = false;
    })
      .finally(() => {
        this.isChanging = false;
      });
  }

  cancel(): void {
    this.onClosed.emit();
  }
}
