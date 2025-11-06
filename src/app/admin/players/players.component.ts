import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { ConfirmationOptions, Player, PlayerFormModalOptions } from 'src/app/_shared/models';
import { ComponentModalService, PlayerHttpService } from 'src/app/_shared/services';

@Component({
  selector: 'app-players',
  standalone: false,
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];

  isLoading: boolean = true;
  isDataLoading: boolean = false;

  private modalService = inject(ComponentModalService);
  private playerHttpService = inject(PlayerHttpService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadPlayers();
  }

  addPlayer(): void {
    const options: PlayerFormModalOptions = {
      title: 'Add Player',
      playerId: null
    };

    this.modalService.showPlayerFormModal(options).then(result => {
      this.loadPlayers();
    }).catch(() => { });
  }

  editPlayer(player: Player): void {
    const options: PlayerFormModalOptions = {
      title: 'Edit Player',
      playerId: player.playerId
    };

    this.modalService.showPlayerFormModal(options).then(result => {
      this.loadPlayers();
    }).catch(() => { });
  }

  promptDeletePlayer(player: Player): void {
    const options: ConfirmationOptions = {
      title: 'Delete Player',
      message: `Are you sure you want to delete ${player.playerName}?`,
      warningMessage: 'This action cannot be undone.',
      confirmText: 'Yes',
      declineText: 'No'
    };

    this.modalService.showConfirmationModal(options, false).then(result => {
      if (result) {
        this.deletePlayer(player);
      }
    }).catch(() => { });
  }

  private loadPlayers(): void {
    this.isLoading = true;

    this.playerHttpService.getAllPlayers()
      .pipe((take(1)))
      .subscribe((players: Player[]) => {
        this.players = players;
        this.sortPlayers();
      }).add(() => {
        this.isLoading = false;
      });
  }

  private deletePlayer(player: Player): void {
    player.isLoading = true;

    this.playerHttpService.deletePlayer(player.playerId)
      .pipe((take(1)))
      .subscribe(() => {
        this.players = this.players.filter(p => p.playerId !== player.playerId);
        this.toastr.success(`Successfully deleted ${player?.playerName}`);
      }).add(() => {
        player.isLoading = false;
      });
  }

  private sortPlayers(): void {
    this.players = this.players.sort((a, b) => {
      // Sort by lineup (false first, true after)
      const lineupCompare = Number(b.isLineup) - Number(a.isLineup);
      if (lineupCompare !== 0) return lineupCompare;

      // If same lineup, sort by name
      return Number(b.isActive) - Number(a.isActive);
    });
  }
}
