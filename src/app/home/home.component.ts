import { Component, inject, OnInit } from '@angular/core';
import { MatchHttpService } from '../_shared/services';
import { take } from 'rxjs';
import { Match } from '../_shared/models';
import { DateUtils, ObjectUtils } from '../_shared/utils';
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

        const now: Date = new Date();
        const preStart: Date = DateUtils.addMinutes(this.nextMatch.matchStartDate, 15);
        return now >= preStart && now <= this.nextMatch.matchEndDate;
    }

    navigateToTeam(): void {
        this.router.navigate(['/team']);
    }

    private getTeamInitials(teamName: string): string {
        const words = teamName.trim().split(' ');

        if (words.length === 1) {
            // Only one word → take first letter
            return words[0].charAt(0).toUpperCase();
        }

        // Two or more words → take first letter of first two words
        return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }


    private loadNextMatch(): void {
        this.nextMatchLoading = true;

        this.matchHttpService.getNextMatch()
            .pipe(take(1))
            .subscribe((match: Match) => {
                this.nextMatch = match;

                if (ObjectUtils.hasData(this.nextMatch)) {
                    this.nextMatchTeamOneLogoUrl = ObjectUtils.hasData(this.nextMatch.teamOneLogoUrl) ? this.nextMatch.teamOneLogoUrl : `https://placehold.co/80x80/0a0a0a/FFFFFF?text=${this.getTeamInitials(this.nextMatch.teamOneName)}`;
                    this.nextMatchTeamTwoLogoUrl = ObjectUtils.hasData(this.nextMatch.teamTwoLogoUrl) ? this.nextMatch.teamTwoLogoUrl : `https://placehold.co/80x80/0a0a0a/FFFFFF?text=${this.getTeamInitials(this.nextMatch.teamTwoName)}`;
                }
            })
            .add(() => {
                this.nextMatchLoading = false;
            });
    }
}
