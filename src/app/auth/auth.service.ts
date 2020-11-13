import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { ServerApiService, User} from '../server-api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  redirectUrl: string;

  constructor(private serverApi: ServerApiService) {    

  }

  

  login(user:User): Observable<boolean> {
    return this.serverApi.logIn(user).pipe(tap(val=>{
      this.isLoggedIn = val;      
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
