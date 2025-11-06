import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { MatchFormModalOptions, Match, FileExtended, PrimeDropdownItem } from 'src/app/_shared/models';
import { ERROR_RESPONSES } from 'src/app/_shared/records';
import { MatchHttpService } from 'src/app/_shared/services';
import { MiscUtils, ObjectUtils } from 'src/app/_shared/utils';

@Component({
  selector: 'app-match-form',
  standalone: false,
  templateUrl: './match-form.component.html',
  styleUrl: './match-form.component.scss'
})
export class MatchFormComponent implements OnInit {
  @ViewChild('matchForm') form!: NgForm;
  @Input() data!: MatchFormModalOptions;
  matchId: string = null;
  match: Match;
  teamOneLogoFile: FileExtended = null;
  teamTwoLogoFile: FileExtended = null;
  statuses: PrimeDropdownItem[] = [];

  isEditing: boolean = false;
  isLoading: boolean = true;
  isSubmitted: boolean = false;
  isSaving: boolean = false;

  constructor(
    public modalInstance: NgbActiveModal,
    private matchHttpService: MatchHttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.matchId = this.data.matchId;
    this.isEditing = ObjectUtils.hasData(this.matchId);
    this.initializeData();
    this.loadLists();

    if (this.isEditing)
      this.loadData();
    else
      this.isLoading = false;
  }

  async save(): Promise<void> {
    this.isSubmitted = true;

    if (!this.form.form?.valid)
      return;

    if (ObjectUtils.hasData(this.teamOneLogoFile)) {
      const imageBase64: string = await MiscUtils.fileToBase64(this.teamOneLogoFile) as string;
      this.match.teamOneLogoUrl = imageBase64;
    }

    if (ObjectUtils.hasData(this.teamTwoLogoFile)) {
      const imageBase64: string = await MiscUtils.fileToBase64(this.teamTwoLogoFile) as string;
      this.match.teamTwoLogoUrl = imageBase64;
    }

    if (this.isEditing)
      this.updateMatch();
    else
      this.insertMatch();
  }

  clearTeamOneLogoFile(): void {
    this.match.teamOneLogoUrl = null;
  }

  clearTeamTwoLogoFile(): void {
    this.match.teamTwoLogoUrl = null;
  }

  private initializeData(): void {
    this.match = {
      matchId: null,
      matchFormat: 'BO1',
      matchPhase: 'Eliminations',
      tournamentName: '',
      matchStartDate: null,
      matchEndDate: null,
      teamOneName: '',
      teamOneScore: 0,
      teamOneLogoUrl: '',
      teamTwoName: '',
      teamTwoScore: 0,
      teamTwoLogoUrl: '',
      matchStatus: 'UPCOMING'
    };
  }

  private loadData(): void {
    this.isLoading = true;

    this.matchHttpService.getMatch(this.matchId)
      .pipe(take(1))
      .subscribe({
        next: (match) => {
          this.match = match;
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(ERROR_RESPONSES[error.status]);
        }
      }).add(() => {
        this.isLoading = false;
      });
  }

  private insertMatch(): void {
    this.isSaving = true;

    this.matchHttpService.insertMatch(this.match)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.modalInstance.close();
          this.toastr.success(`Successfully added ${this.match?.tournamentName} - ${this.match.teamOneName} vs ${this.match.teamTwoName}`);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(ERROR_RESPONSES[error.status]);
        }
      }).add(() => {
        this.isSaving = false;
      });
  }

  private updateMatch(): void {
    this.isSaving = true;

    this.matchHttpService.updateMatch(this.match)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.modalInstance.close();
          this.toastr.success(`Successfully updated ${this.match?.tournamentName} - ${this.match.teamOneName} vs ${this.match.teamTwoName}`);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(ERROR_RESPONSES[error.status]);
        }
      }).add(() => {
        this.isSaving = false;
      });
  }

  private loadLists(): void {
    this.statuses = [
      { name: 'UPCOMING', value: 'UPCOMING' },
      { name: 'WIN', value: 'WIN' },
      { name: 'DRAW', value: 'DRAW' },
      { name: 'LOSE', value: 'LOSE' }
    ]
  }
}
