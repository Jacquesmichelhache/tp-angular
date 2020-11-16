import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';

import {testValidatorFactory} from '../../../shared/testValidator'
import {ServerApiService} from '../../../server-api.service';
import {NewContactDialogComponent} from '../new-contact-dialog/new-contact-dialog.component'
import {MatSnackBar} from '@angular/material/snack-bar';

import { MatDialogRef } from '@angular/material/dialog';
import { CustomersTableService } from '../../customers-table.service';

@Component({
  selector: 'app-new-contact-form',
  templateUrl: './new-contact-form.component.html',
  styleUrls: ['./new-contact-form.component.scss']
})
export class NewContactFormComponent implements OnInit {
  errorMessage:string = ""
  errors:string[]= [];
  clicked:boolean = false;  

  constructor(private serverApi: ServerApiService, 
    public dialogRef: MatDialogRef<NewContactDialogComponent>,
    private _snackBar: MatSnackBar,
    private customersTableService:CustomersTableService) { }

  newContactForm = new FormGroup({
    name : new FormControl('',Validators.required),
    firstname : new FormControl('',Validators.required),
    email : new FormControl('',[Validators.required,Validators.email]),
    tel : new FormControl(''),
    ext : new FormControl('',Validators.pattern("[0-9]*"))    
  });

  ngOnInit(): void {
  }

  onSubmit(){
    this.clicked = true;

    this.errors = [];
    this.errorMessage = "";
    let self = this;
    let newContact = this.newContactForm.value  

    this.serverApi.createContact(this.customersTableService.selectedCustomerId,newContact).subscribe(response=>{     

      if(response.status === "error"){
        this.clicked = false;

        this.errorMessage = response.data.message

        if(response.data.value != null){

          Object.entries(response.data.value).forEach(error=>{
            
            this.errors.push(error[1].toString())
          })
        }
      }else{
        this._snackBar.open("Successfully created a Contact!", "Good job",{duration:2000})
        this.dialogRef.close(true);
      }  
    });
  } 

}
