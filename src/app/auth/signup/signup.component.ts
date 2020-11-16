import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SignupDialogComponent} from './signup-dialog/signup-dialog.component'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.openDialog()
  }




  openDialog(){
    const dialogRef = this.dialog.open(SignupDialogComponent, {
      width: '50%',maxWidth:"500px", minWidth:"300px", disableClose: false   
    });

    dialogRef.afterClosed().subscribe(result => {  
     
    });
  } 

}
