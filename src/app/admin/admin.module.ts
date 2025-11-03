import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../_shared';
import { NavsModule } from '../navs/navs.module';
import { PlayersComponent } from './players/players.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatchesComponent } from './matches/matches.component';

@NgModule({
  declarations: [PlayersComponent, MatchesComponent],
  imports: [
    CommonModule,
    NavsModule,
    AdminRoutingModule,
    NgbDropdownModule,
    NgbCollapseModule,
    SharedModule
  ]
})
export class AdminModule { }
