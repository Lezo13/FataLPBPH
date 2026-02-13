import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../_shared/guards';
import { RoleEnum } from '../_shared/enums';
import { PlayersComponent } from './players/players.component';
import { ManageMatchesComponent } from './manage-matches/manage-matches.component';
import { ManageSpawnPointsComponent } from './manage-spawn-points/manage-spawn-points.component';
import { ManageInvitationsComponent } from './manage-invitations/manage-invitations.component';
import { ManageMapsComponent } from './manage-maps/manage-maps.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'players',
    pathMatch: 'full'
  },
  {
    path: 'players', component: PlayersComponent, canActivate: [AuthGuard],
    data: { roles: [RoleEnum.Admin, RoleEnum.Moderator] }
  },
  {
    path: 'matches', component: ManageMatchesComponent, canActivate: [AuthGuard],
    data: { roles: [RoleEnum.Admin, RoleEnum.Moderator] }
  },
  {
    path: 'spawn-points', component: ManageSpawnPointsComponent, canActivate: [AuthGuard],
    data: { roles: [RoleEnum.Admin, RoleEnum.Moderator] }
  },
  {
    path: 'invitations', component: ManageInvitationsComponent, canActivate: [AuthGuard],
    data: { roles: [RoleEnum.Admin, RoleEnum.Moderator] }
  },
  {
    path: 'maps', component: ManageMapsComponent, canActivate: [AuthGuard],
    data: { roles: [RoleEnum.Admin, RoleEnum.Moderator] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
