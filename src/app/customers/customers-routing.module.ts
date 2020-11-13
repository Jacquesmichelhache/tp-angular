import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../app/auth/auth.guard';
import {CustomersComponent} from './customers/customers.component'

const routes: Routes = [
  {path:'customers', component:CustomersComponent, canActivate:[AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
