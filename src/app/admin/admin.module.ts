import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../_shared';
import { NavsModule } from '../navs/navs.module';
import { PlayersComponent } from './players/players.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [PlayersComponent],
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
