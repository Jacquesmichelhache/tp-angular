import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-contact-dialog',
  templateUrl: './edit-contact-dialog.component.html',
  styleUrls: ['./edit-contact-dialog.component.scss']
})
export class EditContactDialogComponent implements OnInit {

  contactId:number = -1;

  constructor(public dialogRef: MatDialogRef<EditContactDialogComponent>) { }

  ngOnInit(): void {
    this.dialogRef.updatePosition({top:"50px"})  
    this.dialogRef.addPanelClass(["edit-contact-panel"])  
  }

}
