import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, empty, switchMap, take } from 'rxjs';
import { InvitationCode, ModalOptions } from 'src/app/_shared/models';
import { AuthService, InvitationCodeHttpService } from 'src/app/_shared/services';
import { DateUtils, MiscUtils, ObjectUtils } from 'src/app/_shared/utils';

@Component({
  selector: 'app-invitation-form',
  standalone: false,
  templateUrl: './invitation-form.component.html',
  styleUrl: './invitation-form.component.scss'
})
export class InvitationFormComponent implements OnInit {
  @ViewChild('copyPopover', { static: false }) copyPopover!: NgbPopover;
  @Input() data!: ModalOptions;

  inviteCode: string = '';
  expirationDate: Date;
  isLoading: boolean = true;
  showSuccessCopy: boolean = false;

  constructor(
    private authService: AuthService,
    public modalInstance: NgbActiveModal,
    private invitationCodeHttpService: InvitationCodeHttpService
  ) { }

  ngOnInit(): void {
    this.createInvite();
  }

  createInvite(): void {
    this.isLoading = true;

    const today: Date = new Date();

    this.inviteCode = MiscUtils.generateRandomString(8, 8);
    this.expirationDate = DateUtils.addDays(today, 7);

    const invite: InvitationCode = {
      inviteCode: this.inviteCode,
      expirationDate: this.expirationDate,
      isUsed: false,
      createdBy: this.authService.getUser()?.username
    };

    this.invitationCodeHttpService.insertInvite(invite)
      .pipe(take(1))
      .subscribe(() => { })
      .add(() => {
        this.isLoading = false;
      });
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.inviteCode)
      .then(() => {
        this.showSuccessCopy = true;

        setTimeout(() => {
          this.showSuccessCopy = false;
        }, 2000);
      })
      .catch((error) => {
      });
  }
}
