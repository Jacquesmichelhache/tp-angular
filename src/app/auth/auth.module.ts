import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { loginDialogComponent, LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [LoginComponent, SignupComponent, DashboardComponent, LoginFormComponent, loginDialogComponent],
  imports: [    
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  entryComponents:[
    LoginFormComponent
  ]
})
export class AuthModule { }
