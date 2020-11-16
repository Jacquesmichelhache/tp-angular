import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';

import {testValidatorFactory} from '../../../shared/testValidator'
import {ServerApiService} from '../../../server-api.service';
import {EditContactDialogComponent} from '../edit-contact-dialog/edit-contact-dialog.component'
import {MatSnackBar} from '@angular/material/snack-bar';

import { MatDialogRef } from '@angular/material/dialog';
import { CustomersTableService } from '../../customers-table.service';
import { ContactsTableService } from '../contacts-table.service';

import { tap, map, catchError} from 'rxjs/operators';

@Component({
  selector: 'app-edit-contact-form',
  templateUrl: './edit-contact-form.component.html',
  styleUrls: ['./edit-contact-form.component.scss']
})
export class EditContactFormComponent implements OnInit {
  errorMessage:string = ""
  errors:string[]= [];
  clicked:boolean = false;  
  dataHasLoaded:boolean = false;
  contactIsSaving:boolean = false;
  contactIsSuccess:boolean = false;

  constructor(private serverApi: ServerApiService, 
    public dialogRef: MatDialogRef<EditContactDialogComponent>,
    private _snackBar: MatSnackBar,
    private CustomersTableService:CustomersTableService,
    private ContactsTableService:ContactsTableService) { }

  editContactForm = new FormGroup({
    name : new FormControl('',Validators.required),
    firstname : new FormControl('',Validators.required),
    email : new FormControl('',[Validators.required,Validators.email]),
    tel : new FormControl(''),
    ext : new FormControl('',Validators.pattern("[0-9]*"))    
  });

  ngOnInit(): void {
    this.editContactForm.disable();   
    this.getContactInformation();
  }


  onSubmit(){
    //reset some values
    this.contactIsSaving = true;
    this.contactIsSuccess = false;
    this.errors = [];
    this.errorMessage = "";
    this.editContactForm.disable();

    //get values
    let customerId = this.CustomersTableService.selectedCustomerId;
    let contactId = this.ContactsTableService.selectedContactId;

    let customerInformation = this.editContactForm.value
   

    this.serverApi.updateContactInformation(customerId,contactId,customerInformation).subscribe(response=>{
      if(response.status === "success"){  

        setTimeout(()=>{
          this.contactIsSaving = false;
          this.editContactForm.enable();

          this.contactIsSuccess = true;
          setTimeout(()=>{            
            this.dialogRef.close(true);
          },500);
          
        },500)    

      }else if(response.status === "error"){

        this.errorMessage = response.data.message
        if(response.data.value != null){
          Object.entries(response.data.value).forEach(error=>{            
            this.errors.push(error[1].toString())
          })
        }

        this.contactIsSaving = false;
        this.editContactForm.enable();

      }else{
        this._snackBar.open("Could not update contact information", "server error")
      }  
    });
  }

  getContactInformation(){
    let customerId = this.CustomersTableService.selectedCustomerId
    let contactId = this.ContactsTableService.selectedContactId

    this.serverApi.getContactInformation(customerId,contactId).pipe(map(response=>{
      if(response.status === "success"){
        let fields = response.data.value.data.attributes;

        let contactFields = {
          name:fields["name"],
          firstname:fields["firstname"],
          email:fields["email"],
          tel:fields["tel"],
          ext:fields["ext"]        
        }

        return contactFields
      }else{
        return {};
      }
    })).subscribe(customerFields=>{
      setTimeout(()=>{       
        this.editContactForm.setValue(customerFields)
        this.editContactForm.enable();
        this.dataHasLoaded = true;
      },1000)      
    })
  }
}
