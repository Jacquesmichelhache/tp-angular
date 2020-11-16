import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { loginDialogComponent, LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { LoginFormComponent } from './login/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DemoMaterialModule } from '../material-module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { GreetingDialogComponent } from './greeting-dialog/greeting-dialog.component';
import { HomeComponent } from './home/home.component';
import { SignupDialogComponent } from './signup/signup-dialog/signup-dialog.component';
import { SignupFormComponent } from './signup/signup-form/signup-form.component';


@NgModule({
  declarations: [LoginComponent, SignupComponent, LoginFormComponent, loginDialogComponent, GreetingDialogComponent, HomeComponent, SignupDialogComponent, SignupFormComponent],
  imports: [    
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    DemoMaterialModule
  ],
  entryComponents:[
    LoginFormComponent
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
})
export class AuthModule { }
