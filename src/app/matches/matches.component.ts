import { Component, inject, OnInit } from '@angular/core';
import { MatchHttpService } from '../_shared/services';
import { Match } from '../_shared/models';
import { take } from 'rxjs';
import { MiscUtils, ObjectUtils } from '../_shared/utils';

@Component({
  selector: 'app-matches',
  standalone: false,
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.scss'
})
export class MatchesComponent implements OnInit {
  finishedMatches: Match[] = [];
  upcomingMatches: Match[] = [];

  isLoading: boolean = true;

  private matchHttpService = inject(MatchHttpService);

  ngOnInit(): void {
    this.loadMatches();
  }

  getTeamLogoUrl(teamName: string, teamLogoUrl: string): string {
    return ObjectUtils.hasData(teamLogoUrl) ? teamLogoUrl : `https://placehold.co/80x80/0a0a0a/FFFFFF?text=${MiscUtils.getTeamInitials(teamName)}`;
  }

  checkLiveMatch(match: Match): boolean {
    if (ObjectUtils.isEmpty(match))
      return false;

     return MiscUtils.checkLiveMatch(match.matchStartDate, match.matchEndDate);
  }

  private loadMatches(): void {
    const today = new Date();

    this.isLoading = true;

    this.matchHttpService.getAllMatches()
      .pipe((take(1)))
      .subscribe((matches: Match[]) => {

        if (ObjectUtils.hasData(matches)) {
          this.finishedMatches = matches.filter(m => m.matchEndDate < today && m.matchStatus !== 'UPCOMING');
          this.upcomingMatches = matches.filter(m => m.matchStartDate >= today && m.matchStatus === 'UPCOMING');

          if (ObjectUtils.hasData(this.finishedMatches))
            this.finishedMatches = this.finishedMatches.sort((a, b) => new Date(b.matchStartDate).getTime() - new Date(a.matchStartDate).getTime());

          if (ObjectUtils.hasData(this.upcomingMatches))
            this.upcomingMatches = this.upcomingMatches.sort((a, b) => new Date(a.matchStartDate).getTime() - new Date(b.matchStartDate).getTime());
        }

      }).add(() => {
        this.isLoading = false;
      });
  }
}
