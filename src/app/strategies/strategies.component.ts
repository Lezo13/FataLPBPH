import { Component, inject, OnInit } from '@angular/core';
import { ComponentModalService, StrategyHttpService } from '../_shared/services';
import { take } from 'rxjs';
import { Auth, authState, User as FirebaseUser } from '@angular/fire/auth';
import { ObjectUtils } from '../_shared/utils';
import { ContentWindowModalOptions, MapStrategies, Strategy } from '../_shared/models';

@Component({
  selector: 'app-strategies',
  standalone: false,
  templateUrl: './strategies.component.html',
  styleUrl: './strategies.component.scss'
})
export class StrategiesComponent implements OnInit {
  mapStrategies: MapStrategies[] = [];
  selectedMap: MapStrategies = null;

  isLoading: boolean = false;
  isAuthenticated: boolean = false;

  private auth = inject(Auth);
  private modalService = inject(ComponentModalService);
  private strategyHttpService = inject(StrategyHttpService);

  ngOnInit(): void {
    this.setupAuthStateSubscription();
  }

  selectMap(map: MapStrategies): void {
    this.selectedMap = map;
  }

  resetMapSelection(): void {
    this.selectedMap = null;
  }

  viewDescription(strategy: Strategy): void {
    const options: ContentWindowModalOptions = { 
      title: `${strategy.title}`,
      content: strategy.description 
    };
    this.modalService.showContentWindow(options).then(() => { });
  }

  private loadMapStrategies(): void {
    this.isLoading = true;

    this.strategyHttpService.getMapStrategies()
      .pipe((take(1)))
      .subscribe((mapStrategies: MapStrategies[]) => {
        this.mapStrategies = mapStrategies;
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
          this.loadMapStrategies();
      })
  }
}
