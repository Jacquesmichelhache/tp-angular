import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers/customers.component';
import { CustomersTableComponent } from './customers-table/customers-table.component';

import { AgGridModule } from 'ag-grid-angular';
import { TableFilterComponent } from './table-filter/table-filter.component';

import {DemoMaterialModule} from '../../app/material-module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TableHeaderComponent } from './table-header/table-header.component';
import { NewCustomerBtnComponent } from './new-customer-btn/new-customer-btn.component';
import { NewCustomerFormComponent } from './new-customer-form/new-customer-form.component';
import { NewCustomerDialogComponent } from './new-customer-dialog/new-customer-dialog.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [CustomersComponent, CustomersTableComponent, TableFilterComponent, TableHeaderComponent, NewCustomerBtnComponent, NewCustomerFormComponent, NewCustomerDialogComponent],
  imports: [
    DemoMaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    MatDialogModule,   
    AgGridModule.withComponents([]) 
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  entryComponents:[TableFilterComponent] 
})
export class CustomersModule { }
