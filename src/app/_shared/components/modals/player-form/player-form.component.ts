import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { PlayerFormModalOptions, FileExtended, Player } from 'src/app/_shared/models';
import { ERROR_RESPONSES } from 'src/app/_shared/records';
import { PlayerHttpService } from 'src/app/_shared/services';
import { MiscUtils, ObjectUtils } from 'src/app/_shared/utils';

@Component({
  selector: 'app-player-form',
  standalone: false,
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.scss'
})
export class PlayerFormComponent implements OnInit {
  @Input() data!: PlayerFormModalOptions;
  playerId: string = null;
  player: Player;
  imageFile: FileExtended = null;
  notifyUsers: boolean = false;

  isEditing: boolean = false;
  isLoading: boolean = true;
  isSubmitted: boolean = false;
  isSaving: boolean = false;

  constructor(
    public modalInstance: NgbActiveModal,
    private playerHttpService: PlayerHttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.playerId = this.data.playerId;
    this.isEditing = ObjectUtils.hasData(this.playerId);
    this.initializeData();

    if (this.isEditing)
      this.loadData();
    else
      this.isLoading = false;
  }

  clearImageFile(): void {
    this.player.imageUrl = null;
  }

  async save(): Promise<void> {
    if (ObjectUtils.hasData(this.imageFile)) {
      const imageBase64: string = await MiscUtils.fileToBase64(this.imageFile) as string;
      this.player.imageUrl = imageBase64;
    }

    if (this.isEditing)
      this.updatePlayer();
    else 
      this.insertPlayer();
  }

  private initializeData(): void {
    this.player = {
      playerId: null,
      playerName: '',
      description: '',
      imageUrl: '',
      isActive: true,
      isLineup: false
    };
  }

  private loadData(): void {
    this.isLoading = true;

    this.playerHttpService.getPlayer(this.playerId)
      .pipe(take(1))
      .subscribe({
        next: (player) => {
          this.player = player;
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(ERROR_RESPONSES[error.status]);
        }
      }).add(() => {
        this.isLoading = false;
      });
  }

  private insertPlayer(): void {
    this.isSaving = true;

    this.playerHttpService.insertPlayer(this.player)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.modalInstance.close();
          this.toastr.success(`Successfully added ${this.player?.playerName}`);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(ERROR_RESPONSES[error.status]);
        }
      }).add(() => {
        this.isSaving = false;
      });
  }

  private updatePlayer(): void {
    this.isSaving = true;

    this.playerHttpService.updatePlayer(this.player)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.modalInstance.close();
          this.toastr.success(`Successfully updated ${this.player?.playerName}`);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(ERROR_RESPONSES[error.status]);
        }
      }).add(() => {
        this.isSaving = false;
      });
  }
}
