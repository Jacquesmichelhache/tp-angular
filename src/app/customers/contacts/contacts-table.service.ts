import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactsTableService {

  constructor() { }

  private refreshTableSource = new Subject<boolean>();
  selectedContactId:number = -1;
  
  refreshTable$ = this.refreshTableSource.asObservable();

  refreshTable(){
    this.refreshTableSource.next(true);
  }
}
