import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersTableService {

  constructor() { }

  selectedCustomerId:number = -1;

  private refreshTableSource = new Subject<boolean>();  
  private filterTableSource = new Subject<string>();


  refreshTable$ = this.refreshTableSource.asObservable();
  filterTable$ = this.filterTableSource.asObservable();

  refreshTable(){
    this.refreshTableSource.next(true);
  }

  filterTable(fitlerValue:string = ""){
    this.filterTableSource.next(fitlerValue)
  }

}
