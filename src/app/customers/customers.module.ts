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
import { ContactsHeaderComponent } from './contacts/contacts-header/contacts-header.component';
import { NewCustomerBtnComponent } from './new-customer-btn/new-customer-btn.component';
import { NewCustomerFormComponent } from './new-customer-form/new-customer-form.component';
import { NewCustomerDialogComponent } from './new-customer-dialog/new-customer-dialog.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NewContactDialogComponent } from './contacts/new-contact-dialog/new-contact-dialog.component';
import { EditContactDialogComponent } from './contacts/edit-contact-dialog/edit-contact-dialog.component';
import { EditContactFormComponent } from './contacts/edit-contact-form/edit-contact-form.component';
import { NewContactFormComponent } from './contacts/new-contact-form/new-contact-form.component';
import { EditDialogTabComponent } from './edit-dialog-tab/edit-dialog-tab.component';
import { ContactsTableComponent } from './contacts/contacts-table/contacts-table.component';
import { NewContactBtnComponent } from './contacts/new-contact-btn/new-contact-btn.component';
import { ContactsFilterComponent } from './contacts/contacts-filter/contacts-filter.component';


@NgModule({
  declarations: [CustomersComponent, CustomersTableComponent, 
    TableFilterComponent, TableHeaderComponent, ContactsHeaderComponent,
    NewCustomerBtnComponent, NewCustomerFormComponent,
     NewCustomerDialogComponent, EditDialogComponent, 
     EditFormComponent, ContactsComponent, NewContactDialogComponent, 
     EditContactDialogComponent, EditContactFormComponent, NewContactFormComponent, 
     EditDialogTabComponent, ContactsTableComponent, NewContactBtnComponent, ContactsFilterComponent],
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
