import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';

import {testValidatorFactory} from '../../shared/testValidator'
import {ServerApiService} from '../../server-api.service';
import {NewCustomerDialogComponent} from '../new-customer-dialog/new-customer-dialog.component'
import {MatSnackBar} from '@angular/material/snack-bar';

import { MatDialogRef } from '@angular/material/dialog';
import { CustomersTableService } from '../customers-table.service';

import { tap, map, catchError} from 'rxjs/operators';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  constructor(private serverApi: ServerApiService, 
    public dialogRef: MatDialogRef<NewCustomerDialogComponent>,
    private _snackBar: MatSnackBar,
    private customersTableService:CustomersTableService,) { }

  dataHasLoaded:boolean = false;
  customerIsSaving:boolean = false;
  customerIsSuccess:boolean = false;

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

    this.getCustomerInformation();
  }

  getCustomerInformation(){
    let customerId = this.customersTableService.selectedCustomerId
    this.serverApi.getCustomerInformation(customerId.toString()).pipe(map(response=>{
      if(response.status === "success"){
        let fields = response.data.value.data.attributes;
        let customerFields = {
          name:fields["name"],
          relationshipstart:fields["relationshipstart"],
          activitytype:fields["activitytype"],
          addresscity:fields["addresscity"],
          addresspostalcode:fields["addresspostalcode"],
          addressstreet:fields["addressstreet"],
          addressapt:fields["addressapt"],
          infoemail:fields["infoemail"]
        }
        return customerFields
      }else{
        return {};
      }
    })).subscribe(customerFields=>{
      setTimeout(()=>{       
        this.editCutomerForm.setValue(customerFields)
        this.editCutomerForm.enable();
        this.dataHasLoaded = true;
      },1000)      
    })
  }



  onSubmit(){
    //reset some values
    this.customerIsSaving = true;
    this.errors = [];
    this.errorMessage = "";
    this.editCutomerForm.disable();

    //get values
    let id = this.customersTableService.selectedCustomerId;
    let customerInformation = this.editCutomerForm.value

   

    this.serverApi.updateCustomerInformation(id,customerInformation).subscribe(response=>{
      if(response.status === "success"){

       


        setTimeout(()=>{
          this.customerIsSaving = false;
          this.editCutomerForm.enable();

          this.customerIsSuccess = true;
          setTimeout(()=>{
            this.customerIsSuccess = false;
          },500);
          
        },500)    

      }else if(response.status === "error"){

        this.errorMessage = response.data.message
        if(response.data.value != null){
          Object.entries(response.data.value).forEach(error=>{            
            this.errors.push(error[1].toString())
          })
        }

        this.customerIsSaving = false;
        this.editCutomerForm.enable();

      }else{
        this._snackBar.open("Could not update customer information", "server error")
      }  
    });
  }

}
