import { Component, OnInit,ViewChild } from '@angular/core';


@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit {
 

  value = '';

  constructor() { }

  ngOnInit(): void {
 
  }

}
