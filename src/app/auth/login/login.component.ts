import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog,  private router: Router) {
    this.openDialog();
   }

  ngOnInit(): void {
  }   

  openDialog(){
    const dialogRef = this.dialog.open(loginDialogComponent, {
      width: '50%',maxWidth:"500px", minWidth:"300px", disableClose: true   
    });

    dialogRef.afterClosed().subscribe(result => {  
     
    });
  } 
}


@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
})
export class loginDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<loginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}  
 
}
