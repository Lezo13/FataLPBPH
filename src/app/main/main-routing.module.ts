import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { HomeComponent } from '../home/home.component';
import { TeamComponent } from '../team/team.component';
import { RoleEnum } from '../_shared/enums';
import { AuthGuard } from '../_shared/guards';
import { MatchesComponent } from '../matches/matches.component';
import { SpawnPointsComponent } from '../spawn-points/spawn-points.component';
import { MyProfileComponent } from '../my-profile/my-profile.component';
import { StrategiesComponent } from '../strategies/strategies.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'team', component: TeamComponent },
      { path: 'matches', component: MatchesComponent },
      { path: 'spawn-points', component: SpawnPointsComponent },
      {
        path: 'strategies', component: StrategiesComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [RoleEnum.Admin, RoleEnum.Moderator, RoleEnum.Staff, RoleEnum.Player]
        }
      },
      { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard] },
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuard],
        data: {
          roles: [RoleEnum.Admin, RoleEnum.Moderator]
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
