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
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { PlayhouseModule } from './playhouse/playhouse.module';
import { LayoutPlazaModule } from './layout-plaza/layout-plaza.module';
import { DialogComponent } from './shared/dialog/dialog.component';
import { DialogDirective } from './dialog.directive';
import { AdDirective } from './ad.directive';
import { MyAdComponent } from './shared/my-ad/my-ad.component';
import { YesNoDialogComponent } from './shared/yes-no-dialog/yes-no-dialog.component';



@NgModule({
  declarations: [
    AppComponent,  
    HeaderComponent, LogoutComponent, ConfirmationDialogComponent, DialogComponent, DialogDirective, AdDirective, MyAdComponent, YesNoDialogComponent
  ],
  imports: [   
    BrowserModule,    
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutPlazaModule,
    PlayhouseModule,
    DemoMaterialModule,  
    CustomersModule,
    AuthModule,
    AppRoutingModule,
    FlexLayoutModule
  ],  
  providers: [
    //{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
