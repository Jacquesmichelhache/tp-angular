import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { User} from '../../../server-api.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { loginDialogComponent} from '../login.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  profileForm = new FormGroup({
    email : new FormControl(''),
    password : new FormControl('')
  });

  constructor(public authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<loginDialogComponent>) { 
         
    this.profileForm.setValue({email:"jacques_m16@hotmail.com",password:"123456"})
  }

  ngOnInit(): void {
  }

  onSubmit(){
    let self = this;
    let user:User = this.profileForm.value   
   

    this.authService.login(user).subscribe(val=>{
      
      if(val === true){  
      
        this.router.navigate([self.authService.redirectUrl || "/customers"]);  
        this.dialogRef.close(val)
      }
    });

  }

}
