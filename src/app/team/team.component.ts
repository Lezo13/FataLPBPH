import { Component, inject, OnInit } from '@angular/core';
import { PlayerHttpService } from '../_shared/services';
import { take } from 'rxjs';
import { Player } from '../_shared/models';
import { ObjectUtils } from '../_shared/utils';
@Component({
  selector: 'app-team',
  standalone: false,
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent implements OnInit {
  lineups: Player[] = [];
  members: Player[] = [];

  isLoading: boolean = true;

  readonly defaultPlayerNoImg: string = 'assets/images/anonymous_player.png';

  private playerHttpService = inject(PlayerHttpService);

  ngOnInit(): void {
    this.loadPlayers();
  }

  getPlayerImage(player: Player): string {
    return ObjectUtils.hasData(player.imageUrl) ? player.imageUrl : this.defaultPlayerNoImg;
  }

  getPlayerNameFontSize(player: Player): string {
    const playerNameLength: number = player.playerName?.length;
    const size = -0.189 * playerNameLength + 4.823;
    return Math.min(size, 3.5).toFixed(2) + "rem";
  }

  private loadPlayers(): void {
    this.isLoading = true;

    this.playerHttpService.getAllPlayers()
      .pipe((take(1)))
      .subscribe((players: Player[]) => {
        this.lineups = players.filter(p => p.isLineup);
        this.members = players.filter(p => !p.isLineup);
      }).add(() => {
        this.isLoading = false;
      });
  }
}
