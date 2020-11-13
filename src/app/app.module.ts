import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AuthModule } from './auth/auth.module';
import { HeaderComponent } from './shared/header/header.component';

import {DemoMaterialModule} from './material-module';
import {CustomersModule} from '../app/customers/customers.module';
import { LogoutComponent } from './logout/logout.component';

import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,  
    HeaderComponent, LogoutComponent
  ],
  imports: [   
    BrowserModule,    
    HttpClientModule,
    BrowserAnimationsModule,
    DemoMaterialModule,  
    CustomersModule,
    AuthModule,
    AppRoutingModule
  ],  
  providers: [
    //{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
