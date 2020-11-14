import { Component, OnInit,HostListener  } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-customer-dialog',
  templateUrl: './new-customer-dialog.component.html',
  styleUrls: ['./new-customer-dialog.component.scss']
})
export class NewCustomerDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewCustomerDialogComponent>) { }

  ngOnInit(): void {


  }
 
}
