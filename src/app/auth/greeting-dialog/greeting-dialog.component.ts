import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-greeting-dialog',
  templateUrl: './greeting-dialog.component.html',
  styleUrls: ['./greeting-dialog.component.scss']
})
export class GreetingDialogComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
   
  }

}
