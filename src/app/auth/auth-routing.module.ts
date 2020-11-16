import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { GreetingDialogComponent } from './greeting-dialog/greeting-dialog.component';
import { HomeComponent } from './home/home.component';

const authRoutes: Routes = [
  {path:"auth",component:HomeComponent,
  children:[
    {path:"login", component:LoginComponent},
    {path:"signup", component:SignupComponent},
    {path:'',redirectTo:'login', pathMatch: 'full'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
