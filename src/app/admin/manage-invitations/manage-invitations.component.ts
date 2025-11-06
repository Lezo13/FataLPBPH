import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { ConfirmationOptions, InvitationCode } from 'src/app/_shared/models';
import { ComponentModalService, InvitationCodeHttpService } from 'src/app/_shared/services';
import { ObjectUtils } from 'src/app/_shared/utils';

@Component({
  selector: 'app-manage-invitations',
  standalone: false,
  templateUrl: './manage-invitations.component.html',
  styleUrl: './manage-invitations.component.scss'
})
export class ManageInvitationsComponent implements OnInit {
  invites: InvitationCode[] = [];
  inactiveInvites: InvitationCode[] = [];

  isLoading: boolean = true;
  hasInactiveInvites: boolean = false;

  private modalService = inject(ComponentModalService);
  private invitationCodeHttpService = inject(InvitationCodeHttpService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadInvites();
  }

  deleteInactiveInvites(): void {
    const options: ConfirmationOptions = {
      title: `Delete ${this.inactiveInvites?.length} Inactive Invites`,
      message: `Are you sure you want to delete ${this.inactiveInvites?.length} inactive invites?`,
      warningMessage: 'This action cannot be undone.',
      confirmText: 'Yes',
      declineText: 'No'
    };

    this.modalService.showConfirmationModal(options, false).then(result => {
      if (result) {
        this.setInactiveInvitesLoading(true);

        this.invitationCodeHttpService.deleteInactiveInvites()
          .pipe((take(1)))
          .subscribe(() => {
            this.toastr.success(`Successfully deleted ${this.inactiveInvites?.length} inactive invites`);
            this.invites = this.invites.filter(i => !this.inactiveInvites.some(ic => ic.inviteCode === i.inviteCode));
            this.inactiveInvites = [];
          }).add(() => {
            this.setInactiveInvitesLoading(false);
          });
      }
    }).catch(() => { });
  }

  promptDeleteInvite(invite: InvitationCode): void {
    const options: ConfirmationOptions = {
      title: 'Delete Invitation',
      message: `Are you sure you want to delete invitation?`,
      warningMessage: 'This action cannot be undone.',
      confirmText: 'Yes',
      declineText: 'No'
    };

    this.modalService.showConfirmationModal(options, false).then(result => {
      if (result) {
        this.deleteInvite(invite);
      }
    }).catch(() => { });
  }

  private loadInvites(): void {
    this.isLoading = true;

    this.invitationCodeHttpService.getAllInvites()
      .pipe((take(1)))
      .subscribe((invites: InvitationCode[]) => {
        this.invites = invites;

        const dateToday: Date = new Date();
        this.inactiveInvites = invites.filter(i => !i.isUsed && i.expirationDate < dateToday);
        this.hasInactiveInvites = ObjectUtils.hasData(this.inactiveInvites);
      }).add(() => {
        this.isLoading = false;
      });
  }

  private deleteInvite(invite: InvitationCode): void {
    invite.isLoading = true;

    this.invitationCodeHttpService.deleteInvite(invite.inviteCode)
      .pipe((take(1)))
      .subscribe(() => {
        this.invites = this.invites.filter(m => m.inviteCode !== invite.inviteCode);
        this.toastr.success(`Successfully deleted invitation`);
      }).add(() => {
        invite.isLoading = false;
      });
  }

  private setInactiveInvitesLoading(flag: boolean): void {
    this.invites.forEach(invite => {
      if (this.inactiveInvites.some(i => invite.inviteCode === i.inviteCode))
        invite.isLoading = flag;
    });
  }
}
