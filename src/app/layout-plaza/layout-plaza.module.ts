import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutPlazaRoutingModule } from './layout-plaza-routing.module';
import { HomeComponent } from './home/home.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { ContentFiestaComponent } from './content-fiesta/content-fiesta.component';


@NgModule({
  declarations: [HomeComponent, HeroesListComponent, ContentFiestaComponent],
  imports: [
    CommonModule,
    LayoutPlazaRoutingModule               
  ]
})
export class LayoutPlazaModule { }
