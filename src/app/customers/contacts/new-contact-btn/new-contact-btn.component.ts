import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ContactsTableService } from '../contacts-table.service';
import {NewContactDialogComponent} from '../new-contact-dialog/new-contact-dialog.component'

@Component({
  selector: 'app-new-contact-btn',
  templateUrl: './new-contact-btn.component.html',
  styleUrls: ['./new-contact-btn.component.scss']
})
export class NewContactBtnComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private contactsTableService:ContactsTableService) { }

  ngOnInit(): void {
  }

  onClick(){
    this.openDialog()
  }

  openDialog(){
    const dialogRef = this.dialog.open(NewContactDialogComponent, {
      width: '50%',maxWidth:"500px", minWidth:"300px"
    });

    dialogRef.afterClosed().subscribe(hasCreatedContact => {  
      if(hasCreatedContact){        
        this.contactsTableService.refreshTable()
      }     
    });
  } 
}
