import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../../server-api.service';
import { of, pipe } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnInit {

  constructor(private serverApi:ServerApiService) { }

  ngOnInit(): void {
    let self = this;

    this.rowData =  this.serverApi.getCustomers().pipe(
      map(customers=>{      

        let agGridRows = customers.map(customer=>{
          return {'name':customer.name, 'infoemail':customer.infoemail,'relationshipstart':customer.relationshipstart }
        });

        return agGridRows;     

      }),
      catchError(err=>of([]))      
    )   
  }

  title = 'my-app';

  columnDefs = [
      { field: 'name' },
      { field: 'infoemail' },
      { field: 'relationshipstart'}
  ];

  rowData:any;
}
