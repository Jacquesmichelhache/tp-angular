import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { DashboardComponent } from '../auth/dashboard/dashboard.component';

const authRoutes: Routes = [
  {path:"auth",component:DashboardComponent,
  children:[
    {path:"login", component:LoginComponent},
    {path:'',redirectTo:'login', pathMatch: 'full'}
    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
