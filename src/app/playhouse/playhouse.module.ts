import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayhouseRoutingModule } from './playhouse-routing.module';
import { PlayHouseHomeComponent } from './play-house-home/play-house-home.component';
import { FancyButtonComponent } from './fancy-button/fancy-button.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DemoMaterialModule } from '../material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FancyListComponent } from './fancy-list/fancy-list.component';
import { ResponsiveButtonComponent } from './responsive-button/responsive-button.component';
import { LayoutPlazaComponent } from './layout-plaza/layout-plaza.component';


@NgModule({
  declarations: [PlayHouseHomeComponent, FancyButtonComponent, FancyListComponent, ResponsiveButtonComponent, LayoutPlazaComponent],
  imports: [
    CommonModule,
    PlayhouseRoutingModule,
    MatDialogModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PlayhouseModule { }
