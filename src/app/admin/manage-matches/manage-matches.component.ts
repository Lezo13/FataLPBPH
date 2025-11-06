import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { ConfirmationOptions, Match, MatchFormModalOptions } from 'src/app/_shared/models';
import { ComponentModalService, MatchHttpService } from 'src/app/_shared/services';

@Component({
  selector: 'app-manage-matches',
  standalone: false,
  templateUrl: './manage-matches.component.html',
  styleUrl: './manage-matches.component.scss'
})
export class ManageMatchesComponent implements OnInit {
  matches: Match[] = [];

  isLoading: boolean = true;
  isDataLoading: boolean = false;

  private modalService = inject(ComponentModalService);
  private matchHttpService = inject(MatchHttpService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadMatches();
  }

  addMatch(): void {
    const options: MatchFormModalOptions = {
      title: 'Add Match',
      matchId: null
    };

    this.modalService.showMatchFormModal(options).then(result => {
      this.loadMatches();
    }).catch(() => { });
  }

  editMatch(match: Match): void {
    const options: MatchFormModalOptions = {
      title: 'Edit Match',
      matchId: match.matchId
    };

    this.modalService.showMatchFormModal(options).then(result => {
      this.loadMatches();
    }).catch(() => { });
  }

  promptDeleteMatch(match: Match): void {
    const options: ConfirmationOptions = {
      title: 'Delete Player',
      message: `Are you sure you want to delete ${match.tournamentName} - ${match.teamOneName} vs ${match.teamTwoName}?`,
      warningMessage: 'This action cannot be undone.',
      confirmText: 'Yes',
      declineText: 'No'
    };

    this.modalService.showConfirmationModal(options, false).then(result => {
      if (result) {
        this.deleteMatch(match);
      }
    }).catch(() => { });
  }

  getStatusSeverity(matchStatus: string): 'info' | 'success' | 'danger' | 'secondary' {
    switch (matchStatus) {
      default:
      case 'UPCOMING':
        return 'info';
      case 'WIN':
        return 'success';
      case 'LOSE':
        return 'danger';
      case 'DRAW':
        return 'secondary';

    }
  }

  private loadMatches(): void {
    this.isLoading = true;

    this.matchHttpService.getAllMatches()
      .pipe((take(1)))
      .subscribe((matches: Match[]) => {
        this.matches = matches;
      }).add(() => {
        this.isLoading = false;
      });
  }

  private deleteMatch(match: Match): void {
    match.isLoading = true;

    this.matchHttpService.deleteMatch(match.matchId)
      .pipe((take(1)))
      .subscribe(() => {
        this.matches = this.matches.filter(m => m.matchId !== match.matchId);
        this.toastr.success(`Successfully deleted ${match.tournamentName} - ${match.teamOneName} vs ${match.teamTwoName}`);
      }).add(() => {
        match.isLoading = false;
      });
  }
}
