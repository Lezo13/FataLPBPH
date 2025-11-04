import { Component, inject, OnInit } from '@angular/core';
import { MatchHttpService } from '../_shared/services';
import { take } from 'rxjs';
import { Match } from '../_shared/models';
import { DateUtils, MiscUtils, ObjectUtils } from '../_shared/utils';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: false
})
export class HomeComponent implements OnInit {
    nextMatch: Match = null;
    nextMatchLoading: boolean = true;
    nextMatchTeamOneLogoUrl: string = '';
    nextMatchTeamTwoLogoUrl: string = '';

    readonly discordLink: string = 'https://discord.gg/VSv6CD2FyX';
    readonly youtubeLink: string = 'https://youtube.com/@DragonEdge';
    readonly facebookLink: string = 'https://facebook.com/FataLPBPH';

    private router = inject(Router);
    private matchHttpService = inject(MatchHttpService);

    ngOnInit(): void {
        this.loadNextMatch();
    }

    checkLiveMatch(): boolean {
        if (ObjectUtils.isEmpty(this.nextMatch))
            return false;

        return MiscUtils.checkLiveMatch(this.nextMatch.matchStartDate, this.nextMatch.matchEndDate);
    }

    navigateToTeam(): void {
        this.router.navigate(['/team']);
    }

    private loadNextMatch(): void {
        this.nextMatchLoading = true;

        this.matchHttpService.getNextMatch()
            .pipe(take(1))
            .subscribe((match: Match) => {
                this.nextMatch = match;

                if (ObjectUtils.hasData(this.nextMatch)) {
                    this.nextMatchTeamOneLogoUrl = ObjectUtils.hasData(this.nextMatch.teamOneLogoUrl) ? this.nextMatch.teamOneLogoUrl : `https://placehold.co/80x80/0a0a0a/FFFFFF?text=${MiscUtils.getTeamInitials(this.nextMatch.teamOneName)}`;
                    this.nextMatchTeamTwoLogoUrl = ObjectUtils.hasData(this.nextMatch.teamTwoLogoUrl) ? this.nextMatch.teamTwoLogoUrl : `https://placehold.co/80x80/0a0a0a/FFFFFF?text=${MiscUtils.getTeamInitials(this.nextMatch.teamTwoName)}`;
                }
            })
            .add(() => {
                this.nextMatchLoading = false;
            });
    }
}
