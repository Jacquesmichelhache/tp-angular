import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>) { }

  customerId:number = -1;

  ngOnInit(): void {
    this.setPosition();
  }

  setPosition(){
    this.dialogRef.updatePosition({top:"50px"})  
    this.dialogRef.addPanelClass(["edit-customer-panel"])   
  }

}
