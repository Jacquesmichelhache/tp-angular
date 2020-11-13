import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogoutComponent} from './logout/logout.component'

const routes: Routes = [ 
  {path:'', redirectTo: "/customers", pathMatch:"full"},
  {path:'logout', component:LogoutComponent},
  {path:'login', redirectTo: '/auth/login'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
