import { Component, inject, OnInit } from '@angular/core';
import { SpawnPointHttpService } from '../_shared/services';
import { SpawnPoint } from '../_shared/models/spawn-point.model';
import { take } from 'rxjs';
import { Auth, authState, User as FirebaseUser } from '@angular/fire/auth';
import { ObjectUtils } from '../_shared/utils';

@Component({
  selector: 'app-spawn-points',
  standalone: false,
  templateUrl: './spawn-points.component.html',
  styleUrl: './spawn-points.component.scss'
})
export class SpawnPointsComponent implements OnInit {
  spawnPoints: SpawnPoint[] = [];
  selectedMap: SpawnPoint = null;

  isLoading: boolean = false;
  isAuthenticated: boolean = false;

  private auth = inject(Auth);
  private spawnPointHttpService = inject(SpawnPointHttpService);

  ngOnInit(): void {
    this.setupAuthStateSubscription();
  }

  selectMap(map: SpawnPoint): void {
    this.selectedMap = map;
  }

  resetMapSelection(): void {
    this.selectedMap = null;
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

  private setupAuthStateSubscription(): void {
    authState(this.auth)
      .pipe(take(1))
      .subscribe((user: FirebaseUser) => {
        this.isAuthenticated = ObjectUtils.hasData(user);

        if (this.isAuthenticated)
          this.loadSpawnPoints();
      })
  }
}
