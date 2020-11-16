import { Component, OnInit,ViewChild } from '@angular/core';
import { CustomersTableService } from '../customers-table.service';


@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit {
 

  value = '';

  constructor(private customersTableService:CustomersTableService) { }

  ngOnInit(): void {
 
  }

  onChange(filterValue:string){   
    this.customersTableService.filterTable(filterValue);
  }

}
