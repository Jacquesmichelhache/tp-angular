import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog) {
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
export class loginDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<loginDialogComponent>,
    private router:Router) {}  

  routerSubscription = null;

  ngOnInit() {

  //to close dialog on navigation
  this.routerSubscription = this.router.events
    .pipe(
      filter((event: RouterEvent) => event instanceof NavigationStart),
      filter(() => !!this.dialogRef)
    )
    .subscribe(() => {
      this.dialogRef.close();
    });
  }

}
