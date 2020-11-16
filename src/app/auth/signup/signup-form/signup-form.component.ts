import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServerApiService,User } from 'src/app/server-api.service';
import { AuthService } from '../../auth.service';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  constructor(public authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<SignupDialogComponent>,
    private serverApi: ServerApiService) { }


  signupForm = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required,Validators.minLength(6)]),
    password_confirmation : new FormControl('',[Validators.required,Validators.minLength(6)])
  },{validators:MustMatch('password','password_confirmation')});

  errorMessage:string = ""
  errors:string[]= [];
  formIsInvalid:boolean = false

  ngOnInit(): void {
  }


  onSubmit(){
    this.formIsInvalid = false;
    let self = this;
    let signupInfo = this.signupForm.value;
    this.authService.signup(signupInfo).subscribe((response=>{
      console.log(response);

      if(response.status === "success"){
        this.formIsInvalid = false;
        this.router.navigate([self.authService.redirectUrl || "/customers"]);  
        this.dialogRef.close(true)
      }else if(response.status === "error"){
        this.errorMessage = response.data.message;
      }else{

      }

       
    }));

  }

  public checkError = (controlName: string, errorName: string) => {
    return this.signupForm.controls[controlName].hasError(errorName);
  }

}


// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string):ValidatorFn {
    return (control: FormGroup):ValidationErrors | null => {
        const sourceControl = control.controls[controlName];
        const matchingControl = control.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (sourceControl.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
