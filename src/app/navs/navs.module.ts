import { NgModule } from '@angular/core';
import { TopNavComponent } from './top-nav/top-nav.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../_shared';

@NgModule({
  declarations: [TopNavComponent ],
  imports: [
    RouterModule,
    NgbModule,
    SharedModule
  ],
  exports: [TopNavComponent]
})
export class NavsModule { }
