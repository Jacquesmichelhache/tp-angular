import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';

import {testValidatorFactory} from '../../shared/testValidator'
import {ServerApiService} from '../../server-api.service';
import {NewCustomerDialogComponent} from '../new-customer-dialog/new-customer-dialog.component'
import {MatSnackBar} from '@angular/material/snack-bar';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  constructor(private serverApi: ServerApiService, 
    public dialogRef: MatDialogRef<NewCustomerDialogComponent>,
    private _snackBar: MatSnackBar) { }

  dataHasLoaded:boolean = false;

  errorMessage:string = ""
  errors:string[]= [];

  clicked:boolean = false;

  activityTypes:any[] =[];

  VALID_EMAIL_REGEX = new RegExp(/[\w+\-.]+@[a-z\d\-.]+\.[a-z]/i);
  VALID_AREACODE_REGEX = new RegExp( /[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1}[ -]?\d{1}[A-Z]{1}\d{1}/i)

  editCutomerForm = new FormGroup({
    name : new FormControl('',Validators.required),
    relationshipstart : new FormControl('',Validators.required),
    activitytype : new FormControl('',Validators.required),
    addresscity : new FormControl(''),
    addresspostalcode : new FormControl('', testValidatorFactory(this.VALID_AREACODE_REGEX)),
    addressstreet : new FormControl(''),
    addressapt : new FormControl('', Validators.maxLength(12)),
    infoemail : new FormControl('',[Validators.required, testValidatorFactory(this.VALID_EMAIL_REGEX)])
  });



  ngOnInit(): void {
    let self = this;

    this.editCutomerForm.disable();

    this.serverApi.getActivityTypes().subscribe(types=>{
      Object.entries(types).forEach(entry=>{
        self.activityTypes.push(entry);
      })  
    });
  }

}
