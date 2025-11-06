import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { ConfirmationOptions, SpawnPoint, SpawnPointFormModalOptions } from 'src/app/_shared/models';
import { ComponentModalService, SpawnPointHttpService } from 'src/app/_shared/services';
import { ObjectUtils } from 'src/app/_shared/utils';

@Component({
  selector: 'app-manage-spawn-points',
  standalone: false,
  templateUrl: './manage-spawn-points.component.html',
  styleUrl: './manage-spawn-points.component.scss'
})
export class ManageSpawnPointsComponent implements OnInit {
  spawnPoints: SpawnPoint[] = [];

  isLoading: boolean = true;
  isDataLoading: boolean = false;

  private modalService = inject(ComponentModalService);
  private spawnPointHttpService = inject(SpawnPointHttpService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadSpawnPoints();
  }

  addSpawn(): void {
    const options: SpawnPointFormModalOptions = {
      title: 'Add Spawn Point',
      spawnPointId: null
    };

    this.modalService.showSpawnPointFormModal(options).then(result => {
      this.loadSpawnPoints();
    }).catch(() => { });
  }

  editSpawn(spawnPoint: SpawnPoint): void {
    const options: SpawnPointFormModalOptions = {
      title: 'Edit Spawn Point',
      spawnPointId: spawnPoint.spawnPointId
    };

    this.modalService.showSpawnPointFormModal(options).then(result => {
      this.loadSpawnPoints();
    }).catch(() => { });
  }

  promptDeleteSpawn(spawnPoint: SpawnPoint): void {
    const options: ConfirmationOptions = {
      title: 'Delete Spawn Point',
      message: `Are you sure you want to delete ${spawnPoint.mapName}?`,
      warningMessage: 'This action cannot be undone.',
      confirmText: 'Yes',
      declineText: 'No'
    };

    this.modalService.showConfirmationModal(options, false).then(result => {
      if (result) {
        this.deleteSpawnPoint(spawnPoint);
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

  hasImages(urls: string[]): boolean {
    return ObjectUtils.hasData(urls) && urls.some(url => ObjectUtils.hasData(url));
  }

  private loadSpawnPoints(): void {
    this.isLoading = true;

    this.spawnPointHttpService.getAllSpawnPoints()
      .pipe((take(1)))
      .subscribe((spawnPoints: SpawnPoint[]) => {
        this.spawnPoints = spawnPoints;
      }).add(() => {
        this.isLoading = false;
      });
  }

  private deleteSpawnPoint(spawnPoint: SpawnPoint): void {
    spawnPoint.isLoading = true;

    this.spawnPointHttpService.deleteSpawnPoint(spawnPoint.spawnPointId)
      .pipe((take(1)))
      .subscribe(() => {
        this.spawnPoints = this.spawnPoints.filter(m => m.spawnPointId !== spawnPoint.spawnPointId);
        this.toastr.success(`Successfully deleted ${spawnPoint.mapName}`);
      }).add(() => {
        spawnPoint.isLoading = false;
      });
  }
}
