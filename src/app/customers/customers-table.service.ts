import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersTableService {

  constructor() { }

  private refreshTableSource = new Subject<boolean>();
  selectedCustomerId:number = -1;
  
  refreshTable$ = this.refreshTableSource.asObservable();

  refreshTable(){
    this.refreshTableSource.next(true);
  }

}
