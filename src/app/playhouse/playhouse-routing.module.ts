import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayHouseHomeComponent } from './play-house-home/play-house-home.component';

const routes: Routes = [
  {path:'playhouse', component:PlayHouseHomeComponent,  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayhouseRoutingModule { }
