import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../_shared';
import { NavsModule } from '../navs/navs.module';
import { PlayersComponent } from './players/players.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ManageMatchesComponent } from './manage-matches/manage-matches.component';
import { ManageSpawnPointsComponent } from './manage-spawn-points/manage-spawn-points.component';
import { ManageInvitationsComponent } from './manage-invitations/manage-invitations.component';

@NgModule({
  declarations: [
    PlayersComponent,
    ManageMatchesComponent,
    ManageSpawnPointsComponent,
    ManageInvitationsComponent],
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
