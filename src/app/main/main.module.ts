import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from '../_shared';
import { NavsModule } from '../navs/navs.module';
import { HomeComponent } from '../home/home.component';
import { TeamComponent } from '../team/team.component';
import { MatchesComponent } from '../matches/matches.component';
import { SpawnPointsComponent } from '../spawn-points/spawn-points.component';
import { MyProfileComponent } from '../my-profile/my-profile.component';
import { StrategiesComponent } from '../strategies/strategies.component';

@NgModule({
  declarations: [ 
    MainComponent, HomeComponent, TeamComponent, MatchesComponent, 
    SpawnPointsComponent, MyProfileComponent, StrategiesComponent
  ],
  imports: [
    CommonModule,
    NavsModule,
    MainRoutingModule,
    NgbDropdownModule,
    NgbCollapseModule,
    SharedModule
]
})
export class MainModule { }
