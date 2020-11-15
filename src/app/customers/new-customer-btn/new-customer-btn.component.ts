import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { CustomersTableService } from '../customers-table.service';
import {NewCustomerDialogComponent} from '../new-customer-dialog/new-customer-dialog.component'

@Component({
  selector: 'app-new-customer-btn',
  templateUrl: './new-customer-btn.component.html',
  styleUrls: ['./new-customer-btn.component.scss']
})
export class NewCustomerBtnComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private customersTableService:CustomersTableService) { }

  ngOnInit(): void {
  }

  onClick(){
    this.openDialog()
  }

  openDialog(){
    const dialogRef = this.dialog.open(NewCustomerDialogComponent, {
      width: '50%',maxWidth:"500px", minWidth:"300px"
    });

    dialogRef.afterClosed().subscribe(hasCreatedCustomer => {  
      if(hasCreatedCustomer){        
        this.customersTableService.refreshTable()
      }     
    });
  } 

}
