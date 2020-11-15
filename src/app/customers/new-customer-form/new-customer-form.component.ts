import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';

import {testValidatorFactory} from '../../shared/testValidator'
import { ServerApiService} from '../../server-api.service';
import {NewCustomerDialogComponent} from '../new-customer-dialog/new-customer-dialog.component'
import {MatSnackBar} from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

interface Dictionary<T> {
  [Key: string]: T;
}


@Component({
  selector: 'app-new-customer-form',
  templateUrl: './new-customer-form.component.html',
  styleUrls: ['./new-customer-form.component.scss']
})
export class NewCustomerFormComponent implements OnInit {
  errorMessage:string = ""
  errors:string[]= [];

  activityTypes:any[] =[];

  clicked:boolean = false;

  VALID_EMAIL_REGEX = new RegExp(/[\w+\-.]+@[a-z\d\-.]+\.[a-z]/i);
  VALID_AREACODE_REGEX = new RegExp( /[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1}[ -]?\d{1}[A-Z]{1}\d{1}/i)

  newCutomerForm = new FormGroup({
    name : new FormControl('',Validators.required),
    relationshipstart : new FormControl('',Validators.required),
    activitytype : new FormControl('',Validators.required),
    addresscity : new FormControl(''),
    addresspostalcode : new FormControl('', testValidatorFactory(this.VALID_AREACODE_REGEX)),
    addressstreet : new FormControl(''),
    addressapt : new FormControl('', Validators.maxLength(12)),
    infoemail : new FormControl('',[Validators.required, testValidatorFactory(this.VALID_EMAIL_REGEX)])
  });

  constructor(private serverApi: ServerApiService, 
    public dialogRef: MatDialogRef<NewCustomerDialogComponent>,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let self = this;
    this.serverApi.getActivityTypes().subscribe(types=>{
      Object.entries(types).forEach(entry=>{
        self.activityTypes.push(entry);
      })
   
      console.log( self.activityTypes)
    });
    
  }

  onSubmit(){
    this.clicked = true;

    this.errors = [];
    this.errorMessage = "";
    let self = this;
    let newCustomer = this.newCutomerForm.value  

    this.serverApi.createCustomer(newCustomer).subscribe(response=>{     

      if(response.status === "error"){
        this.clicked = false;

        this.errorMessage = response.data.message

        if(response.data.value != null){

          Object.entries(response.data.value).forEach(error=>{
            
            this.errors.push(error[1].toString())
          })
        }
      }else{
        this._snackBar.open("Successfully created a Customer!", "Good job",{duration:2000})
        this.dialogRef.close(true);
      }  
    });
  } 

}
