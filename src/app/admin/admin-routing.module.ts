import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../_shared/guards';
import { RoleEnum } from '../_shared/enums';
import { PlayersComponent } from './players/players.component';
import { ManageMatchesComponent } from './manage-matches/manage-matches.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
