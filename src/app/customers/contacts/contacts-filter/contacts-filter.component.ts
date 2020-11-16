import { Component, OnInit } from '@angular/core';
import { ContactsTableService } from '../contacts-table.service';

@Component({
  selector: 'app-contacts-filter',
  templateUrl: './contacts-filter.component.html',
  styleUrls: ['./contacts-filter.component.scss']
})
export class ContactsFilterComponent implements OnInit {
  value = '';

  constructor( private ContactsTableService:ContactsTableService) { }

  ngOnInit(): void {
  }

  onChange(filterValue:string){   
    this.ContactsTableService.filterTable(filterValue);
  }

}
