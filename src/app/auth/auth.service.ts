import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay,map } from 'rxjs/operators';
import { ServerApiService, User,SignUpInfo, serverResponse, successSignup , failSignup} from '../server-api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn:boolean = false;
  userId:number = -1;
  userName:string = "";

  redirectUrl: string;

  constructor(private serverApi: ServerApiService) {    

  }

  

  login(user:User): Observable<boolean> {
    return this.serverApi.logIn(user).pipe(map(val=>{
     
      if(typeof val === "boolean"){
        this.isLoggedIn = false;
        this.userId = -1;
        this.userName = "";

        return false;
      }else{
        this.isLoggedIn = true;
        this.userId = val.id;
        this.userName = val.email;
        return true;
      }           
    }));  
  }

  signup(signUpInfo:SignUpInfo): Observable<successSignup | failSignup>{
    return this.serverApi.signup(signUpInfo).pipe(
      map(response=>{

      if(response.status === "error"){
        this.isLoggedIn = false;
        this.userId = -1;
        this.userName = "";      
      }       

      if(response.status === "success"){
        this.isLoggedIn = true;
        this.userId = response.data.value.id;
        this.userName = response.data.value.email;
      }

      return response;  
    })); 
  }

  logout(): Observable<boolean> {
    return this.serverApi.logOut().pipe(tap(val=>{
      //val returns true on successfull logout. 
      //we therefore assign the opposite value to isLoggedIn           
      this.isLoggedIn = !val;
    }));   
  }

  
}
